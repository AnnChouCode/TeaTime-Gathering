import"./main-827c712b.js";const I="https://teatimeapi-test.onrender.com",b=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async t=>{try{return await(await fetch(`${I}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(t,e)=>{if(!e.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${e.query}"</span>`,t.prepend(n)}},noResults:!0},events:{input:{selection:t=>{const e=t.detail.selection.value;b.input.value=e.storeName,console.log(e.storeName),window.location.href=`./store-order.html?UID=${e.UID}`},keydown:t=>{t.keyCode===13&&(b.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),h=document.querySelector(".needs-validation"),D=document.querySelector(".inputLoginAccount"),E=document.querySelector(".inputLoginPassword"),N=document.querySelectorAll(".btnLoginSubmit"),f=document.querySelectorAll(".btnLogin"),v=document.querySelectorAll(".btnUserLoggedIn"),a=document.querySelectorAll(".btnLogOut");N.forEach(t=>{t.addEventListener("click",()=>{const e=D.value,n=E.value;if(h.checkValidity()||h.classList.add("was-validated"),e==="ling-huang@fat-together.com"&&n==="ling-huang")a.forEach(o=>{o.classList.remove("d-none")}),v.forEach(o=>{o.classList.remove("d-none")}),f.forEach(o=>{o.classList.add("d-none")}),$("#accountModal").modal("hide");else{const o=document.querySelector(".invalid-feedback");o.style.display="block"}})});a.forEach(t=>{t.addEventListener("click",()=>{a.forEach(e=>{e.classList.add("d-none")}),v.forEach(e=>{e.classList.add("d-none")}),f.forEach(e=>{e.classList.remove("d-none")})})});function U(t){const n={isGoodStar:`<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                      width="16"></iconify-icon>`,notGoodStar:`<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                      width="16"></iconify-icon>`};return n.isGoodStar.repeat(t)+n.notGoodStar.repeat(5-t)}$(function(){(function(){let t=$("#paginationPagesMenu"),e="";localStorage.getItem("UID")?e=localStorage.getItem("UID"):e="B001",console.log(e),console.log(e);let n=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${e}`,success:function(o){console.log(o);let y=o.length,w=o[0].products,r=o[0],d=n?5:10,u="",S=U(r.stars);u+=`
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
                    `,$("#storeOrder").html(u),t.pagination({dataSource:w,locator:"items",totalNumber:y,pageSize:d,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(L,j){const m=JSON.parse(JSON.stringify(L));let i="",c="",l="",p=m.slice(0,5),g=m.slice(5),x=[...g];i+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(p,function(k,s){i+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${s.品項}${s.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${s.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${s.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${s.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${s.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${s.商品描述}</p>
                                </button>
                              </li>`}),i+=`
                            </ul>
                          </div>`,c+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(x,function(k,s){c+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${s.品項}${s.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${s.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${s.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${s.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${s.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${s.商品描述}</p>
                                </button>
                              </li>`}),c+=`
                            </ul>
                          </div>`,l+=i,d==5&&(c=""),l+=c,$(".customMenu").html(l),p=[],g=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(o){console.error("error")}})})()});
