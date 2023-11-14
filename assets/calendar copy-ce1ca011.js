import"./main-9ebfdcfe.js";import{a as d}from"./axios-47b9d439.js";const c="https://teatimeapi-test.onrender.com",D="U004";var y=moment().format("YYYY/MM/DD");let l=[];const i={};function V(){const e=d.get(`${c}/groupings?_expand=restaurant`),n=d.get(`${c}/votings?_expand=restaurant`);Promise.all([e,n]).then(function(s){l=l.concat(s[0].data),l=l.concat(s[1].data),I()}).catch(function(s){console.error(s)})}V();function I(){l.forEach(e=>{i[e.UID]||(i[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(i[e.UID].restaurantList.push(e.restaurantName),delete i[e.UID].currentGroupCondition,delete i[e.UID].minGroupSize)}),M(),console.log(i),T()}function M(){const e=[];for(const n in i)if(i.hasOwnProperty(n)){const s=i[n];e.push({id:s.UID,name:s.restaurantList.join("、"),date:s.deadlineDateTime,type:"event",color:s.UID[0]==="V"?"#F0BD68":"#FD909F"})}S(e)}function S(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const n=$("#calendar").evoCalendar("getActiveDate"),s=moment(n,"MM/DD/YYYY").format("YYYY/MM/DD");console.log("滑鼠點擊的日期：",s),T(s)});const C=document.querySelector(".calendarEvent");function T(e=y){let n="";const r=Object.values(i).filter(t=>t.deadlineDateTime.split(" ")[0]===e);r.length?r.forEach(t=>{n+=`<li ${t.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${t.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${t.UID}`}>
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
              </li>`}):n+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',C.innerHTML=n}const o=document.getElementById("modal-VotingModal");o.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget,s=n.getAttribute("data-bs-votingUID");E(s),w(s);const r=n.querySelector(".votingCard");let t=[],m="";function v(){d.get(`${c}/votings?UID=${s}&_expand=restaurant`).then(function(u){t=u.data,m="",x()}).catch(function(u){console.error(u)})}v();function x(){t.forEach(a=>{m+=`
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
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${a.currentVoters.includes(D)?"btn-active-brand-02":""}"
                              type="button" data-num=${a.id}>投票</button>
                          </div>
                      </li>`}),r.innerHTML=m,document.querySelectorAll(".btnVoteThis").forEach(a=>{a.addEventListener("click",function(){a.classList.contains("btn-active-brand-02")?(b(a.dataset.num,"deleteVote"),alert("投票已取消")):(b(a.dataset.num,"addVote"),alert("投票成功"))})});function b(a,h){d.get(`${c}/votings/${a}`).then(function(f){const p=f.data.currentVoters;if(h==="addVote")p.push(`${D}`);else{const g=p.indexOf(`${D}`);p.splice(g,1)}d.patch(`${c}/votings/${a}`,{currentVoters:p}).then(function(g){v()}).catch(function(g){console.error(g)})}).catch(function(f){console.error(f)})}}});function E(e){const n=o.querySelector(".modal-title");n.textContent=i[e].restaurantList.join("、")}function w(e){const n=o.querySelector(".deadlineDateTime"),s=o.querySelector(".eventDateTime"),r=o.querySelector(".initiator"),t=o.querySelector(".invitees");n.innerHTML=`<span class="me-16">享用日期</span>
                        <span class="me-8 ">${i[e].deadlineDateTime.substring(5,10)}</span>
                        <span>${i[e].deadlineDateTime.split(" ")[1]}</span>`,s.innerHTML=`<span class="me-16">截止時間</span>
                          <span class="me-8">${i[e].eventDateTime.substring(5,10)}</span>
                          <span>${i[e].eventDateTime.split(" ")[1]}</span>`,r.textContent=i[e].initiator,t.textContent=i[e].invitees===""?"無":i[e].invitees}const U=document.getElementById("eventDateTime"),Y=document.getElementById("deadlineDateTime"),L=document.getElementById("votingInvitees"),G=document.getElementById("modal-CreateVoting");G.addEventListener("click",()=>{const e=moment(U.value,"YYYY/MM/DD HH:mm"),n=moment(Y.value,"YYYY/MM/DD HH:mm");e.isValid()&&n.isValid()&&(e.diff(n,"hours")<24?document.querySelector(".deadlineDateTimeAlert").classList.remove("d-none"):document.querySelector(".deadlineDateTimeAlert").classList.add("d-none")),sessionStorage.setItem("votingInvitees",L.value),sessionStorage.setItem("eventDateTime",e),sessionStorage.setItem("deadlineDateTime",n)});const q=document.querySelector(".btnLinkToCreateVoting");q.addEventListener("click",function(){window.location.href="./createVoting.html"});
