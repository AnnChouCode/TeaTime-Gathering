import{b as P}from"./main-2018fec3.js";import{i as Ie,c as ue}from"./notification-ac19cf8c.js";import{a as g}from"./enc-utf8-2021e559.js";import{s as ie}from"./showDateTime-51bda516.js";import{s as pe}from"./showStars-385adb56.js";import{f as ge}from"./index-a4e39586.js";const De=localStorage.getItem("token");document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".btnCreateGrouping"),s=document.querySelectorAll(".btnCart"),e=document.querySelectorAll(".btnWriteReview");Ie(De)?(t.setAttribute("href","#modal-CreateGroup"),t.setAttribute("data-bs-toggle","modal"),s.forEach(n=>{}),e.forEach(n=>{n.setAttribute("href","#modal-WriteReview"),n.setAttribute("data-bs-toggle","modal")})):(t.setAttribute("data-bs-toggle","popover"),t.setAttribute("data-bs-content","請先登入帳號"),s.forEach(a=>{a.setAttribute("data-bs-toggle","popover"),a.setAttribute("data-bs-content","請先登入帳號")}),e.forEach(a=>{a.setAttribute("data-bs-toggle","popover"),a.setAttribute("data-bs-content","請先登入帳號")}),[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(a=>{new P.Popover(a)}))});const Te=moment().format("YYYY/MM/DD"),Se="https://teatimeapi-test.onrender.com",z=location.href.split("=")[1],ke=document.querySelector(".btnTogetherEvent");ke.addEventListener("click",Ee);let _;function Ee(){const t=`_sort=deadlineDateTime&deadlineDateTime_gte=${Te}`;g.get(`${Se}/groupings?_expand=restaurant&${t}`).then(function(s){_=s.data;let e,n;z.startsWith("G")?(e=_.filter(r=>r.UID===z),n=e.length?e[0].restaurantId:""):(e=_.filter(r=>r.restaurant.UID===z),n=e.length?e[0].restaurantId:"");const a=_.filter(r=>r.restaurantId===n);je(a)}).catch(function(s){console.error(s.message)})}function je(t){const s=document.querySelector(".calendarBlock");let e="";t.length?t.forEach(n=>{e+=`<div class="col-md-6 col-xl-4 col-xxxl-3 px-0 px-md-12">
                        <a href="store-order.html?UID=${n.UID}"
                            class="d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line border-radius-40401616 border-radius-lg-80801616 h-100 w-100">
                            <img class="event-img-RWD me-12 me-lg-0 mb-lg-20"
                                src="${n.restaurant.storeCover}"
                                alt="calendar-img">
                                <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${n.restaurant.storeName}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">開團中</p>
                            <div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26" height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${ie(n.deadlineDateTime)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${ie(n.deadlineDateTime)[1]}</time>
                                </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${n.invitees?n.invitees:"無"}</span>
                        </div>
                    </div>
                        </a>
                    </div>`}):e="<p class='fs-16 fs-md-20 text-center'>目前沒有開團</p>",s.innerHTML=e}function ne(t="",s=""){let e={eventDateTime:{},deadlineDateTime:{}};if(t!=""){const[n,a]=t.split(" "),l=new Date(t).toLocaleDateString("en-US",{month:"numeric",day:"numeric"});e.eventDateTime.yymmdd=n,e.eventDateTime.date=l,e.eventDateTime.time=a}if(s!=""){const[n,a]=s.split(" "),l=new Date(s).toLocaleDateString("en-US",{month:"numeric",day:"numeric"});e.deadlineDateTime.yymmdd=n,e.deadlineDateTime.date=l,e.deadlineDateTime.time=a}return e}function fe(t=0,s=0){return Math.floor(t/s*100)}function Ae(t){const s=new Date().getTime(),e=Date.parse(t);return s>e}let Me=localStorage.getItem("token");const G=ue(Me);localStorage.setItem("Carts","");localStorage.setItem("category","");const L=document.querySelector(".shopping-cart"),Be=document.getElementById("modalCartsSendOrder");$(function(){(function(){new P.Modal(document.getElementById("modal-shppingCart-order")),document.getElementById("staticBackdrop");let t=location.href.split("=")[1],s="";const e=!!t.startsWith("G");e?g.get(`https://teatimeapi-test.onrender.com/groupings?UID=${t}&_expand=restaurant&_expand=order`).then(n=>{if(!n.data[0]){$("#modal-storeOrder-eventExpired").modal("show"),$("#storeOrderClose").on("click",function(){window.location.href="https://annchoucode.github.io/TeaTime-Gathering"});return}const{restaurantId:a,deadlineDateTime:r}=n.data[0];Ae(r)?new P.Popover(L,{content:"揪團活動已截止"}):G&&(L.setAttribute("href","#modal-shppingCart-order"),L.setAttribute("data-bs-toggle","modal")),s=a,de(e,t,s,n.data[0]),Ue(n.data[0])}).catch(n=>{console.log(n)}):(new P.Popover(L,{content:"目前您未選擇揪團活動，請先選擇揪團中或建立揪團"}),de(e,t,s,""))})()});function Ue(t){$(".shopping-cart").on("click",function(){localStorage.getItem("category");let s="";t.storeName=$("#storeNameID").text();const e=ne(t.eventDateTime,"");t.yymmdd=e.eventDateTime.yymmdd,t.date=e.eventDateTime.date,t.time=e.eventDateTime.time,$("#modalShppingCartOrderTitle").html(`<p class="fs-20 fs-md-24 line-height-sm fw-bold text-gray-01" id="modalShppingCartOrderTitle">${t.storeName}</p>`),$("#dateCarts").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="dateCarts">${e.eventDateTime.date}</p>`),$("#timeCarts").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="timeCarts">${e.eventDateTime.time}</p>`);const n=localStorage.getItem("Carts");if(n.length!==0){$(".modalCartsFooter").show();const a=JSON.parse(n);let r=0;a.forEach(o=>{r+=parseInt(o.totalAmount);let f="";o.customization.length!==0&&(f=o.customization.join(", ")),s+=`
        <li class="modalCartsLis mb-12 border-bottom border-1 border-gray-03">
                      <div class="d-flex justify-content-between align-items-center w-100 mb-md-16">
                        <p class="text-gray-01 fs-md-20 modalCartsName" data-originalPrice="${o.originalPrice}">${o.orderItem}</p>
                        <p class="text-gray-01 fs-md-20 modalCartsTotalAmount">$${o.totalAmount}</p>
                      </div>
                      <div class="mb-16">
                        ${o.ice?`<p class="text-gray-02">溫度：<span>${o.ice}</span></p>`:""}
                        ${o.sugar?`<p class="text-gray-02">甜度：<span>${o.sugar}</span></p>`:""}
                        ${o.customization.length==0?"":`<p class="text-gray-02">加料：<span>${f}</span></p>`}
                        ${o.comments?`<p class="text-gray-02">備註：<span>${o.comments}</span></p>`:""}
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
                          class="modalCartsInput border border-2 text-brand-02 mx-8 text-center border border-0" data-totalamount="${o.totalAmount}" value="${o.quantity}" >
                        <button type="button"
                          class="modalCartsAddBtn d-flex justify-content-center align-items-center btn btn-white border-radius-040400"
                          style="width: 24px;height: 24px;">
                          <span class="material-symbols-outlined text-gray-02 ">
                            add
                          </span>
                        </button>
                      </div>
                    </li>
        `}),$("#menuListUl").html(s),$("#menuTotal").html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm" id="menuTotal">$${r}</p>`),document.querySelectorAll(".modalCartsLis").forEach(o=>{const f=o.querySelector(".modalCartsAddBtn"),v=o.querySelector(".modalCartsRemoveBtn"),d=o.querySelector(".modalCartsInput"),u=o.querySelector(".modalCartsTotalAmount"),I=o.querySelector(".modalCartsName").textContent,j=parseInt(d.value);v.addEventListener("click",function(){const D=parseInt(d.getAttribute("data-totalamount"));if(parseInt(d.value)-1>=1){const C=parseInt(d.value);d.value=C-1;const w=parseInt(d.value),T=D*w;u.textContent=`$${T}`,W(w,a,I)}else{const C=o.querySelector(".modalCartsInput");C.value=1}}),d.addEventListener("input",function(D){const C=parseInt(d.getAttribute("data-totalamount"));u.textContent=`$${D.target.value*C}`,W(D.target.value,a,I)}),f.addEventListener("click",function(){if(j<999){const D=parseInt(d.getAttribute("data-totalamount")),C=parseInt(d.value);d.value=C+1;const w=parseInt(d.value),T=D*w;u.textContent=`$${T}`,W(w,a,I)}else d.value=999})})}else s=`
      <li class="mb-12 border-bottom border-top border-1 border-gray-03 py-12 mb-40">
        <p class="text-gray-01 fs-md-20">購物車目前空蕩蕩，選點下午茶吧！</p>
      </li>
      `,$("#menuListUl").html(s),$(".modalCartsFooter").hide()}),Be.addEventListener("click",function(){_e(t)})}function _e(t){if(!G)return;$("#modal-shppingCart-order").modal("hide"),$("#modal-successfullyOrdered").modal("show");const s=document.getElementById("menuTotal"),e=parseInt(s.textContent.replace("$","")),n=JSON.parse(localStorage.getItem("Carts")),a=JSON.parse(JSON.stringify(n));t.orderPriceTotal=e,t.orderUserId=G,g.get(`https://teatimeapi-test.onrender.com/users?UID=${G}`).then(r=>{const{userName:l}=r.data[0],{orderId:o,UID:f}=t,v=f;return t.userName=l,g.get(`https://teatimeapi-test.onrender.com/orders?id=${o}`).then(d=>{const u=d.data[0],{orderDetail:I,groupingId:j,restaurantId:D,UID:C}=u,w=[];let T="";return I.forEach((i,x)=>{n.forEach((c,A)=>{c.customization.length!=0&&(T=c.customization.join("、")),i.name==l&&i.orderItem==c.orderItem&&(w.push(A),I[x]={name:l,orderItem:c.orderItem,quantity:parseInt(c.quantity),ice:c.ice?`${c.ice}`:"",sugar:c.sugar?`${c.sugar}`:"",customization:c.customization?`${T}`:"",comments:c.comments,totalAmount:c.totalAmount,isPay:i.isPay,ratingID:i.ratingID})})}),w.length>0&&w.reverse().forEach(x=>{a.splice(x,1)}),a.forEach(i=>{let x="";i.customization.length!=0&&(x=i.customization.join("、"));const c={name:l,orderItem:i.orderItem,quantity:parseInt(i.quantity),ice:i.ice?`${i.ice}`:"",sugar:i.sugar?`${i.sugar}`:"",customization:i.customization?`${x}`:"",comments:i.comments,totalAmount:i.totalAmount,isPay:!1,ratingID:""};I.push(c)}),g.patch(`https://teatimeapi-test.onrender.com/orders/${o}`,{orderDetail:I}).then(i=>{Le(v)}).catch(i=>{console.log(i)})}).catch(d=>{console.log(d)})}).catch(r=>{console.log(r)}),Pe(t)}function Le(t){g.get(`https://teatimeapi-test.onrender.com/groupings?UID=${t}&_expand=restaurant&_expand=order`).then(s=>{const e=s.data[0];let n=0;n=fe(e.order.orderDetail.length,e.restaurant.minGroupSize),$("#groupingProgressBar").html(`
      <div class="bar bg-brand-02" style="--value: ${n}">
        <div class="text-white">${n>100?100:n}%</div>
      </div>
    `)}).catch(s=>{console.log(s)})}function W(t,s,e){const n=document.getElementById("menuTotal");if(t<1e3&&t>=0){s.forEach((r,l)=>{r.orderItem==e&&(s[l].quantity=t)});let a=0;s.forEach(r=>{a+=r.totalAmount*r.quantity}),n.textContent=`$${a}`,localStorage.setItem("Carts",JSON.stringify(s))}else alert("點餐數量請介於0-999間")}function Pe(t){$("#orderTotal").html(`<p class="fw-md-bold fw-medium fs-20 fs-md-24 line-height-sm">$${t.orderPriceTotal}</p>`);const s=ne(t.eventDateTime,t.deadlineDateTime);$("#eventDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="eventDate">${s.eventDateTime.date}</p>`),$("#eventDateTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="eventDateTime">${s.eventDateTime.time}</p>`),$("#deadlineDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineDate">${s.deadlineDateTime.date}</p>`),$("#deadlineTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="deadlineTime">${s.deadlineDateTime.time}</p>`),localStorage.setItem("Carts","")}function de(t,s,e,n=""){let a=0;n&&(a=fe(n.order.orderDetail.length,n.restaurant.minGroupSize));let r="";e?r+=`id=${e}`:r+=`UID=${s}`,$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?${r}`,success:function(l){let o=$("#paginationPagesMenu"),f=window.innerWidth<768;const{products:v,stars:d,category:u}=l[0];localStorage.setItem("category",u);let I=l.length,j=f?5:10,D="";const C=ne(n.eventDateTime,"");D+=`
                      <div class="order-bg" style=" background: url(${l[0].storeBannerPhoto}) center top /cover;"></div>
                      <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                        <img src="${l[0].storeLogo}" alt="logo-cha source"
                          class="order-icon border border-2 border-line border-radius-24 me-sm-24 me-lg-37 mb-20 mb-sm-0 ">
                        <div class="order-textContent mb-16 mb-sm-0 me-sm-24 me-lg-37">
                          <h2 class="fs-md-40 fs-24 fw-bold lh-sm" id="storeNameID">${l[0].storeName}</h2>
                          <div class="imgItems">
                            ${pe(d)}
                          </div>
                          <p class="order-content-p">${l[0].summary}</p>
                        </div>
                        
                        <div class="ms-auto ${t?"d-block":"d-none"}">
                          <ul>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.3335 12.9998C1.3335 8.60034 1.3335 6.4 2.70083 5.03384C4.067 3.6665 6.26733 3.6665 10.6668 3.6665H15.3335C19.733 3.6665 21.9333 3.6665 23.2995 5.03384C24.6668 6.4 24.6668 8.60034 24.6668 12.9998V15.3332C24.6668 19.7327 24.6668 21.933 23.2995 23.2992C21.9333 24.6665 19.733 24.6665 15.3335 24.6665H10.6668C6.26733 24.6665 4.067 24.6665 2.70083 23.2992C1.3335 21.933 1.3335 19.7327 1.3335 15.3332V12.9998Z" stroke="#1E1E1E" stroke-width="2"/>
                                <path d="M7.16699 3.6665V1.9165M18.8337 3.6665V1.9165M1.91699 9.49984H24.0837" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
                                <path d="M20 18.8333C20 19.1428 19.8771 19.4395 19.6583 19.6583C19.4395 19.8771 19.1428 20 18.8333 20C18.5239 20 18.2272 19.8771 18.0084 19.6583C17.7896 19.4395 17.6667 19.1428 17.6667 18.8333C17.6667 18.5239 17.7896 18.2272 18.0084 18.0084C18.2272 17.7896 18.5239 17.6667 18.8333 17.6667C19.1428 17.6667 19.4395 17.7896 19.6583 18.0084C19.8771 18.2272 20 18.5239 20 18.8333ZM20 14.1667C20 14.4761 19.8771 14.7728 19.6583 14.9916C19.4395 15.2104 19.1428 15.3333 18.8333 15.3333C18.5239 15.3333 18.2272 15.2104 18.0084 14.9916C17.7896 14.7728 17.6667 14.4761 17.6667 14.1667C17.6667 13.8572 17.7896 13.5605 18.0084 13.3417C18.2272 13.1229 18.5239 13 18.8333 13C19.1428 13 19.4395 13.1229 19.6583 13.3417C19.8771 13.5605 20 13.8572 20 14.1667ZM14.1667 18.8333C14.1667 19.1428 14.0437 19.4395 13.825 19.6583C13.6062 19.8771 13.3094 20 13 20C12.6906 20 12.3938 19.8771 12.175 19.6583C11.9562 19.4395 11.8333 19.1428 11.8333 18.8333C11.8333 18.5239 11.9562 18.2272 12.175 18.0084C12.3938 17.7896 12.6906 17.6667 13 17.6667C13.3094 17.6667 13.6062 17.7896 13.825 18.0084C14.0437 18.2272 14.1667 18.5239 14.1667 18.8333ZM14.1667 14.1667C14.1667 14.4761 14.0437 14.7728 13.825 14.9916C13.6062 15.2104 13.3094 15.3333 13 15.3333C12.6906 15.3333 12.3938 15.2104 12.175 14.9916C11.9562 14.7728 11.8333 14.4761 11.8333 14.1667C11.8333 13.8572 11.9562 13.5605 12.175 13.3417C12.3938 13.1229 12.6906 13 13 13C13.3094 13 13.6062 13.1229 13.825 13.3417C14.0437 13.5605 14.1667 13.8572 14.1667 14.1667ZM8.33333 18.8333C8.33333 19.1428 8.21042 19.4395 7.99162 19.6583C7.77283 19.8771 7.47609 20 7.16667 20C6.85725 20 6.5605 19.8771 6.34171 19.6583C6.12292 19.4395 6 19.1428 6 18.8333C6 18.5239 6.12292 18.2272 6.34171 18.0084C6.5605 17.7896 6.85725 17.6667 7.16667 17.6667C7.47609 17.6667 7.77283 17.7896 7.99162 18.0084C8.21042 18.2272 8.33333 18.5239 8.33333 18.8333ZM8.33333 14.1667C8.33333 14.4761 8.21042 14.7728 7.99162 14.9916C7.77283 15.2104 7.47609 15.3333 7.16667 15.3333C6.85725 15.3333 6.5605 15.2104 6.34171 14.9916C6.12292 14.7728 6 14.4761 6 14.1667C6 13.8572 6.12292 13.5605 6.34171 13.3417C6.5605 13.1229 6.85725 13 7.16667 13C7.47609 13 7.77283 13.1229 7.99162 13.3417C8.21042 13.5605 8.33333 13.8572 8.33333 14.1667Z" fill="#1E1E1E"/>
                              /svg>
                              <p class="me-16 me-sm-8">${C.eventDateTime.date}</p>
                              <p class="">${C.eventDateTime.time}</p>
                            </li>
                            <li class="d-flex align-items-center mb-16">
                              <svg class="me-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ic:round-money-off">
                                <path id="Vector" d="M12.5 6.9C13.92 6.9 14.63 7.44 14.89 8.3C15.02 8.73 15.45 9 15.9 9H15.96C16.66 9 17.18 8.29 16.93 7.64C16.49 6.49 15.52 5.56 14 5.19V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.16C10.61 5.24 10.25 5.37 9.89998 5.52L11.41 7.03C11.73 6.95 12.1 6.9 12.5 6.9ZM4.76998 4.62C4.67728 4.71251 4.60373 4.8224 4.55355 4.94338C4.50337 5.06435 4.47754 5.19403 4.47754 5.325C4.47754 5.45597 4.50337 5.58565 4.55355 5.70662C4.60373 5.8276 4.67728 5.93749 4.76998 6.03L7.49998 8.77C7.49998 10.85 9.05998 11.99 11.41 12.68L14.92 16.19C14.58 16.68 13.87 17.1 12.5 17.1C10.85 17.1 9.99998 16.51 9.66998 15.67C9.51998 15.28 9.17998 15 8.76998 15H8.59998C7.87998 15 7.35998 15.74 7.64998 16.39C8.23998 17.72 9.53998 18.51 11.01 18.83V19.5C11.01 20.33 11.68 21 12.51 21C13.34 21 14.01 20.33 14.01 19.5V18.85C14.97 18.67 15.84 18.3 16.47 17.73L17.98 19.24C18.0726 19.3326 18.1825 19.406 18.3034 19.4561C18.4244 19.5062 18.5541 19.532 18.685 19.532C18.8159 19.532 18.9456 19.5062 19.0665 19.4561C19.1875 19.406 19.2974 19.3326 19.39 19.24C19.4826 19.1474 19.556 19.0375 19.6061 18.9165C19.6562 18.7956 19.682 18.6659 19.682 18.535C19.682 18.4041 19.6562 18.2744 19.6061 18.1535C19.556 18.0325 19.4826 17.9226 19.39 17.83L6.17998 4.62C6.08747 4.5273 5.97758 4.45375 5.85661 4.40357C5.73563 4.35339 5.60595 4.32756 5.47498 4.32756C5.34401 4.32756 5.21433 4.35339 5.09336 4.40357C4.97239 4.45375 4.8625 4.5273 4.76998 4.62Z" fill="#1E1E1E"/>
                                </g>
                                </svg>
                              <p class="me-16 me-sm-8 word-break-keep-all">請客人</p>
                              <p class='word-break-keep-all'>${n.invitees?n.invitees:"無"}</p>
                            </li>
                            <li class="d-flex align-items-center">
                            <iconify-icon icon="ic:round-group" style="color: #1e1e1e;" width="24" height="24" class="me-8"></iconify-icon>
                            <p class="me-16 me-sm-8 word-break-keep-all">成團目標</p>
                              <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;" id="groupingProgressBar">
                                <div class="bar bg-brand-02" style="--value: ${a}">
                                    <div class="text-white">${a>100?100:a}%</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      `,$("#storeOrder").html(D),o.pagination({dataSource:v,locator:"items",totalNumber:I,pageSize:j,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(w,T){const i=JSON.parse(JSON.stringify(w));let x="",c="",A="",oe=i.slice(0,5),le=i.slice(5),ye=[...le];x+=`
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `,$.each(oe,function(R,p){x+=`
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${p.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="store-order-h3">${p.品項}</h3>
                                      ${ce(p.冷,p.熱,p.價格)}
                                    </div>
                                    <p class="text-top-p">${p.商品描述}</p>
                                  </button>
                                </li>`}),x+=`
                              </ul>
                            </div>`,c+=`
                            <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                            <ul id="">
                          `,$.each(ye,function(R,p){c+=`
                                <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                  <button type="button" class="menu-button border-0 bg-white text-start w-100" data-menuUID="${p.UID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                      <h3 class="productName store-order-h3" data-originalPrice="">${p.品項}</h3>
                                      ${ce(p.冷,p.熱,p.價格)}
                                    </div>
                                    <p class="text-top-p">${p.商品描述}</p>
                                  </button>
                                </li>`}),c+=`
                              </ul>
                            </div>`,A+=x,j==5&&(c=""),A+=c,$(".customMenu").html(A),document.querySelectorAll(".menu-button").forEach(R=>{R.addEventListener("click",function(){let p="";const ve=this.getAttribute("data-menuuid");i.forEach(m=>{if(m.UID==ve){let V=function(){let b=parseInt(h.val())||0;b<0?(h.val(0),b=parseInt(h.val())||0):b>999&&(h.val(999),b=parseInt(h.val())||0);let y=b*k;$("#mealPrice").text(y)},M=!1;m.冷==!1&&m.熱==!1&&(M=!0),p+=`
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-storeOrder-menu modal-content border-radius-24">
                        <div class=" d-flex flex-column border-0 mb-32 mb-md-40 p-0 ">
                          <div class="modal-header-top d-flex justify-content-between align-items-center w-100 mb-8 mb-md-16">
                            <h5 class="modal-title" id="modalOrderTitle" data-originalPrice="${m.價格}">${m.品項}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          `,M?p+=`
                      <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16 ">
                        <div class="hot d-flex justify-content-center align-items-center ">
                          <span class="">$ ${m.價格}</span>
                        </div>
                      </div>
                    `:p+=`
                            <div class="cold-hot d-flex  align-items-center w-100 mb-8 mb-md-16">
                              <div class="cold d-flex justify-content-center align-items-center ${m.冷?"":"d-none"}">
                                <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                <span class="me-16">${m.價格}</span>
                              </div>
                              <div class="hot d-flex justify-content-center align-items-center ${m.熱?"":"d-none"}">
                                <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                <span class="">${m.價格}</span>
                              </div>
                            </div>
                            `,p+=`
                          <p>${m.商品描述}</p>
                        </div>
                        <div class="modal-body p-0 mb-40">
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${M?"d-none":""} ${u==="飲料"?"":"d-none"}">溫度選項</h6>
                          <ul class="mb-32 mb-md-40 ${M?"d-none":""} ${u==="飲料"?"":"d-none"}">
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.冷?"":"d-none"} ">
                              <input class="input-radio-style" type="radio" name="temperature" id="normal_ice" value="正常冰"
                                checked>
                              <label for="normal_ice" class="fs-16 fs-md-20 radio-label">正常冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="smal_ice" value="少冰（8 分冰）">
                              <label for="smal_ice" class="fs-16 fs-md-20 radio-label">少冰（8 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="tiny_ice" value="微冰（3 分冰）">
                              <label for="tiny_ice" class="fs-16 fs-md-20 radio-label">微冰（3 分冰）</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.冷?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="no_ice" value="去冰">
                              <label for="no_ice" class="fs-16 fs-md-20 radio-label">去冰</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.熱?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="warm" value="溫">
                              <label for="warm" class="fs-16 fs-md-20 radio-label">溫</label>
                            </li>
                            <li
                              class="py-12 d-flex justify-content-between align-items-center border-bottom border-1 border-gray-03 ${m.熱?"":"d-none"}">
                              <input class="input-radio-style" type="radio" name="temperature" id="hot" value="熱">
                              <label for="hot" class="fs-16 fs-md-20 radio-label">熱</label>
                            </li>
                          </ul>
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${M?"d-none":""} ${u==="飲料"?"":"d-none"}">甜度選擇</h6>
                          <ul class="mb-32 mb-md-40 ${u==="飲料"?"":"d-none"}">
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
                          <h6 class="mb-12 text-gray-01 fs-20 line-height-sm ${u==="飲料"?"":"d-none"}">加料</h6>
                          <p class="mb-12 text-gray-02 fs-16 ${u==="飲料"?"":"d-none"}">最多可選 2 個項目</p>
                          <ul class="mb-32 mb-md-40 ${u==="飲料"?"":"d-none"}">
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
                            <p class="text-white" id="mealPrice">${m.價格}</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    `,staticBackdrop.innerHTML=p;let $e=$("#numberSub"),h=$("#numberInput"),Ce=$("#numberAdd"),we=$("#addProductToCarts"),xe=m.價格,k=0;k=parseInt(xe),u=="飲料"&&$("[name='subscribe']").change(function(){$(this).is(":checked")?k+=10:k-=10,$("#mealPrice").text(`${k*h.val()}`)}),$e.on("click",function(){let b=parseInt(h.val())||0;b>1?(h.val(b-1),V()):h.val(1)}),Ce.on("click",function(){let b=parseInt(h.val())||0;b<999?(h.val(b+1),V()):h.val(999)}),h.on("input",V),we.on("click",function(){let b=[],y={};const B=[];if(y.orderItem=$("#modalOrderTitle").text(),y.quantity=$("#numberInput").val(),y.totalAmount=$("#numberInput").val()*k,u=="飲料"){y.ice=$('[name="temperature"]:checked').val(),y.sugar=$('[name="sweetness"]:checked').val();const U=$("#fresh_milk"),E=$("#pearl"),Y=$("#brown_sugar"),F=$("#agar");U.is(":checked")&&B.push("升級鮮奶"),E.is(":checked")&&B.push("珍珠"),Y.is(":checked")&&B.push("黑糖"),F.is(":checked")&&B.push("寒天晶球")}if(y.comments=$("#remark").val(),y.customization=B,y.originalPrice=m.價格,localStorage.getItem("Carts")){let U=0;const E=JSON.parse(localStorage.getItem("Carts"));E.forEach((Y,F)=>{Y.orderItem===$("#modalOrderTitle").text()&&(U+=1,E[F]=y)}),U==0&&E.push(y),localStorage.setItem("Carts",JSON.stringify(E))}else b.push(y),localStorage.setItem("Carts",JSON.stringify(b));$("#staticBackdrop").modal("hide")})}})})}),oe=[],le=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(l){console.error("error")}})}function ce(t,s,e){let n="";return t==!1&&s==!1?n+=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${t?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${e}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ">
        <span class="">$ ${e}</span>
      </div>
    </div>
    `:n+=`
      <div class="cold-hot d-flex justify-content-center align-items-center">
      <div class="cold d-flex justify-content-center align-items-center  ${t?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
        <span class="me-8">${e}</span>
      </div>
      <div class="hot d-flex justify-content-center align-items-center ${s?"":"hidden-block"}">
        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
        <span class="">${e}</span>
      </div>
    </div>
    `,n}const Ge="https://teatimeapi-test.onrender.com",Ne=localStorage.getItem("token"),qe=ue(Ne);let N="",q="",J=!1,ae="",K="";document.querySelector(".btnCreateGrouping");const be=document.getElementById("modal-CreateGroup"),He=document.getElementById("addGrouping"),me=document.getElementById("groupingInvitees");let Q=location.href.split("=")[1];const Oe=!!Q.startsWith("G");let H="";Oe?g.get(`https://teatimeapi-test.onrender.com/groupings?UID=${Q}`).then(t=>{H=t.data[0].restaurantId}).catch(t=>{console.log(t)}):g.get(`https://teatimeapi-test.onrender.com/restaurants?UID=${Q}`).then(t=>{H=t.data[0].id}).catch(t=>{console.log(t)});He.addEventListener("click",function(t){let s="";if(N==""){$(".EnjoyFillAlert").addClass("shake-element"),setTimeout(function(){$(".EnjoyFillAlert").removeClass("shake-element")},2e3);return}else{let e=new Date(N);const n=`${e.getMonth()+1}/${e.getDate()}`,a=`${e.getHours()}:${String(e.getMinutes()).padStart(2,"0")}`;$("#groupEnjoyDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyDate">${n}</p>`),$("#groupEnjoyTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyTime">${a}</p>`)}if(q==""){$(".orderFillAlert").addClass("shake-element"),setTimeout(function(){$(".orderFillAlert").removeClass("shake-element")},2e3);return}else{let e=new Date(q);const n=`${e.getMonth()+1}/${e.getDate()}`,a=`${e.getHours()}:${String(e.getMinutes()).padStart(2,"0")}`;$("#groupDeadlineDate").html(`<p class="me-8 fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyDate">${n}</p>`),$("#groupDeadlineTime").html(`<p class="fs-16 fs-md-20 fw-medium line-height-sm" id="groupEnjoyTime">${a}</p>`)}if(!J){if(me.value==""){$(".inviteesFillAlert").addClass("shake-element"),setTimeout(function(){$(".inviteesFillAlert").removeClass("shake-element")},2e3);return}else s=me.value.toString()=="no-invitees"?"":`${ae}`;Re(s)}});function Re(t){let s={restaurantId:H,orderDetail:[]},e={restaurantId:H,deadlineDateTime:q.toString(),eventDateTime:N.toString(),initiatorId:K,initiator:ae.toString(),inviteesId:t?K:"",invitees:t?`${t}`:""};const n=g.get("https://teatimeapi-test.onrender.com/orders"),a=g.get("https://teatimeapi-test.onrender.com/groupings");g.all([n,a]).then(g.spread((r,l)=>{let o=r.data.length+1,f=l.data.length+1;s.groupingId=f,e.orderId=o;let v=Ve(o,f);s.UID=v.ordersUID,e.UID=v.groupingsUID,g.post("https://teatimeapi-test.onrender.com/orders",s).then(d=>g.post("https://teatimeapi-test.onrender.com/groupings",e).then(u=>{$("#modal-CreateGroup").modal("hide"),$("#modal-successfullyGroup").modal("show"),window.location.href=`store-order.html?UID=${e.UID}`}).catch(u=>{console.log(u)})).catch(d=>{console.log(d)})})).catch(r=>{console.log(r)})}function Ve(t,s){let e={},n=Math.floor(Math.log10(t))+1,a=Math.floor(Math.log10(s))+1;return n==1?e.ordersUID=`O0${t.toString().padStart(n+1,"0")}`:n==2?e.ordersUID=`O${t.toString().padStart(n+1,"0")}`:e.ordersUID=`O${t.toString().padStart(n,"0")}`,a==1?e.groupingsUID=`G0${s.toString().padStart(a+1,"0")}`:a==2?e.groupingsUID=`G${s.toString().padStart(a+1,"0")}`:e.groupingsUID=`G${s.toString().padStart(a,"0")}`,e}be.addEventListener("show.bs.modal",function(t){const s=document.querySelector(".groupingInitiator"),e=$("#storeNameID").html();$("#orderStoreId").html(`<p class="text-gray-01" id="orderStoreId">${e}</p>`),g.get(`${Ge}/users?UID=${qe}`).then(function(n){s.textContent=n.data[0].userName;const{userName:a,id:r}=n.data[0];ae=a,K=r}).catch(function(n){console.error(n.message)})});be.addEventListener("click",function(t){const s=document.getElementById("enjoymentDate"),e=document.getElementById("orderTerm"),n=document.getElementById("groupingInvitees"),a=s.value.trim(),r=e.value.trim();n.value.trim();let l="",o="";if(a&&(l=moment(a,"YYYY/MM/DD HH:mm")),r&&(o=moment(r,"YYYY/MM/DD HH:mm")),l&&o){const f=l.diff(o,"hours"),v=document.querySelector(".orderTermAlert");f<24?(v.classList.remove("d-none"),J=!0):(v.classList.add("d-none"),J=!1)}l&&$(".EnjoyFillAlert").addClass("d-none"),o&&$(".orderFillAlert").addClass("d-none"),$("#groupingInvitees").change(function(){var f=$(this).val();f===""?$(".inviteesFillAlert").show():$(".inviteesFillAlert").hide()})});ge("#enjoymentDate",{enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:15,allowInput:!0,minDate:moment().format("YYYY/MM/DD"),onClose:function(t,s,e){N=s}});ge("#orderTerm",{enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:5,allowInput:!0,minDate:moment().format("YYYY/MM/DD"),onClose:function(t,s,e){q=s}});const Ye="https://teatimeapi-test.onrender.com",Fe="/ratings",ze="_sort=id&_order=desc";let X=document.querySelector(".rating-cards"),ee=document.querySelector(".rating-cards-RWD"),te=document.querySelector(".ratingToggleBtn"),se=document.querySelector(".ratingRWDToggleBtn"),O=[],he=[],S=window.location.search.slice(-4);(async function(){S.startsWith("G")&&(S=(await Promise.all([g.get(`https://teatimeapi-test.onrender.com/groupings?UID=${S}&_expand=restaurant`)]))[0].data[0].restaurant.UID),We()})();function We(){g.get(`${Ye}${Fe}?${ze}`).then(function(t){O=t.data,he=O.filter(s=>s.restaurantUID===S),console.log(S),re()})}function re(t=4){let s="";he.forEach((e,n)=>{if(e.restaurantUID===S&&n<t){let a=pe(e.starRating);s+=`
        <div class="feedback-style col-12 col-md-6 pt-32 pt-sm-48 mb-md-32">
            <div class="bg-brand-05 border-radius-16 px-12 px-sm-24 pb-12 pb-sm-24 custom-shadow-025">
                <div class=" transform-32-sm-48 d-flex ">
                <img class="people-img border-radius-24 border border-2 border-line me-16" src=${e.reviewerPhoto} alt="user-img">
                    <div class="feedback-content w-100 d-flex flex-column justify-content-end ">
                    <div class="d-flex">
                        <div class="d-flex flex-column justify-content-end ">
                        <div class="star-list mb-md-8">
                            ${a}
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
        </div>`}}),s!==""?(X.innerHTML=s,ee.innerHTML=s):(X.innerHTML='<div class="d-flex justify-content-center fs-24 fw-bolder text-brand-03"> 此店家目前無評價</div>',te.classList.add("d-none"),ee.innerHTML='<div class="d-flex justify-content-center fs-16 fw-bolder text-brand-03"> 此店家目前無評價</div>',se.classList.add("d-none"))}se.addEventListener("click",function(){let t=!0;t=!t,ee.innerHTML="",re(t==!0?4:O.length),se.classList.toggle("transform180")});let Z=!0;te.addEventListener("click",function(){Z=!Z,X.innerHTML="",re(Z==!0?4:O.length),te.classList.toggle("transform180")});const Ze=document.getElementById("updateRatingBtn");Ze.addEventListener("click",Je);async function Je(){let t={},s=document.querySelector("[data-rating-star]").dataset.ratingStar,e=document.querySelector(".memberEvaluate");const n=document.querySelector("#memberModalLabel");e.value!==""&&(t={UID:"R004",reviewer:"黃莉琳",reviewerPhoto:"https://raw.githubusercontent.com/AnnChouCode/TeaTime-Gathering/main/assets/images/user/female/user-female-03.jpg",starRating:Number(s),feedbackText:e.value,reviewedRestaurant:n.textContent,restaurantUID:S,reviewDateTime:moment().format("YYYY/MM/DD")},g.post("https://teatimeapi-test.onrender.com/ratings",t).then(function(a){e.value="",document.querySelector("#modal-WriteReview .btn-close").click(),setTimeout(()=>{alert("留言評價成功")},100)}))}
