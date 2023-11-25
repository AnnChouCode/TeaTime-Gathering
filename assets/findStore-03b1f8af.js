import"./main-4d2cfade.js";const b="https://teatimeapi-test.onrender.com",u=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async t=>{try{return await(await fetch(`${b}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(t,e)=>{if(!e.results.length){const o=document.createElement("div");o.setAttribute("class","no_result px-8"),o.innerHTML=`<span>Found No Results for "${e.query}"</span>`,t.prepend(o)}},noResults:!0},events:{input:{selection:t=>{const e=t.detail.selection.value;u.input.value=e.storeName,console.log(e.storeName),window.location.href=`./store-order.html?UID=${e.UID}`},keydown:t=>{t.keyCode===13&&(u.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),d=document.querySelector(".needs-validation"),v=document.querySelector(".inputLoginAccount"),w=document.querySelector(".inputLoginPassword"),L=document.querySelectorAll(".btnLoginSubmit"),g=document.querySelectorAll(".btnLogin"),y=document.querySelectorAll(".btnUserLoggedIn"),c=document.querySelectorAll(".btnLogOut");L.forEach(t=>{t.addEventListener("click",()=>{const e=v.value,o=w.value;if(d.checkValidity()||d.classList.add("was-validated"),e==="ling-huang@fat-together.com"&&o==="ling-huang")c.forEach(n=>{n.classList.remove("d-none")}),y.forEach(n=>{n.classList.remove("d-none")}),g.forEach(n=>{n.classList.add("d-none")}),$("#accountModal").modal("hide");else{const n=document.querySelector(".invalid-feedback");n.style.display="block"}})});c.forEach(t=>{t.addEventListener("click",()=>{c.forEach(e=>{e.classList.add("d-none")}),y.forEach(e=>{e.classList.add("d-none")}),g.forEach(e=>{e.classList.remove("d-none")})})});let f=document.querySelectorAll(".select-bar button");f.forEach(t=>{t.addEventListener("click",()=>{f.forEach(e=>{e.classList.remove("btn-active-brand-02")}),t.classList.add("btn-active-brand-02")})});const p="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let r={category:"全部",sort:"",search:""};const k={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function S(t,e,o){let n="",a="",i="";t!=="全部"&&t&&(n=`category=${t}`),e&&(a=e),o&&(i=`&storeName_like=${o}`);let l=`${p}/restaurants?${n}${a}${i}`;console.log(l),q(l)}S();const E=document.querySelectorAll(".btnSortStore");E.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-sort-value");s("sort",e)})});const m=document.querySelectorAll(".btnCategoryStore");m.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-category-value");m.forEach(o=>{o.classList.remove("actived")}),s("category",e),t.classList.add("actived")})});function s(t,e){switch(t){case"category":r[t]=e;break;case"search":r[t]=e.trim();break;default:r[t]=k[e];break}S(r.category,r.sort,r.search)}function q(t){$(function(){(function(e){let o=$("#pagination"+e);$.ajax({url:t,success:function(n){A(n,o)},error:function(n){console.error(n)}})})("Pages")})}function A(t,e){e.pagination({dataSource:t,totalNumber:t.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(o){x(o)}})}function x(t){const e={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let o='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul mx-8">';t.forEach((n,a)=>{o+=`
                            <li class="findStore-img position-relative" style="background-image: url(${n.storeCover});">
                                <a href="store-order.html?UID=${n.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                    <!-- restaurant info -->
                                    <div class="position-absolute d-flex justify-content-between findStore-card">
                                        <div class="d-flex flex-column justify-content-center overflow-hidden">
                                            <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${n.storeName}</p>
                                            <!-- 星評 -->
                                            <div class="d-flex ">
                                                ${N(n.stars)}
                                            </div>
                                        </div>
                                        <!-- restaurant sort -->
                                        <iconify-icon icon="${e[n.category]}"
                                            style="color: #8b8b8a;" width="24" height="24"
                                            class="ms-4 findStore-card-img"></iconify-icon>
                                    </div>
                                </a>
                            </li>
                            `}),o+="</ul>",document.querySelector("#paginationContainer").innerHTML=o}function N(t){const o={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                            width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                            width="16"></iconify-icon>`};return o.isGoodStar.repeat(t)+o.notGoodStar.repeat(5-t)}const h=new autoComplete({data:{src:async t=>{try{return await(await fetch(`${p}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(t,e)=>{if(!e.results.length){const o=document.createElement("div");o.setAttribute("class","no_result px-8"),o.innerHTML=`<span>Found No Results for "${e.query}"</span>`,t.prepend(o)}},noResults:!0},events:{input:{selection:t=>{const e=t.detail.selection.value;h.input.value=e.storeName,s("search",e.storeName)},keydown:t=>{if(t.keyCode===13){const e=h.input.value;console.log(`這是 ${e}`),s("search",e)}}}}});
