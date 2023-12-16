import"./main-2018fec3.js";import{a as c}from"./enc-utf8-2021e559.js";const m="https://teatimeapi-test.onrender.com";localStorage.getItem("token");let l=document.querySelector(".takePartVoting"),r=document.querySelector(".initiatePoll"),n=document.querySelectorAll(".memberbtn");moment().format("YYYY/MM/DD");let i=[],a={};(function(){const s=c.get(`${m}/votings?_expand=restaurant`);Promise.all([s]).then(function(t){i=t[0].data,o()})})();function o(){a={},i.forEach(e=>{a[e.UID]||(a[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&a[e.UID].restaurantList.push(e.restaurantName)}),b(),d()}function b(){let e="";for(const s in a)if(a.hasOwnProperty(s)){const t=a[s];e+=`
                <li class="p-24 border-bottom border-brand-03">
                    <div class="d-flex flex-column flex-lg-row">
                        <aside class="me-lg-40 d-flex justify-content-between align-items-center mb-16 ">
                            <img src="${t.restaurantPhoto}" alt="" width="96">
                            <span class="ms-auto d-block d-lg-none">
                                <a href="calendar.html?UID=${t.UID}"
                                    class="text-brand-01 border border-brand-01 rounded-1  px-10 py-4">檢視投票</a>
                            </span>
                        </aside>

                        <main>
                            <h2 class="fs-24 fw-bold text-brand-03">${t.restaurantList.join(" 、 ")}</h2>
                            <ul class="mt-12 fs-20">
                                <li>
                                    <ul class="text-gray-02">                                    
                                        <li class="d-flex mb-8">
                                            <p class="text-brand-02 fw-bolder ">截止日期<span class=" ms-16">${t.deadlineDateTime}</span></p>
                                        </li>    
                                        <li class="d-flex mb-8">
                                            <p>享用日期<span class="ms-16">${t.eventDateTime}</span></p>
                                        </li>                                
                                    </ul>
                                </li>
                            </ul>
                        </main>
                        <span class="ms-auto d-none d-lg-block">
                            <a href="calendar.html?UID=${t.UID}"
                                class="text-brand-01 border border-brand-01 rounded-1  px-10 py-4">檢視投票</a>
                        </span>
                    </div>
                </li>
            `}l.innerHTML=e}function d(){let e="";for(const s in a)if(a.hasOwnProperty(s)){const t=a[s];t.initiator=="黃莉琳"&&(e+=`
                        <li class="p-24 border-bottom border-brand-03">
                            <div class="d-flex flex-column flex-lg-row  ">
                                <aside class="me-40 d-flex justify-content-between align-items-center ">
                                    <img src="${t.restaurantPhoto}" alt="" width="96">
                                    <span class="ms-auto d-block d-lg-none">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#voteModal"
                                            class="text-brand-01 border border-brand-01 rounded-1  px-10 py-4">編輯投票時間</a>
                                    </span>
                                </aside>

                                <main>
                                    <h2 class="fs-24 fw-bold text-brand-03">${t.restaurantList.join(" 、 ")}</h2>
                                    <ul class="mt-12 fs-20">
                                        <li>
                                            <ul class="text-gray-02">                                    
                                                <li class="d-flex mb-8">
                                                    <p class="text-brand-02 fw-bolder ">截止日期<span class=" ms-16">${t.deadlineDateTime}</span></p>
                                                </li>    
                                                <li class="d-flex mb-8">
                                                    <p>享用日期<span class="ms-16">${t.eventDateTime}</span></p>
                                                </li>                                
                                            </ul>
                                        </li>
                                    </ul>
                                </main>
                                <span class="ms-auto d-none d-lg-block">
                                    <a href="" data-bs-toggle="modal" data-bs-target="#voteModal"
                                        class="text-brand-01 border border-brand-01 rounded-1  px-10 py-4">編輯投票時間</a>
                                </span>
                            </div>
                        </li>
                    `)}r.innerHTML=e}n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(s=>{s.classList.remove("memberbtn-actived")}),e.classList.add("memberbtn-actived"),n[0]===e?(o(),r.innerHTML=""):n[1]===e&&(l.innerHTML="",d())})});let u=document.querySelectorAll(".offcanvas-body li a");u[2].classList.add("memberSystem-active");let f={enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:15,allowInput:!0,minDate:moment().format("YYYY/MM/DD")};flatpickr(".dateSelector",f);
