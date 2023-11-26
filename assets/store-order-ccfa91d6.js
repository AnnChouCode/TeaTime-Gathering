import"./main-00005955.js";import{s as I}from"./showStars-385adb56.js";const D="https://teatimeapi-test.onrender.com",b=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async o=>{try{return await(await fetch(`${D}/restaurants`)).json()}catch(e){return e}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(o,e)=>{if(!e.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${e.query}"</span>`,o.prepend(n)}},noResults:!0},events:{input:{selection:o=>{const e=o.detail.selection.value;b.input.value=e.storeName,console.log(e.storeName),window.location.href=`./store-order.html?UID=${e.UID}`},keydown:o=>{o.keyCode===13&&(b.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),h=document.querySelector(".needs-validation"),E=document.querySelector(".inputLoginAccount"),N=document.querySelector(".inputLoginPassword"),U=document.querySelectorAll(".btnLoginSubmit"),f=document.querySelectorAll(".btnLogin"),v=document.querySelectorAll(".btnUserLoggedIn"),a=document.querySelectorAll(".btnLogOut");U.forEach(o=>{o.addEventListener("click",()=>{const e=E.value,n=N.value;if(h.checkValidity()||h.classList.add("was-validated"),e==="ling-huang@fat-together.com"&&n==="ling-huang")a.forEach(s=>{s.classList.remove("d-none")}),v.forEach(s=>{s.classList.remove("d-none")}),f.forEach(s=>{s.classList.add("d-none")}),$("#accountModal").modal("hide");else{const s=document.querySelector(".invalid-feedback");s.style.display="block"}})});a.forEach(o=>{o.addEventListener("click",()=>{a.forEach(e=>{e.classList.add("d-none")}),v.forEach(e=>{e.classList.add("d-none")}),f.forEach(e=>{e.classList.remove("d-none")})})});$(function(){(function(){let o=$("#paginationPagesMenu"),e="";localStorage.getItem("UID")?e=localStorage.getItem("UID"):e="B001",console.log(e),console.log(e);let n=window.innerWidth<768;$.ajax({url:`https://teatimeapi-test.onrender.com/restaurants?UID=${e}`,success:function(s){console.log(s);let y=s.length,w=s[0].products,r=s[0],d=n?5:10,u="",L=I(r.stars);u+=`
                    <div class="order-bg" style=" background: url(${r.storeBannerPhoto}) center top /cover;"></div>
                    <div class="order-content container ps-12 ps-md-42 d-sm-flex align-items-end">
                      <img src="${r.storeLogo}" alt="logo-cha source"
                        class="order-icon border border-2 border-line border-radius-24 me-sm-37 mb-20 mb-sm-0 ">
                      <div class="order-textContent">
                        <h2 class="fs-md-40 fs-24 fw-bold lh-sm">${r.storeName}</h2>
                        <div class="imgItems">
                          ${L}
                        </div>
                        <p class="order-content-p">${r.summary}</p>
                      </div>
                    </div>
                    `,$("#storeOrder").html(u),o.pagination({dataSource:w,locator:"items",totalNumber:y,pageSize:d,showPageNumbers:!0,showPrevious:!0,showNext:!0,callback:function(S,j){const m=JSON.parse(JSON.stringify(S));let c="",l="",i="",p=m.slice(0,5),g=m.slice(5),x=[...g];c+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(p,function(k,t){c+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${t.品項}${t.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${t.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${t.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${t.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${t.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${t.商品描述}</p>
                                </button>
                              </li>`}),c+=`
                            </ul>
                          </div>`,l+=`
                          <div class="swiper-slide border border-1 border-brand-03 p-12 p-sm-40">
                          <ul id="storeOrderMenuID">
                        `,$.each(x,function(k,t){l+=`
                              <li class=" py-16 py-sm-24 border-bottom border-1 ">
                                <button type="button" class="menu-button border-0 bg-white text-start w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                  <div class="text-top d-flex justify-content-between align-items-center mb-8 mb-sm-16">
                                    <h3 class="store-order-h3">${t.品項}${t.UID}</h3>
                                    <div class="cold-hot d-flex justify-content-center align-items-center ${t.冷?"":"hidden-block"}">
                                      <div class="cold d-flex justify-content-center align-items-center ">
                                        <img class="me-4" src="/assets/images/icon/cold.png" alt="cold.png">
                                        <span class="me-8">${t.價格}</span>
                                      </div>
                                      <div class="hot d-flex justify-content-center align-items-center ${t.熱?"":"hidden-block"}">
                                        <img class="me-4" src="/assets/images/icon/hot.png" alt="hot.png">
                                        <span class="">${t.價格}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="text-top-p">${t.商品描述}</p>
                                </button>
                              </li>`}),l+=`
                            </ul>
                          </div>`,i+=c,d==5&&(l=""),i+=l,$(".customMenu").html(i),p=[],g=[],new Swiper(".mySwiper",{breakpoints:{1:{slidesPerView:1,spaceBetween:10,centeredSlides:!1},576:{slidesPerView:2,spaceBetween:24,centeredSlides:!1}}})}})},error:function(s){console.error("error")}})})()});
