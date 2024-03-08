import{A as T,e as k,a as f}from"./enc-utf8-11b5c098.js";import{b as j}from"./main-e0cad254.js";function W(e){return e}function S(e){return e?T.decrypt(e,"TeaTime-Gathering").toString(k):void 0}const x="https://teatimeapi-test.onrender.com",E=localStorage.getItem("token");function C(){const e=S(E);f.get(`${x}/users?UID=${e}`).then(function(n){q(n.data[0].userName)}).catch(function(n){console.error(n.message)})}E&&C();const L=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async e=>{try{return await(await fetch(`${x}/restaurants`)).json()}catch(n){return n}},keys:["storeName"]},searchEngine:"loose",debounce:300,resultItem:{highlight:!0},resultsList:{element:(e,n)=>{if(!n.results.length){const i=document.createElement("div");i.setAttribute("class","no_result px-8"),i.innerHTML=`<span>Found No Results for "${n.query}"</span>`,e.prepend(i)}},noResults:!0},events:{input:{selection:e=>{const n=e.detail.selection.value;L.input.value=n.storeName,window.location.href=`./store-order.html?UID=${n.UID}`},keydown:e=>{e.keyCode===13&&(L.input.value,window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),u=document.getElementById("userLoginModal"),U=document.querySelectorAll(".btnLogin"),b=document.querySelectorAll(".btnLogOut");u.addEventListener("show.bs.modal",function(e){const n=u.querySelector(".btnLoginSubmit"),i=u.querySelector(".loginSpinner");n.addEventListener("click",function(){i.classList.remove("d-none");let s;f.get(`${x}/users`).then(function(o){s=o.data,A(s),i.classList.add("d-none")}).catch(function(o){console.error(o.message)})})});let m=0,v=10;function A(e){const n=u.querySelector(".inputLoginAccount"),i=u.querySelector(".inputLoginPassword"),s=n.value.trim(),o=i.value.trim(),a=document.querySelector(".invalid-feedback"),t=u.querySelector(".btnLoginSubmit"),r=e.filter(c=>c.email===s&&c.password===o);if(r.length){a.style.display="none";const c=T.encrypt(r[0].UID,"TeaTime-Gathering").toString();localStorage.setItem("token",c),$("#userLoginModal").modal("hide"),window.location.reload()}else{m++,a.style.display="block";let c=setInterval(function(){v--,v<=0&&(clearInterval(c),v=10,m=0)},1e3);if(m>=3){t.disabled=!0;let d=5,N=setInterval(function(){d--,a.textContent=`帳號或密碼輸入錯誤太多次，請等待 ${d} 秒後再試`,d<=0&&(clearInterval(N),m=0,a.style.display="none",a.textContent="電子郵件帳號或密碼輸入錯誤",t.disabled=!1)},1e3)}}}function q(e){b.forEach(n=>{n.classList.remove("d-none")}),U.forEach(n=>{n.innerHTML=`<a href="overallSystem.html"
                            class="p-8 bg-brand-04 rounded-circle fs-20 text-brand-03 text-center fw-medium lh-sm nav-icon-hover"
                            style="width: 44px;height: 44px;">${e[0]}</a>`})}b.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),b.forEach(i=>{i.classList.add("d-none")}),U.forEach(i=>{i.innerHTML="<a href='#userLoginModal' data-bs-toggle='modal' class='nav-icon-hover'><iconify-icon class='p-8 bg-brand-04 rounded-circle' icon='line-md:account' style='color: #bfa373;' width='28'></iconify-icon></a>"}),localStorage.removeItem("token"),window.location.reload()})});$(".btnSwitchIdentity").click(function(e){$(".btnSwitchIdentity").toggleClass("btn-active-brand-02")});$(".btnNotification").click(function(e){$(".btnNotificationAlert").addClass("d-none")});$(".offcanvas-list a").click(function(e){$(".offcanvas-list a").removeClass("nav-offcanvas-active"),$(this).toggleClass("nav-offcanvas-active")});$(".needs-validation").each(function(e){$(this).on("submit",function(n){n.preventDefault(),$(this).addClass("was-validated")})});const h="https://teatimeapi-test.onrender.com",g=localStorage.getItem("token"),y=S(g);let p="",w="";const G=document.querySelectorAll(".btnNotification");document.addEventListener("DOMContentLoaded",function(){const e=document.querySelectorAll(".btnNotificationAlert");g?e.forEach(n=>{n.classList.remove("d-none")}):e.forEach(n=>{n.classList.add("d-none")})});let D="";G.forEach(e=>{e.addEventListener("click",function(n){D=n.target.closest(".btnNotification").id,g?V():M()})});const I=document.getElementById("btnToastNotification"),_=document.getElementById("notificationToast");I&&I.addEventListener("click",function(){new j.Toast(_).show()});function V(){f.get(`${h}/users?UID=${y}`).then(function(e){p=parseInt(y.match(/U(\d{3})/)[1]),w=e.data[0].userName,Y()}).catch(function(e){console.error(e.message)})}const H=moment().format("YYYY/MM/DD HH:mm");let l={};function Y(){const n=`deadlineDateTime_gte=${moment().subtract(1,"month").format("YYYY/MM")}&deadlineDateTime_lte=${H}`,i=f.get(`${h}/groupings?_expand=restaurant&_expand=order&${n}`),s=f.get(`${h}/votings?_expand=restaurant&${n}`);Promise.all([i,s]).then(function(o){const a=o[0].data,t=o[1].data;B(a,t)}).catch(function(o){console.error(o.message)})}function B(e,n){const i=e.filter(t=>t.initiatorId==p||t.order.orderDetail.filter(r=>r.name===w)),s=n.filter(t=>t.initiatorId==p||t.currentVoters.includes(y));i.concat(s).sort((t,r)=>{const c=new Date(t.deadlineDateTime);return new Date(r.deadlineDateTime)-c}).forEach(t=>{l[t.UID]||(t.UID.startsWith("G")&&(l[t.UID]={UID:t.UID,deadlineDateTime:t.deadlineDateTime,eventDateTime:t.eventDateTime,orderDetail:t.order.orderDetail.filter(r=>r.name=w),currentGroupCondition:t.order.orderDetail.length,minGroupSize:t.restaurant.minGroupSize,restaurantList:[t.restaurant.storeName],initiatorId:t.initiatorId,initiator:t.initiator,invitees:t.invitees}),t.UID.startsWith("V")&&(l[t.UID]={UID:t.UID,deadlineDateTime:t.deadlineDateTime,eventDateTime:t.eventDateTime,restaurantList:[],initiatorId:t.initiatorId,initiator:t.initiator,invitees:t.invitees})),t.UID.startsWith("V")&&l[t.UID].restaurantList.push(t.restaurantName)}),M()}function M(){const e=O(),n=document.querySelector(e);let i="";g?Object.keys(l).length?(Object.values(l).forEach(s=>{const o=s.UID[0],a=s.initiatorId==p,t=s.currentGroupCondition>s.minGroupSize,r=!!s.invitees.length;if(o==="V"&&!a&&(i+=`<li>
                <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的投票結果已開票！請留意以下店家及訂購時間的開團</p>
                <div class="d-flex justify-content-between mb-8">
                    <span class="text-gray-02">店家</span>
                    <span>${s.restaurantList.join("、")}</span>
                </div>
                <div class="d-flex justify-content-between ">
                    <span class="text-gray-02">預定訂購時間</span>
                    <time>${s.eventDateTime.split(" ")[0]}</time>
                </div>
                </li>`),o==="V"&&a&&(i+=`<li>
                <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您主辦的投票結果已開票！請至使用者後台確認</p>
                <div class="d-flex justify-content-between mb-8">
                    <span class="text-gray-02">店家</span>
                    <span>${s.restaurantList.join("、")}</span>
                </div>
                <div class="d-flex justify-content-between ">
                    <span class="text-gray-02">預定訂購時間</span>
                    <time>${s.eventDateTime.split(" ")[0]}</time>
                </div>
                </li>`),o==="G"&&!t&&!a&&(i+=`<li>
                    <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您參與的開團失敗！謝謝您的加入</p>
                    <div class="d-flex justify-content-between mb-8">
                        <span class="text-gray-02">店家</span>
                        <span>${s.restaurantList[0]}</span>
                    </div>
                    <div class="d-flex justify-content-between ">
                        <span class="text-gray-02">預定訂購時間</span>
                        <span>無</span>
                    </div>
                    </li>`),o==="G"&&t&&!a){const c=!!s.orderDetail.filter(d=>d.isPay===!1).length;r?i+=`<li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團已確認成團！謝謝 ${s.invitees} 請客</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${s.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${s.eventDateTime.split(" ")[0]}</time>
                        </div>
                        </li>`:c?i+=`
                    <li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團訂單，已完成付款</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${s.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${s.eventDateTime.split(" ")[0]}</time>
                        </div>
                    </li>
                    `:i+=`<li>
                        <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您的跟團已確認成團！請盡速向團主 ${s.initiator} 付款</p>
                        <div class="d-flex justify-content-between mb-8">
                            <span class="text-gray-02">店家</span>
                            <span>${s.restaurantList[0]}</span>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <span class="text-gray-02">預定訂購時間</span>
                            <time>${s.eventDateTime.split(" ")[0]}</time>
                        </div>
                        </li>`}o==="G"&&!t&&a&&(i+=`<li>
                    <p class="mb-12 text-brand-02 fw-medium fs-md-20 fs-16 lh-sm">您主辦的開團失敗！謝謝您的發起</p>
                    <div class="d-flex justify-content-between mb-8">
                        <span class="text-gray-02">店家</span>
                        <span>${s.restaurantList[0]}</span>
                    </div>
                    <div class="d-flex justify-content-between ">
                        <span class="text-gray-02">預定訂購時間</span>
                        <span>無</span>
                    </div>
                    </li>`)}),n.innerHTML=i):n.innerHTML=`<li class="text-center fs-20">
        <p>目前尚無通知</p><p>馬上一起吃吃喝喝吧！</p>
        </li>`:n.innerHTML='<li class="text-center fs-20">請先登入帳號</li>',P()}function O(){if(D==="btnToastNotification")return".toastMessages";if(D==="btnModalNotification")return".modalMessages"}function P(){l={}}$(".btnNotification").click(function(e){$(".btnNotificationAlert").addClass("d-none"),$("#notificationToast").toast("hide")});export{S as c,W as i};
