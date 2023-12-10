import axios from 'axios';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";
// import 判斷登入狀態樣板
import isLoggedIn from '/assets/js/components/isLoggedIn.js';

//全頁共用變數
const _token = localStorage.getItem("token");


/* 視登入狀態更改按鈕功能 ================================*/
document.addEventListener('DOMContentLoaded', function () {
    const btnCreateGrouping = document.querySelector(".btnCreateGrouping")
    const btnCart = document.querySelectorAll(".btnCart")
    const btnWriteReview = document.querySelectorAll(".btnWriteReview")


    if (isLoggedIn(_token)) {
        // 已登入，設置 modal 顯示目標
        // 移除原本的 popover 屬性
        btnCreateGrouping.setAttribute('href', '#modal-CreateGroup');
        btnCreateGrouping.setAttribute("data-bs-toggle", "modal");

        btnCart.forEach(btn => {
            // btn.setAttribute('href', '#modal-shppingCart-order');
            // btn.setAttribute("data-bs-toggle", "modal");
        })        

        btnWriteReview.forEach(btn => {
            btn.setAttribute('href', '#modal-WriteReview');
            btn.setAttribute("data-bs-toggle", "modal");
        })

    } else {
        // 未登入，設置 popover
        // 設置 popover 內容
        btnCreateGrouping.setAttribute('data-bs-toggle', 'popover');
        btnCreateGrouping.setAttribute('data-bs-content', '請先登入帳號');

        btnCart.forEach(btn => {
            btn.setAttribute('data-bs-toggle', 'popover');
            btn.setAttribute('data-bs-content', '請先登入帳號');
        })

        btnWriteReview.forEach(btn => {
            btn.setAttribute('data-bs-toggle', 'popover');
            btn.setAttribute('data-bs-content', '請先登入帳號');
        })

        //popover 初始化
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl)
        })
    }
});