import{b as x}from"./main-e0cad254.js";import{c as w,i as D}from"./notification-de19b203.js";import{a as g}from"./enc-utf8-11b5c098.js";import{f as S}from"./index-a4e39586.js";import{i as y}from"./isPastEvent-33573b9d.js";import{s as c}from"./showDateTime-51bda516.js";import{c as I}from"./calcGroupProgress-88a8cbd6.js";const v="https://teatimeapi-test.onrender.com",b=localStorage.getItem("token"),f=w(b);let u="";const U=moment().format("YYYY/MM/DD");let p=[];const r={};function L(){const e=g.get(`${v}/groupings?_expand=restaurant&_expand=order`),s=g.get(`${v}/votings?_expand=restaurant`);Promise.all([e,s]).then(function(t){p=p.concat(t[0].data),p=p.concat(t[1].data),M()}).then(t=>{Y(),T(),q()}).catch(function(t){console.error(t.message)})}L();function M(){p.forEach(e=>{r[e.UID]||(r[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurant.storeName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.UID.startsWith("V")?0:e.order.orderDetail.length}),e.UID.startsWith("V")&&(r[e.UID].restaurantList.push(e.restaurantName),delete r[e.UID].currentGroupCondition,delete r[e.UID].minGroupSize)})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".btnCreateVoting");D(b)?(e.setAttribute("href","#modal-CreateVoting"),e.setAttribute("data-bs-toggle","modal")):(e.setAttribute("data-bs-toggle","popover"),e.setAttribute("data-bs-content","請先登入帳號"),new x.Popover(e))});function Y(){const e=[];for(const s in r)if(r.hasOwnProperty(s)){const t=r[s];e.push({id:t.UID,name:t.restaurantList.join("、"),date:t.deadlineDateTime,type:"event",color:t.UID[0]==="V"?"#F0BD68":"#FD909F"})}C(e)}function C(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const s=$("#calendar").evoCalendar("getActiveDate"),t=moment(s,"MM/DD/YYYY").format("YYYY/MM/DD");T(t)});const P=document.querySelector(".calendarEvent");function T(e=U){let s="";const a=Object.values(r).filter(n=>n.deadlineDateTime.split(" ")[0]===e);a.length?a.forEach(n=>{const i=n.currentGroupCondition,o=n.minGroupSize;let l=0;l=I(i,o),s+=`<li ${n.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${n.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${n.UID}`}>
                    ${n.UID.startsWith("V")?"":`<a href="store-order.html?UID=${n.UID}">`}
                <div
                  class="position-relative row mx-0 flex-column gy-12 gy-md-16 p-16 p-md-24 pt-56 pb-8 pb-md-16 pt-md-8 border border-brand-03 border-radius-16">
                  <!-- 月曆卡片 title -->
                  <div
                    class="position-absolute d-flex align-items-end top-0 start-0 px-16 px-md-24 w-100 w-sm-75 calendar-title-translateY">
                    <img class="me-12 me-lg-16 calendar-photo border border-2 border-brand-03 bg-white"
                      src=${n.restaurantPhoto} alt="store-logo">
                    <h3 class="fs-20 fs-md-24 fw-medium fw-md-bold lh-sm text-brand-03 doubleline-ellipsis">${n.restaurantList.join("、")}
                    </h3>
                  </div>
                  <!-- 卡片活動類別 -->
                  ${A(n.deadlineDateTime,n.UID)}
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${c(n.eventDateTime)[0]}</span>
                          <span>${c(n.eventDateTime)[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${c(n.deadlineDateTime)[0]}</span>
                          <span>${c(n.deadlineDateTime)[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${n.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
                        <div class="bar bg-brand-02" style="--value: ${l}">
                            <div class="text-white">${l>100?100:l}%</div>
                        </div>
                    </div></li>`}
                    <li class="col col-xl-5">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">付款人</span>
                          <span class="me-8">${n.invitees?n.invitees:"無"}</span>
                        </li>
                        <li>
                          <span class="me-16">發起人</span>
                          <span class="me-8">${n.initiator}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                ${n.UID.startsWith("V")?"":"</a>"}
              </li>`}):s+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',P.innerHTML=s}function A(e,s){let t;return y(e)?t=`<div class="align-self-end py-4 py-md-8 order-last order-md-first rounded-pill text-center btn-disable" style="width:110px;">${s.startsWith("V")?"投票":"開團"}已結束</div>`:t=`<div class="align-self-end py-4 py-md-8 order-last order-md-first ${s.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center" style="width:80px">${s.startsWith("V")?"投票中":"開團中"}</div>`,t}function q(){u=location.href.split("=")[1],u&&(u.startsWith("V")&&r[u]?$("#modal-VotingModal").modal("show"):u&&$("#modal-eventExpired").modal("show"))}const G=document.getElementById("modal-eventExpired");G.addEventListener("hidden.bs.modal",function(e){window.location.href="./calendar.html"});const d=document.getElementById("modal-VotingModal");function V(e){let s=[];g.get(`${v}/votings?UID=${e}&_expand=restaurant`).then(function(t){s=t.data,H(s)}).catch(function(t){console.error(t.message)})}d.addEventListener("show.bs.modal",function(e){const s=e.relatedTarget,t=s?s.getAttribute("data-bs-votingUID"):u;W(t),V(t)});function W(e){const s=d.querySelector(".modal-title");s.textContent=r[e].restaurantList.join("、");const t=d.querySelector(".deadlineDateTime"),a=d.querySelector(".eventDateTime"),n=d.querySelector(".initiator"),i=d.querySelector(".invitees"),o=r[e];t.innerHTML=`<span class="me-16">截止日期</span>
                        <span class="me-8 ">${c(o.deadlineDateTime)[0]}</span>
                        <span>${c(o.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
                          <span class="me-8">${c(o.eventDateTime)[0]}</span>
                          <span>${c(o.eventDateTime)[1]}</span>`,n.textContent=o.initiator,i.textContent=o.invitees===""?"無":o.invitees}function H(e){const s=d.querySelector(".votingCard"),t=y(e[0].deadlineDateTime);let a="";e.forEach(n=>{const i=n.currentVoters.includes(f),o=n.currentVoters.length,l=n.restaurant.minGroupSize;let m=0;m=I(o,l),a+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${n.restaurant.storeCover}">
                        <div class="flex-grow-1 d-flex flex-column">
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${n.restaurantName}</h4>
                          <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${n.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num=${n.id}>
                                <div class="bar bg-brand-02" style="--value: ${m}">
                                  <div class="text-white">${m>100?100:m}%</div>
                                </div>
                              </div>
                            </div>                                                    
                              ${_(n.id,t,i)}
                          </div>
                      </li>`}),s.innerHTML=a,k()}function _(e,s,t){return s?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':D(b)?`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${t?"btn-active-brand-02":""}"
                              type="button" data-num=${e}>${t?"已投票":"投票"}</button>`:`<button type="button"
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                              data-bs-container="body" data-bs-toggle="popover"  data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function k(){if(!D(b)){[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(t=>{new x.Popover(t)});return}d.querySelectorAll(".btnVoteThis").forEach(s=>{s.addEventListener("click",function(){this.disabled=!0,setTimeout(()=>{this.disabled=!1},3e3),s.classList.contains("btn-active-brand-02")?h(s.dataset.num,"deleteVote"):h(s.dataset.num,"addVote")})})}async function h(e,s){try{const t=document.querySelector(`.ts-progress[data-num="${e}"]`);t.classList.add("is-processing");const a=p.filter(n=>n.UID.startsWith("V")&&n.id==e)[0].currentVoters;if(s==="addVote")a.push(`${f}`);else{const n=a.indexOf(`${f}`);a.splice(n,1)}g.patch(`${v}/votings/${e}`,{currentVoters:a}).then(function(n){V(n.data.UID),t.classList.remove("is-processing")}).catch(function(n){console.error(n.message)})}catch(t){throw console.log("錯誤:",t),t}}const E=document.getElementById("modal-CreateVoting");E.addEventListener("show.bs.modal",function(e){const s=document.getElementById("votingInitiator");g.get(`${v}/users?UID=${f}`).then(function(t){s.textContent=t.data[0].userName}).catch(function(t){console.error(t.message)})});E.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),s=document.getElementById("deadlineDateTime"),t=document.getElementById("votingInvitees"),a=e.value.trim(),n=s.value.trim();let i="",o="";if(a&&(i=moment(a,"YYYY/MM/DD HH:mm")),n&&(o=moment(n,"YYYY/MM/DD HH:mm")),i&&o){const l=i.diff(o,"hours"),m=document.querySelector(".deadlineDateTimeAlert");l<24?m.classList.remove("d-none"):m.classList.add("d-none")}sessionStorage.setItem("deadlineDateTime",n),sessionStorage.setItem("eventDateTime",a),sessionStorage.setItem("votingInvitees",t.value)});const B=document.querySelector(".btnLinkToCreateVoting");B.addEventListener("click",function(){window.location.href="./createVoting.html"});const z={enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:15,allowInput:!0,minDate:moment().format("YYYY/MM/DD")};S(".dateSelector",z);
