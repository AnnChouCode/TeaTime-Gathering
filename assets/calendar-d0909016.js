import"./main-4d2cfade.js";import{a as c}from"./axios-3a76d256.js";const x="https://teatimeapi-test.onrender.com",g=new autoComplete({selector:"#navSearchAutoComplete",data:{src:async e=>{try{return await(await fetch(`${x}/restaurants`)).json()}catch(t){return t}},keys:["storeName"]},searchEngine:"loose",resultItem:{highlight:!0},resultsList:{element:(e,t)=>{if(!t.results.length){const n=document.createElement("div");n.setAttribute("class","no_result px-8"),n.innerHTML=`<span>Found No Results for "${t.query}"</span>`,e.prepend(n)}},noResults:!0},events:{input:{selection:e=>{const t=e.detail.selection.value;g.input.value=t.storeName,console.log(t.storeName),window.location.href=`./store-order.html?UID=${t.UID}`},keydown:e=>{e.keyCode===13&&(g.input.value,console.log(selectionValue.storeName),window.location.href=`./store-order.html?UID=${selectionValue.UID}`)}}}}),f=document.querySelector(".needs-validation"),T=document.querySelector(".inputLoginAccount"),I=document.querySelector(".inputLoginPassword"),L=document.querySelectorAll(".btnLoginSubmit"),h=document.querySelectorAll(".btnLogin"),b=document.querySelectorAll(".btnUserLoggedIn"),m=document.querySelectorAll(".btnLogOut");L.forEach(e=>{e.addEventListener("click",()=>{const t=T.value,n=I.value;if(f.checkValidity()||f.classList.add("was-validated"),t==="ling-huang@fat-together.com"&&n==="ling-huang")m.forEach(o=>{o.classList.remove("d-none")}),b.forEach(o=>{o.classList.remove("d-none")}),h.forEach(o=>{o.classList.add("d-none")}),$("#accountModal").modal("hide");else{const o=document.querySelector(".invalid-feedback");o.style.display="block"}})});m.forEach(e=>{e.addEventListener("click",()=>{m.forEach(t=>{t.classList.add("d-none")}),b.forEach(t=>{t.classList.add("d-none")}),h.forEach(t=>{t.classList.remove("d-none")})})});const d="https://teatimeapi-test.onrender.com",p="U004";var V=moment().format("YYYY/MM/DD");let l=[];const a={};function S(){const e=c.get(`${d}/groupings?_expand=restaurant`),t=c.get(`${d}/votings?_expand=restaurant`);Promise.all([e,t]).then(function(n){l=l.concat(n[0].data),l=l.concat(n[1].data),E()}).catch(function(n){console.error(n)})}S();function E(){l.forEach(e=>{a[e.UID]||(a[e.UID]={UID:e.UID,restaurantId:e.restaurantId,deadlineDateTime:e.deadlineDateTime,eventDateTime:e.eventDateTime,initiator:e.initiator,invitees:e.invitees,restaurantList:e.UID.startsWith("V")?[]:[e.restaurantName],restaurantPhoto:e.restaurant.storeCover,minGroupSize:e.restaurant.minGroupSize,currentGroupCondition:e.currentGroupCondition}),e.UID.startsWith("V")&&(a[e.UID].restaurantList.push(e.restaurantName),delete a[e.UID].currentGroupCondition,delete a[e.UID].minGroupSize)}),w(),console.log(a),D()}function w(){const e=[];for(const t in a)if(a.hasOwnProperty(t)){const n=a[t];e.push({id:n.UID,name:n.restaurantList.join("、"),date:n.deadlineDateTime,type:"event",color:n.UID[0]==="V"?"#F0BD68":"#FD909F"})}C(e)}function C(e){$("#calendar").evoCalendar({sidebarDisplayDefault:!1,sidebarToggler:!0,eventDisplayDefault:!1,eventListToggler:!1,todayHighlight:!0,calendarEvents:e})}$("#calendar").on("click",function(e){const t=$("#calendar").evoCalendar("getActiveDate"),n=moment(t,"MM/DD/YYYY").format("YYYY/MM/DD");console.log("滑鼠點擊的日期：",n),D(n)});const M=document.querySelector(".calendarEvent");function D(e=V){let t="";const o=Object.values(a).filter(s=>s.deadlineDateTime.split(" ")[0]===e);o.length?o.forEach(s=>{t+=`<li ${s.UID.startsWith("V")?`class="cursor-pointer" data-bs-votingUID=${s.UID} data-bs-toggle="modal" data-bs-target="#modal-VotingModal"`:`data-groupingUID=${s.UID}`}>
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
                  <div
                    class="align-self-end py-4 py-md-8 order-last order-md-first ${s.UID.startsWith("V")?"bg-brand-01":"bg-brand-02"} rounded-pill text-white text-center"
                    style="width:80px">${s.UID.startsWith("V")?"投票中":"開團中"}</div>
                  <!-- 月曆卡片內容 -->
                  <ul class="row flex-column flex-xl-row g-4 g-md-8 p-0 fs-16 fs-md-20">
                    <li class="col col-xl-7">
                      <ul class="d-flex flex-column gap-4 gap-md-8">
                        <li>
                          <span class="me-16">享用日期</span>
                          <span class="me-8">${s.eventDateTime.substring(5,10)}</span>
                          <span>${s.eventDateTime.split(" ")[1]}</span>
                        </li>
                        <li>
                          <span class="me-16">截止時間</span>
                          <span class="me-8">${s.deadlineDateTime.substring(5,10)}</span>
                          <span>${s.deadlineDateTime.split(" ")[1]}</span>
                        </li>
                      </ul>
                    </li>
                    ${s.UID.startsWith("V")?"":`<li class="d-flex align-items-center order-1 order-md-end">
                      <span class="me-16">成團目標</span>                      
                      <div class="ts-progress is-tiny bg-gray-04" style="width: 120px;">
    <div class="bar bg-brand-02" style="--value: ${Math.floor(s.minGroupSize/s.currentGroupCondition*100)}">
        <div class="text-white">${Math.floor(s.minGroupSize/s.currentGroupCondition*100)>100?100:Math.floor(s.minGroupSize/s.currentGroupCondition*100)}%</div>
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
              </li>`}):t+='<li class="fs-16 fs-md-20 text-center">目前沒有下午茶活動</li>',M.innerHTML=t}const r=document.getElementById("modal-VotingModal");function y(e){let t=[];c.get(`${d}/votings?UID=${e}&_expand=restaurant`).then(function(n){t=n.data,q(t)}).catch(function(n){console.error(n)})}r.addEventListener("show.bs.modal",function(e){const n=e.relatedTarget.getAttribute("data-bs-votingUID");U(n),y(n)});function U(e){const t=r.querySelector(".modal-title");t.textContent=a[e].restaurantList.join("、");const n=r.querySelector(".deadlineDateTime"),o=r.querySelector(".eventDateTime"),s=r.querySelector(".initiator"),i=r.querySelector(".invitees");n.innerHTML=`<span class="me-16">享用日期</span>
                        <span class="me-8 ">${a[e].deadlineDateTime.substring(5,10)}</span>
                        <span>${a[e].deadlineDateTime.split(" ")[1]}</span>`,o.innerHTML=`<span class="me-16">截止時間</span>
                          <span class="me-8">${a[e].eventDateTime.substring(5,10)}</span>
                          <span>${a[e].eventDateTime.split(" ")[1]}</span>`,s.textContent=a[e].initiator,i.textContent=a[e].invitees===""?"無":a[e].invitees}function q(e){const t=r.querySelector(".votingCard");let n="";e.forEach(o=>{n+=`
                      <li class="d-flex gap-12 p-12 mb-12 border border-brand-03 border-radius-40401616">
                        <img class="border-radius-32321616 votingcard-photo" src="${o.restaurant.storeCover}">
                        <div class="flex-grow-1 d-flex flex-column">
                          <h4 class="mb-8 fs-16 fs-md-20 lh-sm text-brand-03">${o.restaurantName}</h4>
                          <p class="flex-grow-1 mb-8 mb-md-16 text-gray-02 trippleline-ellipsis">${o.restaurant.summary}</p>
                          <div class="d-flex justify-content-between flex-column flex-lg-row">
                            <div class="d-flex align-items-center mb-8 mb-lg-0 ">
                              <span class="me-4 me-lg-16 text-gray-02 text-nowrap">成團目標</span>
                              <div class="ts-progress is-tiny bg-gray-04 voting-progress">
                                <div class="bar bg-brand-02" style="--value: ${Math.floor(o.currentVoters.length/o.restaurant.minGroupSize*100)}">
                                  <div class="text-white">${Math.floor(o.currentVoters.length/o.restaurant.minGroupSize*100)>100?100:Math.floor(o.currentVoters.length/o.restaurant.minGroupSize*100)}%</div>
                                </div>
                              </div>
                            </div>
                            <button
                              class="py-4 px-16 btn-brand-05 btn-hover-bg-1 border-0 rounded-pill text-brand-02 btnVoteThis ${o.currentVoters.includes(p)?"btn-active-brand-02":""}"
                              type="button" data-num=${o.id}>投票</button>
                          </div>
                      </li>`}),t.innerHTML=n,Y()}function Y(){r.querySelectorAll(".btnVoteThis").forEach(t=>{t.addEventListener("click",function(){t.classList.contains("btn-active-brand-02")?(v(t.dataset.num,"deleteVote"),alert("投票已取消")):(v(t.dataset.num,"addVote"),alert("投票成功"))})})}function v(e,t){c.get(`${d}/votings/${e}`).then(function(n){const o=n.data.currentVoters;if(t==="addVote")o.push(`${p}`);else{const s=o.indexOf(`${p}`);o.splice(s,1)}c.patch(`${d}/votings/${e}`,{currentVoters:o}).then(function(s){y(s.data.UID)}).catch(function(s){console.error(s)})}).catch(function(n){console.error(n)})}const A=document.getElementById("modal-CreateVoting");A.addEventListener("click",()=>{const e=document.getElementById("eventDateTime"),t=document.getElementById("deadlineDateTime"),n=document.getElementById("votingInvitees"),o=e.value.trim(),s=t.value.trim();let i="",u="";o&&(i=moment(e.value,"YYYY/MM/DD HH:mm")),s&&(u=moment(t.value,"YYYY/MM/DD HH:mm")),i&&u&&(i.diff(u,"hours")<24?document.querySelector(".deadlineDateTimeAlert").classList.remove("d-none"):document.querySelector(".deadlineDateTimeAlert").classList.add("d-none")),sessionStorage.setItem("deadlineDateTime",s),sessionStorage.setItem("eventDateTime",o),sessionStorage.setItem("votingInvitees",n.value)});const k=document.querySelector(".btnLinkToCreateVoting");k.addEventListener("click",function(){window.location.href="./createVoting.html"});
