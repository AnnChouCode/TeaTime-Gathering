import{b as T}from"./main-e0cad254.js";import{c as C,i as h}from"./notification-a4430703.js";import{a as g}from"./enc-utf8-11b5c098.js";import"./index-a4e39586.js";import{i as I,c as V}from"./calcGroupProgress-e070f845.js";import{s as m}from"./showDateTime-51bda516.js";import{i as Y}from"./initializeDateTimePicker-55c7f59f.js";const v="https://teatimeapi-test.onrender.com",b=localStorage.getItem("token"),f=C(b);let u="";const U=moment().format("YYYY/MM/DD");let p=[];const d={};async function P(){try{const e=g.get(`${v}/groupings?_expand=restaurant&_expand=order`),s=g.get(`${v}/votings?_expand=restaurant`),t=await Promise.all([e,s]);p=p.concat(t[0].data),p=p.concat(t[1].data),A(),q(),E(),_()}catch(e){console.error(e.message)}}P();function A(){p.forEach(e=>{const{UID:s,restaurantId:t,deadlineDateTime:a,eventDateTime:n,initiator:r,invitees:o,restaurant:l,order:i}=e,y=s.startsWith("V"),L=y?[]:[l.storeName],M=y?0:i.orderDetail.length;if(d[s]={UID:s,restaurantId:t,deadlineDateTime:a,eventDateTime:n,initiator:r,invitees:o,restaurantList:L,restaurantPhoto:l.storeCover,minGroupSize:l.minGroupSize,currentGroupCondition:M},e.UID.startsWith("V")){const D=d[e.UID];D.restaurantList.push(e.restaurantName),delete D.currentGroupCondition,delete D.minGroupSize}})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".btnCreateVoting");h(b)?(e.setAttribute("href","#modal-CreateVoting"),e.setAttribute("data-bs-toggle","modal")):(e.setAttribute("data-bs-toggle","popover"),e.setAttribute("data-bs-content","請先登入帳號"),new T.Popover(e))});function q(){const e=[];for(const s in d)if(d.hasOwnProperty(s)){const t=d[s];e.push({id:t.UID,name:t.restaurantList.join("、"),date:t.deadlineDateTime,type:"event",color:t.UID[0]==="V"?"#F0BD68":"#FD909F"})}G(e)}function G(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const s=$("#calendar").evoCalendar("getActiveDate"),t=moment(s,"MM/DD/YYYY").format("YYYY/MM/DD");E(t)});const k=document.querySelector(".calendarEvent");function E(e=U){let s="";const a=Object.values(d).filter(n=>n.deadlineDateTime.split(" ")[0]===e);a.length?a.forEach(n=>{const r=n.UID.startsWith("V"),o=n.currentGroupCondition,l=n.minGroupSize;let i=0;i=V(o,l),s+=`<li ${r?`class="cursor-pointer" data-bs-votingUID=${n.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${n.UID}`}>
                        ${r?"":`<a href="store-order.html?UID=${n.UID}">`}
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
                        ${H(n.deadlineDateTime,n.UID)}
                        <!-- 月曆卡片內容 -->
                        <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                          <li class="col col-xl-7">
                            <ul class="d-flex flex-column gap-4 gap-md-8">
                              <li>
                                <span class="me-16">享用日期</span>
                                <span class="me-8">${m(n.eventDateTime)[0]}</span>
                                <span>${m(n.eventDateTime)[1]}</span>
                              </li>
                              <li>
                                <span class="me-16">截止時間</span>
                                <span class="me-8">${m(n.deadlineDateTime)[0]}</span>
                                <span>${m(n.deadlineDateTime)[1]}</span>
                              </li>
                            </ul>
                          </li>
                          ${r?"":`<li class="d-flex align-items-center order-1 order-md-end">
                            <span class="me-16">成團目標</span>                      
                            <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
                              <div class="bar bg-brand-02" style="--value: ${i}">
                                  <div class="text-white">${i>100?100:i}%</div>
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
                    ${r?"":"</a>"}
                  </li>`}):s+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',k.innerHTML=s}function H(e,s){let t;const a=s.startsWith("V");return I(e)?t=`<div class="align-self-end py-4 py-md-8 order-last order-md-first rounded-pill text-center btn-disable" style="width:110px;">${a?"投票":"開團"}已結束</div>`:t=`<div class="align-self-end py-4 py-md-8 order-last order-md-first ${a?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center" style="width:80px">${a?"投票中":"開團中"}</div>`,t}function _(){u=location.href.split("=")[1],u&&(u.startsWith("V")&&d[u]?$("#modal-VotingModal").modal("show"):u&&$("#modal-eventExpired").modal("show"))}const z=document.getElementById("modal-eventExpired");z.addEventListener("hidden.bs.modal",function(e){window.location.href="./calendar.html"});const c=document.getElementById("modal-VotingModal");function w(e){let s=[];g.get(`${v}/votings?UID=${e}&_expand=restaurant`).then(function(t){s=t.data,N(s)}).catch(function(t){console.error(t.message)})}c.addEventListener("show.bs.modal",function(e){const s=e.relatedTarget,t=s?s.getAttribute("data-bs-votingUID"):u;B(t),w(t)});function B(e){const s=c.querySelector(".modal-title");s.textContent=d[e].restaurantList.join("、");const t=c.querySelector(".deadlineDateTime"),a=c.querySelector(".eventDateTime"),n=c.querySelector(".initiator"),r=c.querySelector(".invitees"),o=d[e];t.innerHTML=`<span class="me-16">截止日期</span>
                        <span class="me-8 ">${m(o.deadlineDateTime)[0]}</span>
                        <span>${m(o.deadlineDateTime)[1]}</span>`,a.innerHTML=`<span class="me-16">享用時間</span>
                          <span class="me-8">${m(o.eventDateTime)[0]}</span>
                          <span>${m(o.eventDateTime)[1]}</span>`,n.textContent=o.initiator,r.textContent=o.invitees===""?"無":o.invitees}function N(e){const s=c.querySelector(".votingCard"),t=I(e[0].deadlineDateTime);let a="";e.forEach(n=>{const r=n.currentVoters.includes(f),o=n.currentVoters.length,l=n.restaurant.minGroupSize;let i=0;i=V(o,l),a+=`<li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                    <img class="border-radius-32321616 votingcard-photo" src="${n.restaurant.storeCover}">
                    <div class="flex-grow-1 d-flex flex-column">
                      <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${n.restaurantName}</h4>
                      <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${n.restaurant.summary}</p>
                      <div class="d-flex justify-content-between flex-column flex-lg-row">
                        <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                          <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                          <div class="ts-progress is-tiny bg-gray-04 voting-progress" data-num=${n.id}>
                            <div class="bar bg-brand-02" style="--value: ${i}">
                              <div class="text-white">${i>100?100:i}%</div>
                            </div>
                          </div>
                        </div>                                                    
                          ${W(n.id,t,r)}
                      </div>
                  </li>`}),s.innerHTML=a,j()}function W(e,s,t){return s?'<button class="py-4 px-16 btn-disable border-0 rounded-pill btnVoteThis" disabled type="button">已結束</button>':h(b)?`<button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${t?"btn-active-brand-02":""}"
                              type="button" data-num=${e}>${t?"已投票":"投票"}</button>`:`<button type="button"
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02"
                              data-bs-container="body" data-bs-toggle="popover"  data-bs-placement="top" data-bs-content="請先登入帳號">投票</button>`}function j(){if(!h(b)){[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(t=>{new T.Popover(t)});return}c.querySelectorAll(".btnVoteThis").forEach(s=>{s.addEventListener("click",function(){this.disabled=!0,setTimeout(()=>{this.disabled=!1},3e3),s.classList.contains("btn-active-brand-02")?x(s.dataset.num,"deleteVote"):x(s.dataset.num,"addVote")})})}async function x(e,s){try{const t=document.querySelector(`.ts-progress[data-num="${e}"]`);t.classList.add("is-processing");const a=p.filter(n=>n.UID.startsWith("V")&&n.id==e)[0].currentVoters;if(s==="addVote")a.push(`${f}`);else{const n=a.indexOf(`${f}`);a.splice(n,1)}g.patch(`${v}/votings/${e}`,{currentVoters:a}).then(function(n){w(n.data.UID),t.classList.remove("is-processing")}).catch(function(n){console.error(n.message)})}catch(t){throw console.log("錯誤:",t),t}}const S=document.getElementById("modal-CreateVoting");S.addEventListener("show.bs.modal",function(e){const s=document.getElementById("votingInitiator");g.get(`${v}/users?UID=${f}`).then(function(t){s.textContent=t.data[0].userName}).catch(function(t){console.error(t.message)})});S.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),s=document.getElementById("deadlineDateTime"),t=document.getElementById("votingInvitees"),a=e.value.trim(),n=s.value.trim();let r="",o="";if(a&&(r=moment(a,"YYYY/MM/DD HH:mm")),n&&(o=moment(n,"YYYY/MM/DD HH:mm")),r&&o){const l=r.diff(o,"hours"),i=document.querySelector(".deadlineDateTimeAlert");l<24?i.classList.remove("d-none"):i.classList.add("d-none")}sessionStorage.setItem("deadlineDateTime",n),sessionStorage.setItem("eventDateTime",a),sessionStorage.setItem("votingInvitees",t.value)});const O=document.querySelector(".btnLinkToCreateVoting");O.addEventListener("click",function(){window.location.href="./createVoting.html"});Y(".dateSelector");
