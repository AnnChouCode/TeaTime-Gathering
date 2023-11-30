import"./main-683b5b67.js";import"./nav-6adc6ebb.js";import{s as x}from"./showStars-385adb56.js";$(function(){(function(){let m=$("#paginationPagesMenu");const p=location.href.split("=")[1];let b=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${p}`,success:function(o){let u=o.length,g=o[0].products,t=o[0],n=b?5:10,l="",h=x(t.stars);l+=`
                    <div class="order-bg" style=" background: url(${t.storeBannerPhoto}) center top /cover;"></div>
                    <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                      <img src="${t.storeLogo}" alt="logo-cha source"
                        class="order-icon border border-2 border-line border-radius-24 me-sm-37 mb-20 mb-sm-0 ">
                      <div class="order-textContent">
                        <h2 class="fs-md-40 fs-24 fw-bold lh-sm">${t.storeName}</h2>
                        <div class="imgItems">
                          ${h}
                        </div>
                        <p class="order-content-p">${t.summary}</p>
                      </div>
                    </div>
                    `,$("#storeOrder").html(l),m.pagination({dataSource:g,locator:"items",totalNumber:u,pageSize:n,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(f,y){const a=JSON.parse(JSON.stringify(f));let r="",s="",i="",c=a.slice(0,5),d=a.slice(5),v=[...d];r+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(c,function(w,e){r+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${e.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center">
                                      <div class="cold d-flex justify-content-center align-items-center ${e.冷?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${e.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${e.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${e.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${e.商品描述}</p>
                                </button>
                              </li>`}),r+=`
                            </ul>
                          </div>`,s+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(v,function(w,e){console.log(e.品項),console.log(e.熱),s+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${e.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center">
                                      <div class="cold d-flex justify-content-center align-items-center  ${e.冷?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${e.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${e.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${e.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${e.商品描述}</p>
                                </button>
                              </li>`}),s+=`
                            </ul>
                          </div>`,i+=r,n==5&&(s=""),i+=s,$(".customMenu").html(i),c=[],d=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(o){console.error("error")}})})()});
