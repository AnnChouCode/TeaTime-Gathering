import"./main-18dd99f5.js";/* empty css                      */import{a as o}from"./axios-3a76d256.js";const l="https://teatimeapi-test.onrender.com";localStorage.getItem("token");moment().format("YYYY/MM/DD");let r=[];const n={};(function(){const t=o.get(`${l}/votings?_expand=restaurant`);Promise.all([t]).then(function(s){r=s[0].data,i()}).catch(function(s){console.error(s)})})();function i(){r.forEach(e=>{n[e.UID]||(n[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover}),e.UID.startsWith("V")&&n[e.UID].restaurantList.push(e.restaurantName)}),console.log(n),c()}let a="";function c(){for(const e in n)if(n.hasOwnProperty(e)){const t=n[e];a+=`
            <li class="p-24 border-bottom border-brand-03">
                <div class="d-flex flex-column flex-lg-row">
                    <aside class="me-lg-40 d-flex justify-content-between align-items-center mb-16 ">
                        <img src="${t.restaurantPhoto}" alt="" width="96">
                        <span class="ms-auto d-block d-lg-none">
                            <a href=""
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
                        <a href=""
                            class="text-brand-01 border border-brand-01 rounded-1  px-10 py-4">檢視投票</a>
                    </span>
                </div>
            </li>
            `}takePartVoting.innerHTML=a}memberbtn.forEach(e=>{console.log(e),e.addEventListener("click",()=>{memberbtn.forEach(t=>{t.classList.remove("memberbtn-actived")}),e.classList.add("memberbtn-actived"),memberbtn[0]===e?(i(),initiatePoll.innerHTML=""):memberbtn[1]===e&&(takePartVoting.innerHTML="",initiatePoll.innerHTML=initiatePollHTML)})});
