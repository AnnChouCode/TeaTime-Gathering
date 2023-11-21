import"./main-827c712b.js";const A="https://teatimeapi-test.onrender.com",b=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async t=>{try{return await(await fetch(`${A}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(t,e)=>{if(!e.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${e.query}"</span>`,t.prepend(n)}},noResults:!0},events:{input:{selection:t=>{const e=t.detail.selection.value;b.input.value=e.storeName,console.log(e.storeName),window.location.href=`./store-order.html?UID=${e.UID}`},keydown:t=>{t.keyCode===13&&(b.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),h=document.querySelector(".needs-validation"),C=document.querySelector(".inputLoginAccount"),E=document.querySelector(".inputLoginPassword"),I=document.querySelectorAll(".btnLoginSubmit"),f=document.querySelectorAll(".btnLogin"),v=document.querySelectorAll(".btnUserLoggedIn"),l=document.querySelectorAll(".btnLogOut");I.forEach(t=>{t.addEventListener("click",()=>{const e=C.value,n=E.value;if(h.checkValidity()||h.classList.add("was-validated"),e==="ling-huang@fat-together.com"&&n==="ling-huang")l.forEach(s=>{s.classList.remove("d-none")}),v.forEach(s=>{s.classList.remove("d-none")}),f.forEach(s=>{s.classList.add("d-none")}),$("#accountModal").modal("hide");else{const s=document.querySelector(".invalid-feedback");s.style.display="block"}})});l.forEach(t=>{t.addEventListener("click",()=>{l.forEach(e=>{e.classList.add("d-none")}),v.forEach(e=>{e.classList.add("d-none")}),f.forEach(e=>{e.classList.remove("d-none")})})});function N(t){const n={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                      width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                      width="16"></iconify-icon>`};return n.isGoodStar.repeat(t)+n.notGoodStar.repeat(5-t)}$(function(){(function(){let t=$("#paginationPagesMenu");const e=location.href.split("=")[1];console.log(e);let n=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${e}`,success:function(s){console.log(s);let y=s.length,w=s[0].products,r=s[0],d=n?5:10,u="",S=N(r.stars);u+=`
                    <div class="order-bg" style=" background: url(${r.storeBannerPhoto}) center top /cover;"></div>
                    <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                      <img src="${r.storeLogo}" alt="logo-cha source"
                        class="order-icon border border-2 border-line border-radius-24 me-sm-37 mb-20 mb-sm-0 ">
                      <div class="order-textContent">
                        <h2 class="fs-md-40 fs-24 fw-bold lh-sm">${r.storeName}</h2>
                        <div class="imgItems">
                          ${S}
                        </div>
                        <p class="order-content-p">${r.summary}</p>
                      </div>
                    </div>
                    `,$("#storeOrder").html(u),t.pagination({dataSource:w,locator:"items",totalNumber:y,pageSize:d,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(L,T){const m=JSON.parse(JSON.stringify(L));let c="",i="",a="",p=m.slice(0,5),g=m.slice(5),x=[...g];c+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(p,function(k,o){c+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${o.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${o.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${o.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${o.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${o.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${o.商品描述}</p>
                                </button>
                              </li>`}),c+=`
                            </ul>
                          </div>`,i+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(x,function(k,o){i+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${o.品項}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${o.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/cold.png?raw=true" alt="cold.png">
                                        <span class="me-8">${o.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${o.熱?"":"hidden-block"}">
                                        <img class="me-4" src="https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/icon/hot.png?raw=true" alt="hot.png">
                                        <span class="">${o.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${o.商品描述}</p>
                                </button>
                              </li>`}),i+=`
                            </ul>
                          </div>`,a+=c,d==5&&(i=""),a+=i,$(".customMenu").html(a),p=[],g=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(s){console.error("error")}})})()});
