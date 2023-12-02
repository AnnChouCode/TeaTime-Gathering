import"./main-ed97c786.js";import"./notification-98983fc9.js";import{a as D}from"./axios-3a76d256.js";import{s as b}from"./showDateTime-51bda516.js";import{s as M}from"./showStars-385adb56.js";const k=moment().format("YYYY/MM/DD"),g=location.href.split("=")[1],E=document.querySelector(".btnTogetherEvent");E.addEventListener("click",T);let c;async function T(){const n=`_sort=deadlineDateTime&deadlineDateTime_gte=${k}`;await D.get(`https://teatimeapi-test.onrender.com/groupings?_expand=restaurant&${n}`).then(function(i){c=i.data;let s,e;g.startsWith("G")?(s=c.filter(l=>l.UID===g),e=s.length?s[0].restaurantId:""):(s=c.filter(l=>l.restaurant.UID===g),e=s.length?s[0].restaurantId:"");const d=c.filter(l=>l.restaurantId===e);V(d)}).catch(function(i){console.error(i.message)})}function V(n){const i=document.querySelector(".calendarBlock");let s="";n.length?n.forEach(e=>{s+=`<div class="col-md-6 col-xl-4 col-xxxl-3 px-0 px-md-12">
                        <a href="store-order.html?UID=${e.UID}"
                            class="d-flex flex-lg-column p-12 p-lg-16 align-items-center justify-content-center bg-white border-hover-line border-radius-40401616 border-radius-lg-80801616 h-100 w-100">
                            <img class="event-img-RWD me-12 me-lg-0 mb-lg-20"
                                src="${e.restaurant.storeCover}"
                                alt="calendar-img">
                                <div class="d-flex flex-column justify-content-between w-60 w-lg-100 flex-grow-1">
                        <p class="mb-8 mb-lg-16 fs-20 fs-lg-24 fw-bold lh-sm text-brand-03 single-ellipsis">${e.restaurant.storeName}</p>
                        <div class="d-flex justify-content-between align-items-center mb-8 mb-lg-16">
                            <p class="fs-16 fs-lg-20 text-gray-05">開團中</p>
                            <div class="d-flex align-items-center ms-8 gap-md-8 gap-4">
                                    <iconify-icon icon="solar:calendar-linear" style="color: #1e1e1e;" width="26" height="26"></iconify-icon>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${b(e.deadlineDateTime)[0]}</time>
                                    <time class="fw-medium lh-sm fs-16 fs-lg-20">${b(e.deadlineDateTime)[1]}</time>
                                </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fs-16 fs-lg-20 text-gray-05">請客人</p>
                            <span class="fs-16 fs-lg-20 lh-sm fw-medium">${e.invitees?e.invitees:"無"}</span>
                        </div>
                    </div>
                        </a>
                    </div>`}):s="<p class='fs-16 fs-md-20 text-center'>目前沒有開團</p>",i.innerHTML=s}$(function(){(function(){let n=$("#paginationPagesMenu");const i=location.href.split("=")[1];console.log(i);let s=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${i}`,success:function(e){let d=e.length,l=e[0].products,r=e[0],p=s?5:10,C="",w=M(r.stars);C+=`
                    <div class="order-bg" style=" background: url(${r.storeBannerPhoto}) center top /cover;"></div>
                    <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                      <img src="${r.storeLogo}" alt="logo-cha source"
                        class="order-icon border border-2 border-line border-radius-24 me-sm-24 me-lg-37 mb-20 mb-sm-0 ">
                      <div class="order-textContent mb-16 mb-sm-0 me-sm-24 me-lg-37">
                        <h2 class="fs-md-40 fs-24 fw-bold lh-sm">${r.storeName}</h2>
                        <div class="imgItems">
                          ${w}
                        </div>
                        <p class="order-content-p">${r.summary}</p>
                      </div>
                      <div class="ms-auto">
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
                    `,$("#storeOrder").html(C),n.pagination({dataSource:l,locator:"items",totalNumber:d,pageSize:p,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(v,I){const u=JSON.parse(JSON.stringify(v));let a="",o="",m="",h=u.slice(0,5),f=u.slice(5),x=[...f];a+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(h,function(y,t){a+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${t.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center">
                                      <div class="cold d-flex justify-content-center align-items-center ${t.冷?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${t.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${t.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${t.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${t.商品描述}</p>
                                </button>
                              </li>`}),a+=`
                            </ul>
                          </div>`,o+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(x,function(y,t){o+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${t.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center">
                                      <div class="cold d-flex justify-content-center align-items-center  ${t.冷?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${t.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${t.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${t.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${t.商品描述}</p>
                                </button>
                              </li>`}),o+=`
                            </ul>
                          </div>`,m+=a,p==5&&(o=""),m+=o,$(".customMenu").html(m),h=[],f=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(e){console.error("error")}})})()});
