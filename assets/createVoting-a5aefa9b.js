import"./main-9ebfdcfe.js";import{a as m}from"./axios-47b9d439.js";const l="https://teatimeapi-test.onrender.com";moment().format("YYYY/MM/DD");let i={category:"全部",sort:"",search:""};const S={newestStore:"&_sort=id&_order=desc",bestStore:"&_sort=stars&_order=desc",worstStore:"&_sort=stars&_order=asc"};function v(e,t,o){let n="",s="",r="";e!=="全部"&&e&&(n=`category=${e}`),t&&(s=t),o&&(r=`&storeName_like=${o}`);let c=`${l}/restaurants?${n}${s}${r}`;C(c)}v();const k=document.querySelectorAll(".btnSortStore");k.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-sort-value");d("sort",t)})});const D=document.querySelectorAll(".btnCategoryStore");D.forEach(e=>{e.addEventListener("click",function(){const t=this.getAttribute("data-category-value");d("category",t)})});function d(e,t){switch(e){case"category":i[e]=t;break;case"search":i[e]=t.trim();break;default:i[e]=S[t];break}v(i.category,i.sort,i.search)}function C(e){$(function(){(function(t){let o=$("#pagination"+t);$.ajax({url:e,success:function(n){I(n,o)},error:function(n){console.error(n)}})})("Pages")})}function I(e,t){t.pagination({dataSource:e,totalNumber:e.length,pageSize:8,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(o,n){w(o),x()}})}function w(e){const t={飲料:"icon-park-outline:drink",速食:"mdi:food-outline",素食:"tabler:leaf",小吃:"ph:bowl-food",甜點:"material-symbols:icecream-outline-rounded",咖啡:"icon-park-outline:tea-drink"};let o='<ul class="row row-cols-2 gap-12 gap-xxl-24 findStore-ul">';$.each(e,function(n,s){const r=a.hasOwnProperty(s.UID);o+=`<li class="findStore-img position-relative" style="background-image: url(${s.storeCover});"> 
                        <!-- select-store-checkbox --> 
                        <label class="select-store">
                            <input type="checkbox" class="position-absolute select-store-checkbox" name="selectStoreCheck${s.UID}" data-uid="${s.UID}" ${r?"checked":""}>
                            <span class="position-absolute cursor-pointer select-store-checkmark"></span></label>
                            <a href="store-order.html?UID=${s.UID}" class="d-flex justify-content-center w-100 h-100 ">
                                <!-- restaurant info -->
                                <div class="position-absolute d-flex justify-content-between findStore-card">
                                    <div class="d-flex flex-column justify-content-center overflow-hidden">
                                        <p class="mb-8 fs-md-20 fs-16 lh-sm text-white" style="white-space:nowrap">${s.storeName}</p>
                                        <!-- 星評 -->
                                        <div class="d-flex ">
                                            ${L(s.stars)}
                                        </div>
                                    </div>
                                    <!-- restaurant sort -->
                                    <iconify-icon icon="${t[s.category]}"
                                        style="color: #8b8b8a;" width="24" height="24"
                                        class="ms-4 findStore-card-img"></iconify-icon>
                                </div>
                            </a>
                        </li>`}),o+="</ul>",$("#paginationContainer").html(o)}function L(e){const o={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                                                width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                                                width="16"></iconify-icon>`};return o.isGoodStar.repeat(e)+o.notGoodStar.repeat(5-e)}const a={};function x(){const e=document.querySelectorAll("input[type='checkbox']"),t=3;e.forEach(o=>{o.addEventListener("change",function(){const n=this.getAttribute("data-uid"),s=a.hasOwnProperty(n);Object.keys(a).length===t&&!s?this.checked=!1:s?(delete a[n],u()):m.get(`${l}/restaurants?UID=${n}`).then(function(c){a[n]=E(c.data[0]),u()}).catch(c=>{console.log("錯誤:",c)})})})}function E(e){return{UID:e.UID,restaurantId:e.id,restaurantName:e.storeName,restaurantCover:e.storeCover,summary:e.summary,minGroupSize:e.minGroupSize}}function T(){const e=document.querySelector(".checkedStoreContainer");Object.keys(a).length>0?e.classList.remove("d-none"):e.classList.add("d-none")}function u(){const e=document.querySelector(".showCheckedList");let t="";Object.values(a).forEach(o=>{t+=`<li class="d-flex align-items-center py-10 px-20 py-md-12 px-md-24 gap-8 rounded-pill bg-gray-04">
                                <span class="fs-12 fs-md-16 fw-medium">${o.restaurantName}</span>
                                <button type="button" class="btn-close cancelCheckedStore" data-uid=${o.UID}></button>
                            </li>`}),e.innerHTML=t,N(),T(),j()}function N(){document.querySelectorAll(".cancelCheckedStore").forEach(t=>{t.addEventListener("click",function(){const o=this.getAttribute("data-uid");console.log(o);const n=document.querySelector(`input[data-uid=${o}]`);n.checked=!1,delete a[o],console.log(a),u()})})}function j(){const e=document.querySelector(".checkCheckedStoreAbove"),t=document.querySelector(".checkCheckedStoreBelow");Object.keys(a).length>1?(e.classList.add("d-sm-block"),t.classList.remove("d-none"),t.classList.add("d-block","d-sm-none")):(e.classList.remove("d-sm-block"),t.classList.add("d-none"))}const b=document.getElementById("modal-createVoting"),A=b.querySelector(".modal-title"),h=document.getElementById("eventDateTime"),f=document.getElementById("deadlineDateTime"),g=document.getElementById("votingInvitees"),q=document.querySelector(".votingCard"),U=document.querySelector(".btnCreateVoting");b.addEventListener("show.bs.modal",function(e){const t=Object.values(a);V(t),Y(t)});function V(e){const t=e.map(r=>r.restaurantName);A.textContent=t.join("、");const o=sessionStorage.getItem("eventDateTime"),n=sessionStorage.getItem("deadlineDateTime"),s=sessionStorage.getItem("votingInvitees");h.value=o,f.value=n,g.value=s}function Y(e){let t="";e.forEach(o=>{t+=`
                            <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                                <img class="border-radius-32321616 votingcard-photo" src="${o.restaurantCover}">
                                <div>
                                <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${o.restaurantName}</h4>
                                <p class="mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${o.summary}</p>
                                <div>
                                <span class="me-16 text-gray-02 text-nowrap">成團目標</span>
                                <span class="text-gray-02">${o.minGroupSize} 人</span>
                                </div>                                 
                            </li>`}),q.innerHTML=t}U.addEventListener("click",B);async function B(){if(!G())try{const t=await H();M(t)}catch(t){console.log("錯誤:",t)}}async function H(){try{const t=(await m.get(`${l}/votings`)).data,n=t[t.length-1].UID.match(/(\D+)(\d+)/);if(n){const s=n[1];let r=parseInt(n[2]);return r++,s+r.toString().padStart(n[2].length,"0")}}catch(e){throw console.log("錯誤:",e),e}}function M(e){Object.values(a).map(o=>{const n={...o};delete n.restaurantCover,delete n.summary,delete n.minGroupSize,n.UID=e,n.deadlineDateTime=f.value,n.eventDateTime=h.value,n.initiator="黃莉玲",n.invitees=g.value==="has-invitees"?"黃莉玲":"",n.currentVoters=[],_(n)})}function _(e){m.post(`${l}/votings`,e).then(function(t){console.log("success")}).catch(t=>{console.log("錯誤:",t)})}function G(){let e=!1;const t=document.querySelector(".eventDateTimeAlert"),o=document.querySelector(".deadlineDateTimeAlert"),n=document.querySelector(".votingInviteesAlert");let s="",r="";const c=document.getElementById("eventDateTime").value.trim(),y=document.getElementById("deadlineDateTime").value.trim();return c&&(s=moment(h.value,"YYYY/MM/DD HH:mm")),y&&(r=moment(f.value,"YYYY/MM/DD HH:mm")),s===""?(t.classList.remove("d-none"),e=!0):t.classList.add("d-none"),r===""?(o.classList.remove("d-none"),o.textContent="必填",e=!0):o.classList.add("d-none"),g.value===""?(n.classList.remove("d-none"),e=!0):n.classList.add("d-none"),s&&r&&(s.diff(r,"hours")<24?(o.classList.remove("d-none"),o.textContent="截止時間須至少提前於享用日期 24 時",e=!0):o.classList.add("d-none")),e}const p=new autoComplete({data:{src:async e=>{try{return await(await fetch(`${l}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const o=document.createElement("div");o.setAttribute("class","no_result px-8"),o.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(o)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;p.input.value=t.storeName,console.log(t),d("search",t.storeName)},keydown:e=>{if(e.keyCode===13){const t=p.input.value;console.log(`這是 ${t}`),d("search",t)}}}}});
