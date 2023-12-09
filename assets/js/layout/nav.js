import axios from 'axios';
import AES from 'crypto-js/aes'; //加密
// import 判斷登入狀態樣板
import isLoggedIn from '/assets/js/components/isLoggedIn.js';
// import 解密 token 樣板
import cryptoToken from '/assets/js/components/cryptoToken.js';

//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _token = localStorage.getItem("token");


/* 判斷登入狀態 ================================== */
function initUserLoginStates() {
    // 將 token 解密成 userUID
    const originalText = cryptoToken(_token)

    //Login 成功條件 & 失敗
    axios.get(`${_url}/users?UID=${originalText}`)
        .then(function (res) {
            showLoginSuccess(res.data[0].userName)
        }).catch(function (err) {
            console.error(err.message);
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
                const source = await fetch(`${_url}/restaurants`);
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
    //止抖,
    debounce: 300,
    //選單符合條件字元 highlight
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
                window.location.href = `./store-order.html?UID=${selectionValue.UID}`
            },
            //輸入 enter 偵測
            keydown: (event) => {
                if (event.keyCode === 13) {
                    const searchValue = autoCompleteJS.input.value
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
    const btnLoginSubmit = userLoginModal.querySelector(".btnLoginSubmit");
    //登入 loading spinner
    const loginSpinner = userLoginModal.querySelector(".loginSpinner")

    //會員登入    
    btnLoginSubmit.addEventListener("click", function () {
        //顯示 loading
        loginSpinner.classList.remove("d-none")
        //儲存會員資料
        let userDatas

        //Login 成功條件 & 失敗
        axios.get(`${_url}/users`)
            .then(function (res) {
                userDatas = res.data
                //會員帳號輸入判斷，若成功則儲存該會員資料在 localStorage
                getLoginUserData(userDatas)
                //隱藏 loading
                loginSpinner.classList.add("d-none")
            }).catch(function (err) {
                console.error(err.message);
            });
    });

})

//追蹤登入嘗試次數
let loginAttempts = 0;
//限制短時間嘗試多次登入秒數
let loginCountdown = 10

//會員帳號輸入判斷
function getLoginUserData(userDatas) {
    //input-帳密輸入
    const inputLoginAccount = userLoginModal.querySelector(".inputLoginAccount");
    const inputLoginPassword = userLoginModal.querySelector(".inputLoginPassword");
    //input-帳密輸入值
    const accountValue = inputLoginAccount.value.trim();
    const passwordValue = inputLoginPassword.value.trim();
    //登入錯誤提示文字
    const errorFeedback = document.querySelector(".invalid-feedback");
    //按鈕-登入資料送出
    const btnLoginSubmit = userLoginModal.querySelector(".btnLoginSubmit");

    //登入的用戶 data，若無符合條件的用戶則回傳 []
    const successLoginData = userDatas.filter(data => data.email === accountValue && data.password === passwordValue)

    //若輸入帳密錯誤，顯示錯誤訊息
    if (!successLoginData.length) {
        loginAttempts++
        errorFeedback.style.display = 'block'

        //限制短時間內登入，若在限制時間外才達成嘗試登入次數，則不會進入禁用
        let loginCountdownInterval = setInterval(function () {
            loginCountdown--

            //當秒數歸零
            if (loginCountdown <= 0) {
                //終止倒數
                clearInterval(loginCountdownInterval)
                //復原秒數
                loginCountdown = 10
                //登入嘗試次數歸零
                loginAttempts = 0
            }
        }, 1000)


        //帳密錯誤 3 次，禁用登入按鈕
        if (loginAttempts >= 3) {
            //禁用按鈕
            btnLoginSubmit.disabled = true

            //倒數秒數
            let countdown = 5

            let countdownInterval = setInterval(function () {
                countdown--
                errorFeedback.textContent = `帳號或密碼輸入錯誤太多次，請等待 ${countdown} 秒後再試`

                //當秒數歸零
                if (countdown <= 0) {
                    //終止倒數
                    clearInterval(countdownInterval)
                    //登入嘗試次數歸零
                    loginAttempts = 0
                    errorFeedback.style.display = 'none'
                    errorFeedback.textContent = "電子郵件帳號或密碼輸入錯誤"
                    btnLoginSubmit.disabled = false;
                }
            }, 1000);

        }
    } else {
        //若輸入帳密正確，儲存會員資料
        errorFeedback.style.display = 'none'

        //將 UID 加密儲存，當成 token 使用
        const ciphertext = AES.encrypt(successLoginData[0].UID, 'TeaTime-Gathering').toString()
        localStorage.setItem("token", ciphertext)

        //關閉登入 modal
        $('#userLoginModal').modal('hide');

        //重新整理頁面，以更新 _token
        window.location.reload();
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
}




/* 登出動作 ============================================*/
btnLogOut.forEach(btn => {
    btn.addEventListener("click", (event) => {
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

        //重新整理頁面，以更新 _token
        window.location.reload();
    })
})


/* 登入會員/管理員 按鈕 active 狀態切換顯示 */
$('.btnSwitchIdentity').click(function (e) {
    $('.btnSwitchIdentity').toggleClass('btn-active-brand-02');
});

/* collapse 內，通知按鈕點擊切換通知提示圓點 */
$('.btnNotification').click(function (e) {
    $('.btnNotificationAlert').addClass('d-none');
});

/* navbar 摺疊 collapse 選單切換 active */
$('.offcanvas-list a').click(function (e) {
    $('.offcanvas-list a').removeClass('nav-offcanvas-active');
    $(this).toggleClass('nav-offcanvas-active');
});

/* Validation 填寫檢驗 */
$('.needs-validation').each(function (index) {
    $(this).on('submit', function (e) {
        e.preventDefault();
        $(this).addClass('was-validated');
    });
});