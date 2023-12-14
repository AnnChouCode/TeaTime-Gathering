import{b as y}from"./main-96991ec2.js";import{c as w,i as D}from"./notification-39e0ad74.js";import{a as g}from"./enc-utf8-c5181946.js";import{f as S}from"./index-a4e39586.js";import{i as I}from"./isPastEvent-33573b9d.js";import{s as d}from"./showDateTime-51bda516.js";const v="https://teatimeapi-test.onrender.com",b=localStorage.getItem("token"),f=w(b);let p="";const U=moment().format("YYYY/MM/DD");let c=[];const r={};function L(){const e=g.get(`${v}/groupings?_expand=restaurant&_expand=order`),s=g.get(`${v}/votings?_expand=restaurant`);Promise.all([e,s]).then(function(n){c=c.concat(n[0].data),c=c.concat(n[1].data),M()}).then(n=>{C(),T(),P()}).catch(function(n){console.error(n.message)})}L();function M(){c.forEach(e=>{r[e.UID]||(r[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurant.storeName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.UID.startsWith("V")?0:e.order.orderDetail.length}),e.UID.startsWith("V")&&(r[e.UID].restaurantList.push(e.restaurantName),delete r[e.UID].currentGroupCondition,delete r[e.UID].minGroupSize)})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".btnCreateVoting");D(b)?(e.setAttribute("href","#modal-CreateVoting"),e.setAttribute("data-bs-toggle","modal")):(e.setAttribute("data-bs-toggle","popover"),e.setAttribute("data-bs-content","請先登入帳號"),new y.Popover(e))});function C(){const e=[];for(const s in r)if(r.hasOwnProperty(s)){const n=r[s];e.push({id:n.UID,name:n.restaurantList.join("、"),date:n.deadlineDateTime,type:"event",color:n.UID[0]==="V"?"#F0BD68":"#FD909F"})}Y(e)}function Y(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const s=$("#calendar").evoCalendar("getActiveDate"),n=moment(s,"MM/DD/YYYY").format("YYYY/MM/DD");T(n)});const A=document.querySelector(".calendarEvent");function T(e=U){let s="";const a=Object.values(r).filter(t=>t.deadlineDateTime.split(" ")[0]===e);a.length?a.forEach(t=>{s+=`<li ${t.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${t.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${t.UID}`}>
                    ${t.UID.startsWith("V")?"":`<a href="store-order.html?UID=${t.UID}">`}
                <div
                  class="position-relative row mx-0 flex-column gy-12 gy-md-16 p-16 p-md-24 pt-56 pb-8 pb-md-16 pt-md-8 border border-brand-03 border-radius-16">
                  <!-- 月曆卡片 title -->
                  <div
                    class="position-absolute d-flex align-items-end top-0 start-0 px-16 px-md-24 w-100 w-sm-75 calendar-title-translateY">
                    <img class="me-12 me-lg-16 calendar-photo border border-2 border-brand-03 bg-white"
                      src=${t.restaurantPhoto} alt="store-logo">
                    <h3 class="fs-20 fs-md-24 fw-medium fw-md-bold lh-sm text-brand-03 doubleline-ellipsis">${t.restaurantList.join("、")}
                    </h3>
                  </div>
                  <!-- 卡片活動類別 -->
                  ${G(t.deadlineDateTime,t.UID)}
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${d(t.eventDateTime)[0]}</span>
                          <span>${d(t.eventDateTime)[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${d(t.deadlineDateTime)[0]}</span>
                          <span>${d(t.deadlineDateTime)[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${t.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
                        <div class="bar bg-brand-02" style="--value: ${m(t.currentGroupCondition,t.minGroupSize)}">
                            <div class="text-white">${m(t.currentGroupCondition,t.minGroupSize)>100?100:m(t.currentGroupCondition,t.minGroupSize)}%</div>
                        </div>
                    </div></li>`}
                    <li class="col col-xl-5">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">付款人</span>
                          <span class="me-8">${t.invitees?t.invitees:"無"}</span>
                        </li>
                        <li>
                          <span class="me-16">發起人</span>
                          <span class="me-8">${t.initiator}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                ${t.UID.startsWith("V")?"":"</a>"}
              </li>`}):s+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',A.innerHTML=s}function G(e,s){let n;return I(e)?n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first rounded-pill text-center btn-disable" style="width:110px;">${s.startsWith("V")?"投票":"開團"}已結束</div>`:n=`<div class="align-self-end py-4 py-md-8 order-last order-md-first ${s.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center" style="width:80px">${s.startsWith("V")?"投票中":"開團中"}</div>`,n}function m(e,s){return Math.floor(e/s*100)}function P(){p=location.href.split("=")[1],p.startsWith("V")&&r[p]?$("#modal-VotingModal").modal("show"):p&&$("#modal-eventExpired").modal("show")}const q=document.getElementById("modal-eventExpired");q.addEventListener("hidden.bs.modal",function(e){window.location.href="./calendar.html"});const l=document.getElementById("modal-VotingModal");function V(e){let s=[];g.get(`${v}/votings?UID=${e}&_expand=restaurant`).then(function(n){s=n.data,H(s)}).catch(function(n){console.error(n.message)})}l.addEventListener("show.bs.modal",function(e){const s=e.relatedTarget,n=s?s.getAttribute("data-bs-votingUID"):p;W(n),V(n)});function W(e){const s=l.querySelector(".modal-title");s.textContent=r[e].restaurantList.join("、");const n=l.querySelector(".deadlineDateTime"),a=l.querySelector(".eventDateTime"),t=l.querySelector(".initiator"),i=l.querySelector(".invitees"),o=r[e];n.innerHTML=`<span class="me-16">截止日期</span>
                        <span class="me-8 ">${d(o.deadlineDateTime)[0]}</span>
                        <span>${d(o.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
                          <span class="me-8">${d(o.eventDateTime)[0]}</span>
                          <span>${d(o.eventDateTime)[1]}</span>`,t.textContent=o.initiator,i.textContent=o.invitees===""?"無":o.invitees}function H(e){const s=l.querySelector(".votingCard"),n=I(e[0].deadlineDateTime);let a="";e.forEach(t=>{const i=t.currentVoters.includes(f),o=t.currentVoters.length,u=t.restaurant.minGroupSize;a+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${t.restaurant.storeCover}">
                        <div class="flex-grow-1 d-flex flex-column">
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${t.restaurantName}</h4>
                          <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${t.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num=${t.id}>
                                <div class="bar bg-brand-02" style="--value: ${m(o,u)}">
                                  <div class="text-white">${m(o,u)>100?100:m(o,u)}%</div>
                                </div>
                              </div>
                            </div>                                                    
                              ${_(t.id,n,i)}
                          </div>
                      </li>`}),s.innerHTML=a,k()}function _(e,s,n){return s?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':D(b)?`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${n?"btn-active-brand-02":""}"
                              type="button" data-num=${e}>${n?"已投票":"投票"}</button>`:`<button type="button"
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                              data-bs-container="body" data-bs-toggle="popover"  data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function k(){if(!D(b)){[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(n=>{new y.Popover(n)});return}l.querySelectorAll(".btnVoteThis").forEach(s=>{s.addEventListener("click",function(){this.disabled=!0,setTimeout(()=>{this.disabled=!1},3e3),s.classList.contains("btn-active-brand-02")?x(s.dataset.num,"deleteVote"):x(s.dataset.num,"addVote")})})}async function x(e,s){try{const n=document.querySelector(`.ts-progress[data-num="${e}"]`);n.classList.add("is-processing");const a=c.filter(t=>t.UID.startsWith("V")&&t.id==e)[0].currentVoters;if(s==="addVote")a.push(`${f}`);else{const t=a.indexOf(`${f}`);a.splice(t,1)}g.patch(`${v}/votings/${e}`,{currentVoters:a}).then(function(t){V(t.data.UID),n.classList.remove("is-processing")}).catch(function(t){console.error(t.message)})}catch(n){throw console.log("錯誤:",n),n}}const E=document.getElementById("modal-CreateVoting");E.addEventListener("show.bs.modal",function(e){const s=document.getElementById("votingInitiator");g.get(`${v}/users?UID=${f}`).then(function(n){s.textContent=n.data[0].userName}).catch(function(n){console.error(n.message)})});E.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),s=document.getElementById("deadlineDateTime"),n=document.getElementById("votingInvitees"),a=e.value.trim(),t=s.value.trim();let i="",o="";if(a&&(i=moment(a,"YYYY/MM/DD HH:mm")),t&&(o=moment(t,"YYYY/MM/DD HH:mm")),i&&o){const u=i.diff(o,"hours"),h=document.querySelector(".deadlineDateTimeAlert");u<24?h.classList.remove("d-none"):h.classList.add("d-none")}sessionStorage.setItem("deadlineDateTime",t),sessionStorage.setItem("eventDateTime",a),sessionStorage.setItem("votingInvitees",n.value)});const z=document.querySelector(".btnLinkToCreateVoting");z.addEventListener("click",function(){window.location.href="./createVoting.html"});const B={enableTime:!0,dateFormat:"Y/m/d H:i",time_24hr:!0,minuteIncrement:15,allowInput:!0,minDate:moment().format("YYYY/MM/DD")};S(".dateSelector",B);
