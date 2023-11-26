import"./main-00005955.js";import{a as p}from"./axios-3a76d256.js";const L="https://teatimeapi-test.onrender.com",b=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async e=>{try{return await(await fetch(`${L}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(n)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;b.input.value=t.storeName,console.log(t.storeName),window.location.href=`./store-order.html?UID=${t.UID}`},keydown:e=>{e.keyCode===13&&(b.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),D=document.querySelector(".needs-validation"),S=document.querySelector(".inputLoginAccount"),E=document.querySelector(".inputLoginPassword"),w=document.querySelectorAll(".btnLoginSubmit"),y=document.querySelectorAll(".btnLogin"),I=document.querySelectorAll(".btnUserLoggedIn"),v=document.querySelectorAll(".btnLogOut");w.forEach(e=>{e.addEventListener("click",()=>{const t=S.value,n=E.value;if(D.checkValidity()||D.classList.add("was-validated"),t==="ling-huang@fat-together.com"&&n==="ling-huang")v.forEach(o=>{o.classList.remove("d-none")}),I.forEach(o=>{o.classList.remove("d-none")}),y.forEach(o=>{o.classList.add("d-none")}),$("#accountModal").modal("hide");else{const o=document.querySelector(".invalid-feedback");o.style.display="block"}})});v.forEach(e=>{e.addEventListener("click",()=>{v.forEach(t=>{t.classList.add("d-none")}),I.forEach(t=>{t.classList.add("d-none")}),y.forEach(t=>{t.classList.remove("d-none")})})});function T(e){const t=moment(e,"YYYY/MM/DD HH:mm");return moment().isAfter(t)}const g="https://teatimeapi-test.onrender.com",f="U004",U=moment().format("YYYY/MM/DD");let d=[];const r={};function C(){const e=p.get(`${g}/groupings?_expand=restaurant`),t=p.get(`${g}/votings?_expand=restaurant`);Promise.all([e,t]).then(function(n){d=d.concat(n[0].data),d=d.concat(n[1].data),M()}).catch(function(n){console.error(n)})}C();function M(){d.forEach(e=>{r[e.UID]||(r[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(r[e.UID].restaurantList.push(e.restaurantName),delete r[e.UID].currentGroupCondition,delete r[e.UID].minGroupSize)}),Y(),x()}function Y(){const e=[];for(const t in r)if(r.hasOwnProperty(t)){const n=r[t];e.push({id:n.UID,name:n.restaurantList.join("、"),date:n.deadlineDateTime,type:"event",color:n.UID[0]==="V"?"#F0BD68":"#FD909F"})}q(e)}function q(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const t=$("#calendar").evoCalendar("getActiveDate"),n=moment(t,"MM/DD/YYYY").format("YYYY/MM/DD");x(n)});const A=document.querySelector(".calendarEvent");function x(e=U){let t="";const o=Object.values(r).filter(s=>s.deadlineDateTime.split(" ")[0]===e);o.length?o.forEach(s=>{t+=`<li ${s.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${s.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${s.UID}`}>
                    ${s.UID.startsWith("V")?"":`<a href="store-order.html?UID=${s.UID}">`}
                <div
                  class="position-relative row mx-0 flex-column gy-12 gy-md-16 p-16 p-md-24 pt-56 pb-8 pb-md-16 pt-md-8 border border-brand-03 border-radius-16">
                  <!-- 月曆卡片 title -->
                  <div
                    class="position-absolute d-flex align-items-end top-0 start-0 px-16 px-md-24 w-100 w-sm-75 calendar-title-translateY">
                    <img class="me-12 me-lg-16 calendar-photo border border-2 border-brand-03 bg-white"
                      src=${s.restaurantPhoto} alt="store-logo">
                    <h3 class="fs-20 fs-md-24 fw-medium fw-md-bold lh-sm text-brand-03 doubleline-ellipsis">${s.restaurantList.join("、")}
                    </h3>
                  </div>
                  <!-- 卡片活動類別 -->
                  ${k(s.deadlineDateTime,s.UID)}
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${c(s.eventDateTime)[0]}</span>
                          <span>${c(s.eventDateTime)[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${c(s.deadlineDateTime)[0]}</span>
                          <span>${c(s.deadlineDateTime)[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${s.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
                        <div class="bar bg-brand-02" style="--value: ${u(s.minGroupSize,s.currentGroupCondition)}">
                            <div class="text-white">${u(s.minGroupSize,s.currentGroupCondition)>100?100:u(s.minGroupSize,s.currentGroupCondition)}%</div>
                        </div>
                    </div></li>`}
                    <li class="col col-xl-5">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">付款人</span>
                          <span class="me-8">${s.invitees?s.invitees:"無"}</span>
                        </li>
                        <li>
                          <span class="me-16">發起人</span>
                          <span class="me-8">${s.initiator}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                ${s.UID.startsWith("V")?"":"</a>"}
              </li>`}):t+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',A.innerHTML=t}function k(e,t){let n;return T(e)?n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first rounded-pill text-center btn-disable" style="width:110px;">${t.startsWith("V")?"投票":"開團"}已結束</div>`:n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first ${t.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center" style="width:80px">${t.startsWith("V")?"投票中":"開團中"}</div>`,n}function u(e,t){return Math.floor(e/t*100)}const l=document.getElementById("modal-VotingModal");function V(e){let t=[];p.get(`${g}/votings?UID=${e}&_expand=restaurant`).then(function(n){t=n.data,H(t)}).catch(function(n){console.error(n)})}l.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");G(n),V(n)});function G(e){const t=l.querySelector(".modal-title");t.textContent=r[e].restaurantList.join("、");const n=l.querySelector(".deadlineDateTime"),o=l.querySelector(".eventDateTime"),s=l.querySelector(".initiator"),i=l.querySelector(".invitees"),a=r[e];n.innerHTML=`<span class="me-16">截止日期</span>
                        <span class="me-8 ">${c(a.deadlineDateTime)[0]}</span>
                        <span>${c(a.deadlineDateTime)[1]}</span>`,o.innerHTML=`<span class="me-16">享用時間</span>
                          <span class="me-8">${c(a.eventDateTime)[0]}</span>
                          <span>${c(a.eventDateTime)[1]}</span>`,s.textContent=a.initiator,i.textContent=a.invitees===""?"無":eventinvitees}function c(e){const t=e.substring(5,10),n=e.split(" ")[1];return[t,n]}function H(e){const t=l.querySelector(".votingCard"),n=T(e[0].deadlineDateTime);let o="";e.forEach(s=>{const i=s.currentVoters.includes(f),a=s.currentVoters.length,m=s.restaurant.minGroupSize;o+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${s.restaurant.storeCover}">
                        <div class="flex-grow-1 d-flex flex-column">
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${s.restaurantName}</h4>
                          <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${s.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num=${s.id}>
                                <div class="bar bg-brand-02" style="--value: ${u(a,m)}">
                                  <div class="text-white">${u(a,m)>100?100:u(a,m)}%</div>
                                </div>
                              </div>
                            </div>                                                    
                              ${P(s.id,n,i)}
                          </div>
                      </li>`}),t.innerHTML=o,W()}function P(e,t,n){return t?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${n?"btn-active-brand-02":""}"
                              type="button" data-num=${e}>${n?"已投票":"投票"}</button>`}function W(){l.querySelectorAll(".btnVoteThis").forEach(t=>{t.addEventListener("click",function(){t.classList.contains("btn-active-brand-02")?h(t.dataset.num,"deleteVote"):h(t.dataset.num,"addVote")})})}async function h(e,t){try{const n=document.querySelector(`.ts-progress[data-num="${e}"]`);n.classList.add("is-processing");const o=d.filter(s=>s.UID.startsWith("V")&&s.id==e)[0].currentVoters;if(t==="addVote")o.push(`${f}`);else{const s=o.indexOf(`${f}`);o.splice(s,1)}p.patch(`${g}/votings/${e}`,{currentVoters:o}).then(function(s){V(s.data.UID),n.classList.remove("is-processing")}).catch(function(s){console.error(s.message)})}catch(n){throw console.log("錯誤:",n),n}}const _=document.getElementById("modal-CreateVoting");_.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),t=document.getElementById("deadlineDateTime"),n=document.getElementById("votingInvitees"),o=e.value.trim(),s=t.value.trim();let i="",a="";o&&(i=moment(e.value,"YYYY/MM/DD HH:mm")),s&&(a=moment(t.value,"YYYY/MM/DD HH:mm")),i&&a&&(i.diff(a,"hours")<24?document.querySelector(".deadlineDateTimeAlert").classList.remove("d-none"):document.querySelector(".deadlineDateTimeAlert").classList.add("d-none")),sessionStorage.setItem("deadlineDateTime",s),sessionStorage.setItem("eventDateTime",o),sessionStorage.setItem("votingInvitees",n.value)});const z=document.querySelector(".btnLinkToCreateVoting");z.addEventListener("click",function(){window.location.href="./createVoting.html"});
