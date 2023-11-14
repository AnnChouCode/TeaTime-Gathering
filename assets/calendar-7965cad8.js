import"./main-9ebfdcfe.js";import{a as l}from"./axios-47b9d439.js";const d="https://teatimeapi-test.onrender.com",c="U004";var v=moment().format("YYYY/MM/DD");let o=[];const i={};function f(){const e=l.get(`${d}/groupings?_expand=restaurant`),s=l.get(`${d}/votings?_expand=restaurant`);Promise.all([e,s]).then(function(n){o=o.concat(n[0].data),o=o.concat(n[1].data),D()}).catch(function(n){console.error(n)})}f();function D(){o.forEach(e=>{i[e.UID]||(i[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(i[e.UID].restaurantList.push(e.restaurantName),delete i[e.UID].currentGroupCondition,delete i[e.UID].minGroupSize)}),b(),console.log(i),p()}function b(){const e=[];for(const s in i)if(i.hasOwnProperty(s)){const n=i[s];e.push({id:n.UID,name:n.restaurantList.join("、"),date:n.deadlineDateTime,type:"event",color:n.UID[0]==="V"?"#F0BD68":"#FD909F"})}h(e)}function h(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const s=$("#calendar").evoCalendar("getActiveDate"),n=moment(s,"MM/DD/YYYY").format("YYYY/MM/DD");console.log("滑鼠點擊的日期：",n),p(n)});const T=document.querySelector(".calendarEvent");function p(e=v){let s="";const a=Object.values(i).filter(t=>t.deadlineDateTime.split(" ")[0]===e);a.length?a.forEach(t=>{s+=`<li ${t.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${t.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${t.UID}`}>
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
                  <div
                    class="align-self-end py-4 py-md-8 order-last order-md-first ${t.UID.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center"
                    style="width:80px">${t.UID.startsWith("V")?"投票中":"開團中"}</div>
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${t.eventDateTime.substring(5,10)}</span>
                          <span>${t.eventDateTime.split(" ")[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${t.deadlineDateTime.substring(5,10)}</span>
                          <span>${t.deadlineDateTime.split(" ")[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${t.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
    <div class="bar bg-brand-02" style="--value: ${Math.floor(t.minGroupSize/t.currentGroupCondition*100)}">
        <div class="text-white">${Math.floor(t.minGroupSize/t.currentGroupCondition*100)>100?100:Math.floor(t.minGroupSize/t.currentGroupCondition*100)}%</div>
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
              </li>`}):s+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',T.innerHTML=s}const r=document.getElementById("modal-VotingModal");function g(e){let s=[];l.get(`${d}/votings?UID=${e}&_expand=restaurant`).then(function(n){s=n.data,y(s)}).catch(function(n){console.error(n)})}r.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");x(n),g(n)});function x(e){const s=r.querySelector(".modal-title");s.textContent=i[e].restaurantList.join("、");const n=r.querySelector(".deadlineDateTime"),a=r.querySelector(".eventDateTime"),t=r.querySelector(".initiator"),m=r.querySelector(".invitees");n.innerHTML=`<span class="me-16">享用日期</span>
                        <span class="me-8 ">${i[e].deadlineDateTime.substring(5,10)}</span>
                        <span>${i[e].deadlineDateTime.split(" ")[1]}</span>`,a.innerHTML=`<span class="me-16">截止時間</span>
                          <span class="me-8">${i[e].eventDateTime.substring(5,10)}</span>
                          <span>${i[e].eventDateTime.split(" ")[1]}</span>`,t.textContent=i[e].initiator,m.textContent=i[e].invitees===""?"無":i[e].invitees}function y(e){const s=r.querySelector(".votingCard");let n="";e.forEach(a=>{n+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${a.restaurant.storeCover}">
                        <div>
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${a.restaurantName}</h4>
                          <p class="mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${a.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress">
                                <div class="bar bg-brand-02" style="--value: ${Math.floor(a.currentVoters.length/a.restaurant.minGroupSize*100)}">
                                  <div class="text-white">${Math.floor(a.currentVoters.length/a.restaurant.minGroupSize*100)>100?100:Math.floor(a.currentVoters.length/a.restaurant.minGroupSize*100)}%</div>
                                </div>
                              </div>
                            </div>
                            <button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${a.currentVoters.includes(c)?"btn-active-brand-02":""}"
                              type="button" data-num=${a.id}>投票</button>
                          </div>
                      </li>`}),s.innerHTML=n,I()}function I(){r.querySelectorAll(".btnVoteThis").forEach(s=>{s.addEventListener("click",function(){s.classList.contains("btn-active-brand-02")?(u(s.dataset.num,"deleteVote"),alert("投票已取消")):(u(s.dataset.num,"addVote"),alert("投票成功"))})})}function u(e,s){l.get(`${d}/votings/${e}`).then(function(n){const a=n.data.currentVoters;if(s==="addVote")a.push(`${c}`);else{const t=a.indexOf(`${c}`);a.splice(t,1)}l.patch(`${d}/votings/${e}`,{currentVoters:a}).then(function(t){g(t.data.UID)}).catch(function(t){console.error(t)})}).catch(function(n){console.error(n)})}const V=document.getElementById("eventDateTime"),M=document.getElementById("deadlineDateTime"),S=document.getElementById("votingInvitees"),C=document.getElementById("modal-CreateVoting");C.addEventListener("click",()=>{const e=moment(V.value,"YYYY/MM/DD HH:mm"),s=moment(M.value,"YYYY/MM/DD HH:mm");e.isValid()&&s.isValid()&&(e.diff(s,"hours")<24?document.querySelector(".deadlineDateTimeAlert").classList.remove("d-none"):document.querySelector(".deadlineDateTimeAlert").classList.add("d-none")),sessionStorage.setItem("votingInvitees",S.value),sessionStorage.setItem("eventDateTime",e),sessionStorage.setItem("deadlineDateTime",s)});const E=document.querySelector(".btnLinkToCreateVoting");E.addEventListener("click",function(){window.location.href="./createVoting.html"});
