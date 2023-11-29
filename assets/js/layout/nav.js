import axios from 'axios';
import AES from 'crypto-js/aes'; //加密
import encUtf8 from 'crypto-js/enc-utf8'; //解密
import isLoggedIn from '/assets/js/isLoggedIn.js'; // import 判斷登入狀態樣板


//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
let _token = localStorage.getItem("token");


/* 判斷登入狀態 ================================== */
function initUserLoginStates() {
    // 解密
    const bytes = AES.decrypt(_token, 'TeaTime-Gathering');
    const originalText = bytes.toString(encUtf8);
    //console.log(originalText)

    //Login 成功條件 & 失敗
    axios.get(`${_url}/users?UID=${originalText}`)
        .then(function (res) {
            showLoginSuccess(res.data[0].userName)
        }).catch(function (error) {
            console.error(error.message);
        });
}

if (isLoggedIn(_token)) {
    initUserLoginStates()
}


/* 搜尋 input autoComplete ===================================================*/
const autoCompleteJS = new autoComplete({
    selector: "#navSearchAutoComplete",
    //撈取 API 資料庫獲取選單內容
    data: {
        src: async (query) => {
            try {
                //Fetch Data from external Source
                const source = await fetch(`https://teatimeapi-test.onrender.com/restaurants`);
                //Data should be an array of `Objects` or `Strings`
                const data = await source.json();

                return data;
            } catch (error) {
                return error;
            }
        },
        //Data source 'Object' key to be searched
        keys: ["storeName"]
    },
    //寬鬆搜尋
    searchEngine: "loose",
    //選單符合條件自元 highlight
    resultItem: {
        highlight: true
    },
    //生成選單
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                //Create "No Results" message element
                const message = document.createElement("div");
                //Add class to the created element
                message.setAttribute("class", "no_result px-8");
                //Add message text content
                message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                //Append message element to the results list
                list.prepend(message);
            }
        },
        noResults: true,
    },
    events: {
        input: {
            //選單偵測
            selection: (event) => {
                const selectionValue = event.detail.selection.value;
                autoCompleteJS.input.value = selectionValue.storeName;
                console.log(selectionValue.storeName)
                window.location.href = `./store-order.html?UID=${selectionValue.UID}`
            },
            //輸入 enter 偵測
            keydown: (event) => {
                if (event.keyCode === 13) {
                    const searchValue = autoCompleteJS.input.value
                    console.log(selectionValue.storeName)
                    window.location.href = `./store-order.html?UID=${selectionValue.UID}`
                }
            }
        }
    }
});


/* 登入/登出 狀態 icon 顯示切換  ===================================================*/
//綁定會員登入 modal
const userLoginModal = document.getElementById('userLoginModal')
//按鈕-navbar 登入、登出 icon
const btnLogin = document.querySelectorAll(".btnLogin") //登入        
const btnLogOut = document.querySelectorAll(".btnLogOut") //登出

userLoginModal.addEventListener('show.bs.modal', function (event) {
    //按鈕-登入資料送出
    const btnLoginSubmit = userLoginModal.querySelectorAll(".btnLoginSubmit");

    //會員登入
    btnLoginSubmit.forEach(btn => {
        btn.addEventListener("click", () => {
            //儲存會員資料
            let userDatas

            //Login 成功條件 & 失敗
            axios.get(`https://teatimeapi-test.onrender.com/users`)
                .then(function (res) {
                    userDatas = res.data
                    //會員帳號輸入判斷，若成功則儲存該會員資料在 localStorage
                    getLoginUserData(userDatas)
                }).catch(function (error) {
                    console.error(error.message);
                });
        });
    });
})

//會員帳號輸入判斷
function getLoginUserData(userDatas) {
    //const loginForm = userLoginModal.querySelector(".needs-validation")
    //input-帳密輸入
    const inputLoginAccount = userLoginModal.querySelector(".inputLoginAccount");
    const inputLoginPassword = userLoginModal.querySelector(".inputLoginPassword");
    //input-帳密輸入值
    const accountValue = inputLoginAccount.value.trim();
    const passwordValue = inputLoginPassword.value.trim();
    //登入錯誤提示文字
    const errorFeedback = document.querySelector(".invalid-feedback");

    //登入的用戶 data，若無符合條件的用戶則回傳 []
    const successLoginData = userDatas.filter(data => data.email === accountValue && data.password === passwordValue)

    //若輸入帳密錯誤，顯示錯誤訊息
    if (!successLoginData.length) {
        errorFeedback.style.display = 'block';
        //BS 驗證只判斷有無填寫，所以只能手動加入框線顏色
        // inputLoginAccount.setAttribute("style", "outline:2px solid #fd909f");
        // inputLoginPassword.setAttribute("style", "outline:2px solid #fd909f");
    } else {
        //若輸入帳密正確，儲存會員資料
        errorFeedback.style.display = 'none';

        //將 UID 加密儲存，當成 token 使用
        const ciphertext = AES.encrypt(successLoginData[0].UID, 'TeaTime-Gathering').toString();
        localStorage.setItem("token", ciphertext);

        //登入成功按鈕變化
        showLoginSuccess(successLoginData[0].userName)
    }
}

//登入成功按鈕變化
function showLoginSuccess(userName) {
    //登出按鈕出現     
    btnLogOut.forEach(btn => {
        btn.classList.remove("d-none");
    });

    btnLogin.forEach(btn => {
        btn.innerHTML = `<a href="overallSystem.html"
                            class="p-8 bg-brand-04 rounded-circle fs-20 text-brand-03 text-center fw-medium lh-sm nav-icon-hover"
                            style="width: 44px;height: 44px;">${userName[0]}</a>`
    });

    //關閉登入 modal
    $('#userLoginModal').modal('hide');

    //更新 token 值
    isLoggedIn(_token)
}




/* 登出動作 ============================================*/
btnLogOut.forEach(btn => {
    btn.addEventListener("click", () => {
        //避免頁面滾動
        event.preventDefault();

        //隱藏登出按鈕
        btnLogOut.forEach(btn => {
            btn.classList.add("d-none");
        });
        //登入按鈕恢復未登入狀態
        btnLogin.forEach(btn => {
            btn.innerHTML = "<a href='#userLoginModal' data-bs-toggle='modal' class='nav-icon-hover'><iconify-icon class='p-8 bg-brand-04 rounded-circle' icon='line-md:account' style='color: #bfa373;' width='28'></iconify-icon></a>"

        });

        //清除登入資訊
        localStorage.removeItem("token");
        //更新 token 值
        isLoggedIn(_token)
    })
})


/* Validation 填寫檢驗 */
$('.needs-validation').each(function (index) {
    $(this).on('submit', function (e) {
        e.preventDefault();
        $(this).addClass('was-validated');
    });
});

/* 通知按鈕點擊切換通知提示圓點 */
$('.btnNotification').click(function (e) {
    $('.btnNotificationAlert').addClass('d-none');
});

/* 登入會員/管理員 按鈕 active 狀態切換顯示 */
$('.btnSwitchIdentity').click(function (e) {
    $('.btnSwitchIdentity').toggleClass('btn-active-brand-02');
});

/* navbar 摺疊 collapse 選單切換 active */
$('.offcanvas-list a').click(function (e) {
    $('.offcanvas-list a').removeClass('nav-offcanvas-active');
    $(this).toggleClass('nav-offcanvas-active');
});
