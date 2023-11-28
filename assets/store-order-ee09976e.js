import"./main-a84cd557.js";import"./nav-7ac77614.js";import{s as x}from"./showStars-385adb56.js";$(function(){(function(){let p=$("#paginationPagesMenu"),t="";localStorage.getItem("UID")?t=localStorage.getItem("UID"):t="B001",console.log(t),console.log(t);let b=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${t}`,success:function(s){console.log(s);let g=s.length,u=s[0].products,o=s[0],l=b?5:10,c="",h=x(o.stars);c+=`
                    <div class="order-bg" style=" background: url(${o.storeBannerPhoto}) center top /cover;"></div>
                    <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                      <img src="${o.storeLogo}" alt="logo-cha source"
                        class="order-icon border border-2 border-line border-radius-24 me-sm-37 mb-20 mb-sm-0 ">
                      <div class="order-textContent">
                        <h2 class="fs-md-40 fs-24 fw-bold lh-sm">${o.storeName}</h2>
                        <div class="imgItems">
                          ${h}
                        </div>
                        <p class="order-content-p">${o.summary}</p>
                      </div>
                    </div>
                    `,$("#storeOrder").html(c),p.pagination({dataSource:u,locator:"items",totalNumber:g,pageSize:l,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(f,y){const a=JSON.parse(JSON.stringify(f));let n="",r="",i="",d=a.slice(0,5),m=a.slice(5),v=[...m];n+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(d,function(w,e){n+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${e.品項}${e.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${e.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${e.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${e.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${e.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${e.商品描述}</p>
                                </button>
                              </li>`}),n+=`
                            </ul>
                          </div>`,r+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(v,function(w,e){r+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${e.品項}${e.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${e.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${e.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${e.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${e.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${e.商品描述}</p>
                                </button>
                              </li>`}),r+=`
                            </ul>
                          </div>`,i+=n,l==5&&(r=""),i+=r,$(".customMenu").html(i),d=[],m=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(s){console.error("error")}})})()});
