import"./main-5f9a53a8.js";import"./nav-08669667.js";let l=document.querySelectorAll(".select-bar button");l.forEach(t=>{t.addEventListener("click",()=>{l.forEach(e=>{e.classList.remove("btn-active-brand-02")}),t.classList.add("btn-active-brand-02")})});const f="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let s={category:"全部",sort:"",search:""};const g={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function h(t,e,o){let r="",a="",c="";t!=="全部"&&t&&(r=`category=${t}`),e&&(a=e),o&&(c=`&storeName_like=${o}`);let i=`${f}/restaurants?${r}${a}${c}`;console.log(i),y(i)}h();const m=document.querySelectorAll(".btnSortStore");m.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-sort-value");n("sort",e)})});const u=document.querySelectorAll(".btnCategoryStore");u.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-category-value");u.forEach(o=>{o.classList.remove("actived")}),n("category",e),t.classList.add("actived")})});function n(t,e){switch(t){case"category":s[t]=e;break;case"search":s[t]=e.trim();break;default:s[t]=g[e];break}h(s.category,s.sort,s.search)}function y(t){$(function(){(function(e){let o=$("#pagination"+e);$.ajax({url:t,success:function(r){S(r,o)},error:function(r){console.error(r)}})})("Pages")})}function S(t,e){e.pagination({dataSource:t,totalNumber:t.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(o){b(o)}})}function b(t){const e={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let o='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';t.forEach((r,a)=>{o+=`
                            <li class="findStore-img position-relative" style="background-image: url(${r.storeCover});">
                                <a href="store-order.html?UID=${r.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                    <!-- restaurant info -->
                                    <div class="position-absolute d-flex justify-content-between findStore-card">
                                        <div class="d-flex flex-column justify-content-center overflow-hidden">
                                            <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${r.storeName}</p>
                                            <!-- 星評 -->
                                            <div class="d-flex ">
                                                ${p(r.stars)}
                                            </div>
                                        </div>
                                        <!-- restaurant sort -->
                                        <iconify-icon icon="${e[r.category]}"
                                            style="color: #8b8b8a;" width="24" height="24"
                                            class="ms-4 findStore-card-img"></iconify-icon>
                                    </div>
                                </a>
                            </li>
                            `}),o+="</ul>",document.querySelector("#paginationContainer").innerHTML=o}function p(t){const o={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                            width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                            width="16"></iconify-icon>`};return o.isGoodStar.repeat(t)+o.notGoodStar.repeat(5-t)}const d=new autoComplete({data:{src:async t=>{try{return await(await fetch(`${f}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(t,e)=>{if(!e.results.length){const o=document.createElement("div");o.setAttribute("class","no_result px-8"),o.innerHTML=`<span>Found No Results for "${e.query}"</span>`,t.prepend(o)}},noResults:!0},events:{input:{selection:t=>{const e=t.detail.selection.value;d.input.value=e.storeName,n("search",e.storeName)},keydown:t=>{if(t.keyCode===13){const e=d.input.value;console.log(`這是 ${e}`),n("search",e)}}}}});
