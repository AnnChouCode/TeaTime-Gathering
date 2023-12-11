import{b as G}from"./main-ff7ab40b.js";import{i as de,c as se}from"./notification-c1a264b7.js";import{a as A}from"./enc-utf8-a4fbd21b.js";import{s as Q}from"./showDateTime-51bda516.js";import{s as me}from"./showStars-385adb56.js";import{f as ue}from"./index-a4e39586.js";const pe=localStorage.getItem("token");document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".btnCreateGrouping"),n=document.querySelectorAll(".btnCart"),e=document.querySelectorAll(".btnWriteReview");de(pe)?(t.setAttribute("href","#modal-CreateGroup"),t.setAttribute("data-bs-toggle","modal"),n.forEach(s=>{}),e.forEach(s=>{s.setAttribute("href","#modal-WriteReview"),s.setAttribute("data-bs-toggle","modal")})):(t.setAttribute("data-bs-toggle","popover"),t.setAttribute("data-bs-content","請先登入帳號"),n.forEach(r=>{r.setAttribute("data-bs-toggle","popover"),r.setAttribute("data-bs-content","請先登入帳號")}),e.forEach(r=>{r.setAttribute("data-bs-toggle","popover"),r.setAttribute("data-bs-content","請先登入帳號")}),[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(r=>{new G.Popover(r)}))});const ge=moment().format("YYYY/MM/DD"),be="https://teatimeapi-test.onrender.com",U=location.href.split("=")[1],fe=document.querySelector(".btnTogetherEvent");fe.addEventListener("click",he);let P;function he(){const t=`_sort=deadlineDateTime&deadlineDateTime_gte=${ge}`;A.get(`${be}/groupings?_expand=restaurant&${t}`).then(function(n){P=n.data;let e,s;U.startsWith("G")?(e=P.filter(o=>o.UID===U),s=e.length?e[0].restaurantId:""):(e=P.filter(o=>o.restaurant.UID===U),s=e.length?e[0].restaurantId:"");const r=P.filter(o=>o.restaurantId===s);ye(r)}).catch(function(n){console.error(n.message)})}function ye(t){const n=document.querySelector(".calendarBlock");let e="";t.length?t.forEach(s=>{e+=`<div class="col-md-6 col-xl-4 col-xxxl-3 px-0 px-md-12">
                        <a href="store-order.html?UID=${s.UID}"
                            class="d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line border-radius-40401616 border-radius-lg-80801616 h-100 w-100">
                            <img class="event-img-RWD me-12 me-lg-0 mb-lg-20"
                                src="${s.restaurant.storeCover}"
                                alt="calendar-img">
                                <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${s.restaurant.storeName}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">開團中</p>
                            <div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26" height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${Q(s.deadlineDateTime)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${Q(s.deadlineDateTime)[1]}</time>
                                </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${s.invitees?s.invitees:"無"}</span>
                        </div>
                    </div>
                        </a>
                    </div>`}):e="<p class='fs-16 fs-md-20 text-center'>目前沒有開團</p>",n.innerHTML=e}let ve=localStorage.getItem("token");const X=se(ve);localStorage.setItem("category","");const O=document.querySelector(".shopping-cart"),Ce=document.getElementById("modalCartsSendOrder");$(function(){(function(){new G.Modal(document.getElementById("modal-shppingCart-order")),document.getElementById("staticBackdrop");let t=location.href.split("=")[1],n="";const e=!!t.startsWith("G");e?(O.setAttribute("href","#modal-shppingCart-order"),O.setAttribute("data-bs-toggle","modal"),A.get(`https://teatimeapi-test.onrender.com/groupings?UID=${t}`).then(s=>{const{restaurantId:r}=s.data[0];n=r,ee(e,t,n),xe(s.data[0])}).catch(s=>{console.log(s)})):(new G.Popover(O,{content:"選擇開團中或建立揪團"}),ee(e,t,n))})()});function xe(t){$(".shopping-cart").on("click",function(){localStorage.getItem("category"),t.storeName=$("#storeNameID").text();const[n,e]=t.eventDateTime.split(" "),r=new Date(t.eventDateTime).toLocaleDateString("en-US",{month:"numeric",day:"numeric"});let o="";t.yymmdd=n,t.date=r,t.time=e,$("#modalShppingCartOrderTitle").html(`<p class="fs-20 fs-md-24 line-height-sm fw-bold text-gray-01" id="modalShppingCartOrderTitle">${t.storeName}</p>`),$("#dateCarts").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="dateCarts">${r}</p>`),$("#timeCarts").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="timeCarts">${e}</p>`);const b=localStorage.getItem("Carts");if(b.length!==0){$(".modalCartsFooter").show();const g=JSON.parse(b);let v=0;g.forEach(l=>{v+=parseInt(l.totalAmount);let S="";l.customization.length!==0&&(S=l.customization.join(", ")),o+=`
        <li class="modalCartsLis mb-12 border-bottom border-1 border-gray-03">
                      <div class="d-flex justify-content-between align-items-center w-100 mb-md-16">
                        <p class="text-gray-01 fs-md-20 modalCartsName" data-originalPrice="${l.originalPrice}">${l.orderItem}</p>
                        <p class="text-gray-01 fs-md-20 modalCartsTotalAmount">$${l.totalAmount}</p>
                      </div>
                      <div class="mb-16">
                        ${l.ice?`<p class="text-gray-02">溫度：<span>${l.ice}</span></p>`:""}
                        ${l.sugar?`<p class="text-gray-02">甜度：<span>${l.sugar}</span></p>`:""}
                        ${l.customization.length==0?"":`<p class="text-gray-02">加料：<span>${S}</span></p>`}
                        ${l.comments?`<p class="text-gray-02">備註：<span>${l.comments}</span></p>`:""}
                      </div>
                      <div class="modalCartsBtns btn-group border-radius-40 border border-2
                      py-12 px-16 mb-8 mb-md-12 d-flex justify-content-center align-items-center" role="group"
                        aria-label="Basic" style="max-width: 131px;">
                        <button type="button"
                          class="modalCartsRemoveBtn d-flex justify-content-center align-items-center btn btn-white border-radius-400040"
                          style="width: 24px;height: 24px;">
                          <span class="material-symbols-outlined text-gray-02 ">
                            remove
                          </span>
                        </button>
                        <input style="width: 35px;" type="text"
                          class="modalCartsInput border border-2 text-brand-02 mx-8 text-center border border-0" value="${l.quantity}" >
                        <button type="button"
                          class="modalCartsAddBtn d-flex justify-content-center align-items-center btn btn-white border-radius-040400"
                          style="width: 24px;height: 24px;">
                          <span class="material-symbols-outlined text-gray-02 ">
                            add
                          </span>
                        </button>
                      </div>
                    </li>
        `}),$("#menuListUl").html(o),$("#menuTotal").html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm" id="menuTotal">$${v}</p>`);let p=document.querySelectorAll(".modalCartsLis");const C=document.getElementById("menuTotal");p.forEach(l=>{const S=l.querySelector(".modalCartsRemoveBtn"),d=l.querySelector(".modalCartsInput"),E=l.querySelector(".modalCartsAddBtn"),I=l.querySelector(".modalCartsTotalAmount"),a=l.querySelector(".modalCartsName"),m=parseInt(a.dataset.originalprice),i=a.textContent;parseInt(d.value),S.addEventListener("click",function(){const h=parseInt(C.textContent.replace("$",""));if(parseInt(d.value)-1>=0){const w=parseInt(d.value);d.value=w-1,I.textContent=`$${m*d.value}`,C.textContent=`$${parseInt(h)-parseInt(m)}`;const T=parseInt(d.value),D=m*T;R(T,D,g,i)}else{console.log("數量為0以下");const w=l.querySelector(".modalCartsInput");w.value=0}}),d.addEventListener("input",function(){const h=parseInt(d.value);h<1e3&&h>=0||(h>1e3?d.value=999:d.value=0),p=document.querySelectorAll(".modalCartsLis");let k=0;p.forEach(D=>{const u=D.querySelector(".modalCartsName"),M=parseInt(u.dataset.originalprice),c=D.querySelector(".modalCartsInput").value;console.log(M),k+=parseInt(c)*parseInt(M),console.log(k)}),I.textContent=`$${m*parseInt(d.value)}`,C.textContent=`$${k}`;const w=parseInt(d.value);console.log(w,k);let T=m*parseInt(d.value);R(w,T,g,i)}),E.addEventListener("click",function(){const h=parseInt(d.value),k=parseInt(C.textContent.replace("$",""));if(h<999){d.value=h+1;const w=parseInt(d.value);I.textContent=`$${m*d.value}`,C.textContent=`$${parseInt(k)+parseInt(m)}`;const T=m*w;R(w,T,g,i)}else d.value=999})})}else o=`
      <li class="mb-12 border-bottom border-top border-1 border-gray-03 py-12 mb-40">
        <p class="text-gray-01 fs-md-20">購物車目前空蕩蕩，選點下午茶吧！</p>
      </li>
      `,$("#menuListUl").html(o),$(".modalCartsFooter").hide()}),Ce.addEventListener("click",function(){we(t)})}function we(t){const n=document.getElementById("menuTotal"),e=parseInt(n.textContent.replace("$","")),s=JSON.parse(localStorage.getItem("Carts")),r=JSON.parse(JSON.stringify(s));t.orderPriceTotal=e,t.orderUserId=X,A.get(`https://teatimeapi-test.onrender.com/users?UID=${X}`).then(o=>{const{userName:b}=o.data[0],{orderId:g}=t;return t.userName=b,A.get(`https://teatimeapi-test.onrender.com/orders?id=${g}`).then(v=>{const p=v.data[0],{orderDetail:C,groupingId:l,restaurantId:S,UID:d}=p,E=[];let I="";return C.forEach((a,m)=>{s.forEach((i,h)=>{i.customization.length!=0&&(I=i.customization.join("、")),a.name==b&&a.orderItem==i.orderItem&&(E.push(h),C[m]={name:b,orderItem:i.orderItem,quantity:parseInt(i.quantity),ice:i.ice?`${i.ice}`:"",sugar:i.sugar?`${i.sugar}`:"",customization:i.customization?`${I}`:"",comments:i.comments,totalAmount:i.totalAmount,isPay:a.isPay,ratingID:a.ratingID})})}),E.length>0&&E.reverse().forEach(m=>{r.splice(m,1)}),r.forEach(a=>{let m="";a.customization.length!=0&&(m=a.customization.join("、"));const i={name:b,orderItem:a.orderItem,quantity:parseInt(a.quantity),ice:a.ice?`${a.ice}`:"",sugar:a.sugar?`${a.sugar}`:"",customization:a.customization?`${m}`:"",comments:a.comments,totalAmount:a.totalAmount,isPay:!1,ratingID:""};C.push(i)}),A.patch(`https://teatimeapi-test.onrender.com/orders/${g}`,{orderDetail:C}).then(a=>{}).catch(a=>{console.log(a)})}).catch(v=>{console.log(v)})}).catch(o=>{console.log(o)}),$e(t)}function R(t,n,e,s){t<1e3&&t>=0?(e.forEach((r,o)=>{r.orderItem==s&&(e[o].quantity=t,e[o].totalAmount=n)}),localStorage.setItem("Carts",JSON.stringify(e))):alert("點餐數量請介於0-999間")}function $e(t){$("#orderTotal").html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm">$${t.orderPriceTotal}</p>`);const[n,e]=t.deadlineDateTime.split(" "),[s,r]=t.eventDateTime.split(" "),o=n.split("/"),b=`${o[1]}/${o[2]}`,g=s.split("/"),v=`${g[1]}/${g[2]}`;$("#deadlineDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineDate">${b}</p>`),$("#deadlineTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineTime">${e}</p>`),$("#eventDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="eventDate">${v}</p>`),$("#eventDateTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="eventDateTime">${r}</p>`),localStorage.setItem("Carts","")}function ee(t,n,e){let s="";e?s+=`id=${e}`:s+=`UID=${n}`,$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?${s}`,success:function(r){let o=$("#paginationPagesMenu"),b=window.innerWidth<768;const{products:g,stars:v,category:p}=r[0];localStorage.setItem("category",p);let C=r.length,l=b?5:10,S="";S+=`
                      <div class="order-bg" style=" background: url(${r[0].storeBannerPhoto}) center top /cover;"></div>
                      <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                        <img src="${r[0].storeLogo}" alt="logo-cha source"
                          class="order-icon border border-2 border-line border-radius-24 me-sm-24 me-lg-37 mb-20 mb-sm-0 ">
                        <div class="order-textContent mb-16 mb-sm-0 me-sm-24 me-lg-37">
                          <h2 class="fs-md-40 fs-24 fw-bold lh-sm" id="storeNameID">${r[0].storeName}</h2>
                          <div class="imgItems">
                            ${me(v)}
                          </div>
                          <p class="order-content-p">${r[0].summary}</p>
                        </div>
                        
                        <div class="ms-auto ${t?"d-block":"d-none"}">
                          <ul>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.3335 12.9998C1.3335 8.60034 1.3335 6.4 2.70083 5.03384C4.067 3.6665 6.26733 3.6665 10.6668 3.6665H15.3335C19.733 3.6665 21.9333 3.6665 23.2995 5.03384C24.6668 6.4 24.6668 8.60034 24.6668 12.9998V15.3332C24.6668 19.7327 24.6668 21.933 23.2995 23.2992C21.9333 24.6665 19.733 24.6665 15.3335 24.6665H10.6668C6.26733 24.6665 4.067 24.6665 2.70083 23.2992C1.3335 21.933 1.3335 19.7327 1.3335 15.3332V12.9998Z" stroke="#1E1E1E" stroke-width="2"/>
                                <path d="M7.16699 3.6665V1.9165M18.8337 3.6665V1.9165M1.91699 9.49984H24.0837" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
                                <path d="M20 18.8333C20 19.1428 19.8771 19.4395 19.6583 19.6583C19.4395 19.8771 19.1428 20 18.8333 20C18.5239 20 18.2272 19.8771 18.0084 19.6583C17.7896 19.4395 17.6667 19.1428 17.6667 18.8333C17.6667 18.5239 17.7896 18.2272 18.0084 18.0084C18.2272 17.7896 18.5239 17.6667 18.8333 17.6667C19.1428 17.6667 19.4395 17.7896 19.6583 18.0084C19.8771 18.2272 20 18.5239 20 18.8333ZM20 14.1667C20 14.4761 19.8771 14.7728 19.6583 14.9916C19.4395 15.2104 19.1428 15.3333 18.8333 15.3333C18.5239 15.3333 18.2272 15.2104 18.0084 14.9916C17.7896 14.7728 17.6667 14.4761 17.6667 14.1667C17.6667 13.8572 17.7896 13.5605 18.0084 13.3417C18.2272 13.1229 18.5239 13 18.8333 13C19.1428 13 19.4395 13.1229 19.6583 13.3417C19.8771 13.5605 20 13.8572 20 14.1667ZM14.1667 18.8333C14.1667 19.1428 14.0437 19.4395 13.825 19.6583C13.6062 19.8771 13.3094 20 13 20C12.6906 20 12.3938 19.8771 12.175 19.6583C11.9562 19.4395 11.8333 19.1428 11.8333 18.8333C11.8333 18.5239 11.9562 18.2272 12.175 18.0084C12.3938 17.7896 12.6906 17.6667 13 17.6667C13.3094 17.6667 13.6062 17.7896 13.825 18.0084C14.0437 18.2272 14.1667 18.5239 14.1667 18.8333ZM14.1667 14.1667C14.1667 14.4761 14.0437 14.7728 13.825 14.9916C13.6062 15.2104 13.3094 15.3333 13 15.3333C12.6906 15.3333 12.3938 15.2104 12.175 14.9916C11.9562 14.7728 11.8333 14.4761 11.8333 14.1667C11.8333 13.8572 11.9562 13.5605 12.175 13.3417C12.3938 13.1229 12.6906 13 13 13C13.3094 13 13.6062 13.1229 13.825 13.3417C14.0437 13.5605 14.1667 13.8572 14.1667 14.1667ZM8.33333 18.8333C8.33333 19.1428 8.21042 19.4395 7.99162 19.6583C7.77283 19.8771 7.47609 20 7.16667 20C6.85725 20 6.5605 19.8771 6.34171 19.6583C6.12292 19.4395 6 19.1428 6 18.8333C6 18.5239 6.12292 18.2272 6.34171 18.0084C6.5605 17.7896 6.85725 17.6667 7.16667 17.6667C7.47609 17.6667 7.77283 17.7896 7.99162 18.0084C8.21042 18.2272 8.33333 18.5239 8.33333 18.8333ZM8.33333 14.1667C8.33333 14.4761 8.21042 14.7728 7.99162 14.9916C7.77283 15.2104 7.47609 15.3333 7.16667 15.3333C6.85725 15.3333 6.5605 15.2104 6.34171 14.9916C6.12292 14.7728 6 14.4761 6 14.1667C6 13.8572 6.12292 13.5605 6.34171 13.3417C6.5605 13.1229 6.85725 13 7.16667 13C7.47609 13 7.77283 13.1229 7.99162 13.3417C8.21042 13.5605 8.33333 13.8572 8.33333 14.1667Z" fill="#1E1E1E"/>
                              /svg>
                              <p class="me-16 me-sm-8">08/12</p>
                              <p class="">14:30</p>
                            </li>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ic:round-money-off">
                                <path id="Vector" d="M12.5 6.9C13.92 6.9 14.63 7.44 14.89 8.3C15.02 8.73 15.45 9 15.9 9H15.96C16.66 9 17.18 8.29 16.93 7.64C16.49 6.49 15.52 5.56 14 5.19V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.16C10.61 5.24 10.25 5.37 9.89998 5.52L11.41 7.03C11.73 6.95 12.1 6.9 12.5 6.9ZM4.76998 4.62C4.67728 4.71251 4.60373 4.8224 4.55355 4.94338C4.50337 5.06435 4.47754 5.19403 4.47754 5.325C4.47754 5.45597 4.50337 5.58565 4.55355 5.70662C4.60373 5.8276 4.67728 5.93749 4.76998 6.03L7.49998 8.77C7.49998 10.85 9.05998 11.99 11.41 12.68L14.92 16.19C14.58 16.68 13.87 17.1 12.5 17.1C10.85 17.1 9.99998 16.51 9.66998 15.67C9.51998 15.28 9.17998 15 8.76998 15H8.59998C7.87998 15 7.35998 15.74 7.64998 16.39C8.23998 17.72 9.53998 18.51 11.01 18.83V19.5C11.01 20.33 11.68 21 12.51 21C13.34 21 14.01 20.33 14.01 19.5V18.85C14.97 18.67 15.84 18.3 16.47 17.73L17.98 19.24C18.0726 19.3326 18.1825 19.406 18.3034 19.4561C18.4244 19.5062 18.5541 19.532 18.685 19.532C18.8159 19.532 18.9456 19.5062 19.0665 19.4561C19.1875 19.406 19.2974 19.3326 19.39 19.24C19.4826 19.1474 19.556 19.0375 19.6061 18.9165C19.6562 18.7956 19.682 18.6659 19.682 18.535C19.682 18.4041 19.6562 18.2744 19.6061 18.1535C19.556 18.0325 19.4826 17.9226 19.39 17.83L6.17998 4.62C6.08747 4.5273 5.97758 4.45375 5.85661 4.40357C5.73563 4.35339 5.60595 4.32756 5.47498 4.32756C5.34401 4.32756 5.21433 4.35339 5.09336 4.40357C4.97239 4.45375 4.8625 4.5273 4.76998 4.62Z" fill="#1E1E1E"/>
                                </g>
                                </svg>
                              <p class="me-16 me-sm-8 word-break-keep-all">請客人</p>
                              <p>張雅琪</p>
                            </li>
                            <li class="d-flex align-items-center">
                              <svg class="me-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ic:round-group">
                                <path id="Vector" d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C15.05 13.06 15.06 13.08 15.07 13.09C16.21 13.92 17 15.03 17 16.5V18C17 18.35 16.93 18.69 16.82 19H22C22.55 19 23 18.55 23 18V16.5C23 14.17 18.33 13 16 13Z" fill="#1E1E1E"/>
                                </g>
                                </svg>
                              <p class="me-16 me-sm-8 word-break-keep-all">成團目標</p>
                              <svg class="me-4" width="101" height="12" viewBox="0 0 101 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 6">
                                <rect id="Rectangle 26" width="101" height="12" rx="4" fill="#D9D9D9"/>
                                <rect id="Rectangle 27" width="88.9308" height="12" rx="4" fill="#FD909F"/>
                                </g>
                              </svg>
                              <p style="color: #FD909F;">90%</p>                      
                            </li>
                          </ul>
                        </div>
                      </div>
                      `,$("#storeOrder").html(S),o.pagination({dataSource:g,locator:"items",totalNumber:C,pageSize:l,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(d,E){const I=JSON.parse(JSON.stringify(d));let a="",m="",i="",h=I.slice(0,5),k=I.slice(5),w=[...k];a+=`
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `,$.each(h,function(D,u){a+=`
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${u.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="store-order-h3">${u.品項}</h3>
                                      ${te(u.冷,u.熱,u.價格)}
                                    </div>
                                    <p class="text-top-p">${u.商品描述}</p>
                                  </button>
                                </li>`}),a+=`
                              </ul>
                            </div>`,m+=`
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `,$.each(w,function(D,u){m+=`
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${u.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="productName store-order-h3" data-originalPrice="">${u.品項}</h3>
                                      ${te(u.冷,u.熱,u.價格)}
                                    </div>
                                    <p class="text-top-p">${u.商品描述}</p>
                                  </button>
                                </li>`}),m+=`
                              </ul>
                            </div>`,i+=a,l==5&&(m=""),i+=m,$(".customMenu").html(i),document.querySelectorAll(".menu-button").forEach(D=>{D.addEventListener("click",function(){let u="";const M=this.getAttribute("data-menuuid");I.forEach(c=>{if(c.UID==M){let H=function(){let f=parseInt(x.val())||0;f<0?(x.val(0),f=parseInt(x.val())||0):f>999&&(x.val(999),f=parseInt(x.val())||0);let y=f*ce;$("#mealPrice").text(y)},B=!1;c.冷==!1&&c.熱==!1&&(B=!0),u+=`
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-storeOrder-menu modal-content border-radius-24">
                        <div class="modal-header d-flex flex-column border-0 mb-32 mb-md-40 p-0 ">
                          <div class="modal-header-top d-flex justify-content-between align-items-center w-100 mb-8 mb-md-16">
                            <h5 class="modal-title" id="modalOrderTitle" data-originalPrice="${c.價格}">${c.品項}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          `,B?u+=`
                      <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16 ">
                        <div class="hot d-flex justify-content-center align-items-center ">
                          <span class="">$ ${c.價格}</span>
                        </div>
                      </div>
                    `:u+=`
                            <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16 ${c.冷?"":"d-none"}">
                              <div class="cold d-flex justify-content-center align-items-center ">
                                <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                <span class="me-16">${c.價格}</span>
                              </div>
                              <div class="hot d-flex justify-content-center align-items-center ${c.熱,"d-none"}">
                                <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                <span class="">${c.價格}</span>
                              </div>
                            </div>
                            `,u+=`
                          <p>${c.商品描述}</p>
                        </div>
                        <div class="modal-body p-0 mb-40">
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${B?"d-none":""} ${p==="飲料"?"":"d-none"}">溫度選項</h6>
                          <ul class="mb-32 mb-md-40 ${B?"d-none":""} ${p==="飲料"?"":"d-none"}">
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.冷?"":"d-none"} ">
                              <input class="input-radio-style" type="radio" name="temperature" id="normal_ice" value="正常冰"
                                checked>
                              <label for="normal_ice" class="fs-16 fs-md-20 radio-label">正常冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="smal_ice" value="少冰（8 分冰）">
                              <label for="smal_ice" class="fs-16 fs-md-20 radio-label">少冰（8 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="tiny_ice" value="微冰（3 分冰）">
                              <label for="tiny_ice" class="fs-16 fs-md-20 radio-label">微冰（3 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="no_ice" value="去冰">
                              <label for="no_ice" class="fs-16 fs-md-20 radio-label">去冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.熱?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="warm" value="溫">
                              <label for="warm" class="fs-16 fs-md-20 radio-label">溫</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${c.熱?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="hot" value="熱">
                              <label for="hot" class="fs-16 fs-md-20 radio-label">熱</label>
                            </li>
                          </ul>
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${B?"d-none":""} ${p==="飲料"?"":"d-none"}">甜度選擇</h6>
                          <ul class="mb-32 mb-md-40 ${p==="飲料"?"":"d-none"}">
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="standard_sweetness"
                                value="標準（10 分糖）">
                              <label for="standard_sweetness" class="fs-16 fs-md-20 radio-label">標準（10 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="less_sugar" value="少糖（7 分糖）">
                              <label for="less_sugar" class="fs-16 fs-md-20 radio-label">少糖（7 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="half_sugar" value="半糖（5 分糖）"
                                checked>
                              <label for="half_sugar" class="fs-16 fs-md-20 radio-label">半糖（5 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="slight_sugar" value="微糖（3 分糖）">
                              <label for="slight_sugar" class="fs-16 fs-md-20 radio-label">微糖（3 分糖）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ">
                              <input class="input-radio-style" type="radio" name="sweetness" id="sugar_free" value="無糖">
                              <label for="sugar_free" class="fs-16 fs-md-20 radio-label">無糖</label>
                            </li>
                          </ul>
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${p==="飲料"?"":"d-none"}">加料</h6>
                          <p class="mb-12 text-gray-02 fs-16 ${p==="飲料"?"":"d-none"}">最多可選 2 個項目</p>
                          <ul class="mb-32 mb-md-40 ${p==="飲料"?"":"d-none"}">
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center "
                                for="fresh_milk">升級鮮奶<span class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="fresh_milk" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center " for="pearl">珍珠<span
                                  class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="pearl" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center "
                                for="brown_sugar">黑糖<span class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="brown_sugar" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-end order-1 align-items-center border-bottom border-1 border-gray-03 ">
                              <label class="checkboxStyle-content fs-16 fs-md-20 d-flex  align-items-center " for="agar">寒天晶球<span
                                  class="ms-16">+$10.00</span>
                                <input class="checkboxStyle-checkbox bg-pink" type="checkbox" id="agar" name="subscribe">
                                <span class="checkboxStyle-checkmark"></span>
                              </label>
                            </li>
                          </ul>
                          <div class="">
                            <div class="">
                              <label for="remark" class="mb-24 text-gray-01 fs-20 line-height-sm">備註</label>
                              <textarea rows="3" cols="30"
                                class="no-resize w-100 mb-32 mb-md-32 border-radius-4 border border-1 border-gray-03"
                                name="adding_materials" id="remark"></textarea>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <label for="number" class="text-gray-01 fs-20 line-height-sm">數量</label>
                              <div class="btn-group border-radius-40 border border-2 py-12 px-16" role="group"
                                aria-label="Basic ">
                                <button type="button" class="btn btn-white border-radius-400040" id="numberSub">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M18 12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
                                      fill="#8B8B8A" />
                                  </svg>
                                </button>
                                <input style="width: 35px;" type="text" class="text-brand-02 mx-8 text-center border border-0"
                                  value="1" id="numberInput">
                                <button type="button" class="btn btn-white border-radius-040400" id="numberAdd">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
                                      fill="#8B8B8A" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div class="modal-footer p-0  border-0 text-white ">
                          <button type="button" class="btn btn-brand-03 border-radius-40 py-12 px-24
                          d-flex justify-content-center align-items-center w-100" id="addProductToCarts">
                            <iconify-icon class="me-4 me-sm-8" icon="mdi:cart" style="color: white;" width="20"
                              height="20"></iconify-icon>
                            <p class="text-white me-4 me-sm-8">新增至購物車‧</p>
                            <p class="text-white" id="mealPrice">${c.價格}</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    `,staticBackdrop.innerHTML=u;let oe=$("#numberSub"),x=$("#numberInput"),le=$("#numberAdd"),ie=$("#addProductToCarts"),ce=c.價格;oe.on("click",function(){let f=parseInt(x.val())||0;f>1?(x.val(f-1),H()):x.val(1)}),le.on("click",function(){let f=parseInt(x.val())||0;f<999?(x.val(f+1),H()):x.val(999)}),x.on("input",H),ie.on("click",function(){let f=[],y={};const L=[];if(y.orderItem=$("#modalOrderTitle").text(),y.quantity=$("#numberInput").val(),p=="飲料"){y.ice=$('[name="temperature"]:checked').val(),y.sugar=$('[name="sweetness"]:checked').val();const _=$("#fresh_milk"),j=$("#pearl"),V=$("#brown_sugar"),q=$("#agar");_.is(":checked")&&L.push("升級鮮奶"),j.is(":checked")&&L.push("珍珠"),V.is(":checked")&&L.push("黑糖"),q.is(":checked")&&L.push("寒天晶球")}if(y.comments=$("#remark").val(),y.totalAmount=parseInt($("#mealPrice").text()),y.customization=L,y.originalPrice=c.價格,localStorage.getItem("Carts")){let _=0;const j=JSON.parse(localStorage.getItem("Carts"));j.forEach((V,q)=>{V.orderItem===$("#modalOrderTitle").text()&&(_+=1,j[q]=y)}),_==0&&j.push(y),localStorage.setItem("Carts",JSON.stringify(j))}else f.push(y),localStorage.setItem("Carts",JSON.stringify(f));$("#staticBackdrop").modal("hide")})}})})}),h=[],k=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(r){console.error("error")}})}function te(t,n,e){let s="";return t==!1&&n==!1?s+=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${t?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${e}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ">
        <span class="">$ ${e}</span>
      </div>
    </div>
    `:s+=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${t?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${e}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ${n?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
        <span class="">${e}</span>
      </div>
    </div>
    `,s}const Ie="https://teatimeapi-test.onrender.com",ke=localStorage.getItem("token"),Se=se(ke);document.querySelector(".btnCreateGrouping");const ne=document.getElementById("modal-CreateGroup");ne.addEventListener("show.bs.modal",function(t){const n=document.querySelector(".groupingInitiator");A.get(`${Ie}/users?UID=${Se}`).then(function(e){n.textContent=e.data[0].userName}).catch(function(e){console.error(e.message)})});ne.addEventListener("click",function(t){const n=document.getElementById("enjoymentDate"),e=document.getElementById("orderTerm"),s=document.getElementById("groupingInvitees"),r=n.value.trim(),o=e.value.trim();s.value.trim();let b="",g="";if(r&&(b=moment(r,"YYYY/MM/DD HH:mm")),o&&(g=moment(o,"YYYY/MM/DD HH:mm")),b&&g){const v=b.diff(g,"hours"),p=document.querySelector(".orderTermAlert");v<24?p.classList.remove("d-none"):p.classList.add("d-none")}});const De={enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:15,allowInput:!0,minDate:moment().format("YYYY/MM/DD")};ue(".dateSelector",De);const Te="https://teatimeapi-test.onrender.com",Ee="/ratings",je="_sort=id&_order=desc";let Z=document.querySelector(".rating-cards"),F=document.querySelector(".rating-cards-RWD"),W=document.querySelector(".ratingToggleBtn"),J=document.querySelector(".ratingRWDToggleBtn"),N=[],re=[],ae=window.location.search.slice(-4);(function(){axios.get(`${Te}${Ee}?${je}`).then(function(n){N=n.data,re=N.filter(e=>e.restaurantUID===ae),K()})})();function K(t=4){let n="";re.forEach((e,s)=>{e.restaurantUID===ae&&s<t&&(n+=`
        <div class="feedback-style col-12 col-md-6 pt-32 pt-sm-48 mb-md-32">
            <div class="bg-brand-05 border-radius-16 px-12 px-sm-24 pb-12 pb-sm-24 custom-shadow-025">
                <div class=" transform-32-sm-48 d-flex ">
                <img class="people-img border-radius-24 border border-2 border-line me-16" src=${e.reviewerPhoto} alt="user-img">
                    <div class="feedback-content w-100 d-flex flex-column justify-content-end ">
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-end ">
                        <div class="star-list mb-md-8">
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class="me-4" style="color: #ffd43a;" width="16"></iconify-icon>
                            <iconify-icon icon="ic:round-star" class=" " style="color: #C2C1BD;" width="16"></iconify-icon>
                        </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="fs-16 fs-md-20 text-gray-02">${e.reviewer}</p>
                        <time datetime="2023-09-01" class="">${e.reviewDateTime}</time>
                    </div>
                    </div>
                </div>
                <p class="line-clamp-2">${e.feedbackText}</p>
            </div>
        </div>
      `)}),n!==""?(Z.innerHTML=n,F.innerHTML=n):(Z.innerHTML='<div class="d-flex justify-content-center fs-24 fw-bolder text-brand-03"> 此店家目前無評價</div>',W.classList.add("d-none"),F.innerHTML='<div class="d-flex justify-content-center fs-16 fw-bolder text-brand-03"> 此店家目前無評價</div>',J.classList.add("d-none"))}let Y=!0;J.addEventListener("click",function(){Y=!Y,F.innerHTML="",K(Y==!0?4:N.length),J.classList.toggle("transform180")});let z=!0;W.addEventListener("click",function(){z=!z,Z.innerHTML="",K(z==!0?4:N.length),W.classList.toggle("transform180")});
