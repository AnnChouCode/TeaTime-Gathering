// 最高、最低評價按鈕顏色動畫
let selectBarBtn = document.querySelectorAll('.select-bar-link');
selectBarBtn.forEach(btnType => {
    btnType.addEventListener('click', () => {
        selectBarBtn.forEach(btn => {
            btn.classList.remove('btn-active-brand-02');
        })
        btnType.classList.add('btn-active-brand-02');
    })
})

/* 頁面基本資料取得 ===================================================*/
//全頁共用變數
const _url = "https://teatimeapi-test.onrender.com"
const _user = "U004"

//使用 moment 格式化日期
var now = moment().format('YYYY/MM/DD');


/* 店家清冊資料處理 =====================================================*/
//店家排序資料                   
let currentFilters = {
    category: "全部", //初始分類
    sort: "", //初始排序
    search: "" //初始搜尋
};

const sortType = {
    newestStore: "&_sort=id&_order=desc",
    bestStore: "&_sort=stars&_order=desc",
    worstStore: "&_sort=stars&_order=asc"
}

function initRestaurantData(category, sort, search) {
    let filterCategory = ""
    let sortStores = ""
    let searchStore = ""

    //初始運行頁面設置
    if (category !== "全部" && category) {
        filterCategory = `category=${category}`
    }
    //初始運行頁面設置
    if (sort) {
        sortStores = sort
    }

    if (search) {
        searchStore = `&storeName_like=${search}`
    }

    let filterAPI = `${_url}/restaurants?${filterCategory}${sortStores}${searchStore}`
    console.log(filterAPI);

    renderFilteredData(filterAPI)
}
initRestaurantData()


//店家排序按鈕偵測
const btnSortStore = document.querySelectorAll(".btnSortStore");
btnSortStore.forEach(btn => {
    btn.addEventListener("click", function () {
        const isSort = this.getAttribute("data-sort-value")
        toggleFilter("sort", isSort)
    });
});

//店家分類按鈕偵測
const btnCategoryStore = document.querySelectorAll(".btnCategoryStore");
btnCategoryStore.forEach(btn => {
    btn.addEventListener("click", function () {
        const isCategory = this.getAttribute("data-category-value")
        btnCategoryStore.forEach(btn => {
            btn.classList.remove('actived');
        })
        toggleFilter("category", isCategory);
        btn.classList.add('actived');

    });
});

//店家排序處理
function toggleFilter(filterType, value) {
    switch (filterType) {
        case "category":
            currentFilters[filterType] = value;
            break;
        case "search":
            currentFilters[filterType] = value.trim();
            break;
        default:
            currentFilters[filterType] = sortType[value];
            break;
    }
    initRestaurantData(currentFilters.category, currentFilters.sort, currentFilters.search);
}


/* 渲染店家卡片 & 頁碼 ================================================*/
function renderFilteredData(filteredData) {
    //頁碼生成               
    $(function () {
        (function (name) {
            let container = $('#pagination' + name);

            //發送 Ajax 請求獲取資料
            $.ajax({
                url: filteredData,
                success: function (filteredData) {
                    //處理頁碼
                    handlePagination(filteredData, container)
                    // console.log(container);
                },
                error: function (error) {
                    console.error(error);
                }
            });
        })('Pages');
    });
}

// //處理頁碼
function handlePagination(filteredData, container) {
    container.pagination({
        dataSource: filteredData, //全部或篩選過的資料來源
        totalNumber: filteredData.length, //資料總數
        pageSize: 8, //每頁資料數
        showPageNumbers: true,
        showPrevious: true,
        showNext: true,

        callback: function (paginatedData) {
            //渲染頁碼與監聽換頁
            renderPagination(paginatedData)
        }
    });

}

//渲染頁碼與監聽換頁
function renderPagination(paginatedData) {

    //店家類別 icon 對照
    const categoryIcon = {
        飲料: "icon-park-outline:drink",
        速食: "mdi:food-outline",
        素食: "tabler:leaf",
        小吃: "ph:bowl-food",
        甜點: "material-symbols:icecream-outline-rounded",
        咖啡: "icon-park-outline:tea-drink"
    }

    let dataHtml = '<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';

    paginatedData.forEach((item, index) => {
        dataHtml += `
                        <li class="findStore-img position-relative px-0" style="background-image: url(${item.storeCover});">
                            <a href="store-order.html?UID=${item.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                <!-- restaurant info -->
                                <div class="position-absolute d-flex justify-content-between findStore-card w-100">
                                    <div class="d-flex flex-column justify-content-center overflow-hidden">
                                        <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${item.storeName}</p>
                                        <!-- 星評 -->
                                        <div class="d-flex ">
                                            ${showStars(item.stars)}
                                        </div>
                                    </div>
                                    <!-- restaurant sort -->
                                    <iconify-icon icon="${categoryIcon[item.category]}"
                                        style="color: #8b8b8a;" width="24" height="24"
                                        class="ms-4 findStore-card-img"></iconify-icon>
                                </div>
                            </a>
                        </li>
                        `
    })

    dataHtml += '</ul>';
    document.querySelector("#paginationContainer").innerHTML = dataHtml

}
function showStars(num) {
    const starsTotal = 5
    const starsStates = {
        isGoodStar: `<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                        width="16"></iconify-icon>`,
        notGoodStar: `<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                        width="16"></iconify-icon>`
    }
    let resultStars = starsStates["isGoodStar"].repeat(num) + starsStates["notGoodStar"].repeat(starsTotal - num)
    return resultStars
}

/* autoComplete */
const autoCompleteJS = new autoComplete({
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
                toggleFilter("search", selectionValue.storeName)
            },
            //輸入 enter 偵測
            keydown: (event) => {
                if (event.keyCode === 13) {
                    const searchValue = autoCompleteJS.input.value
                    console.log(`這是 ${searchValue}`)
                    toggleFilter("search", searchValue)
                }
            }
        }
    }
});
// 搜尋後，按下"X" ，搜尋全部結果
const inputACvalue = document.getElementById("autoComplete")
inputACvalue.addEventListener("input", function (e) {
    toggleFilter("search", "")

})