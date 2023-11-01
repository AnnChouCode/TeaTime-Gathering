import './assets/scss/all.scss';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

/* 通知按鈕-訊息 Bootstrap Toasts 初始化 */
const toastTrigger = document.getElementById("notificationToastBtn");
const toastLiveContent = document.getElementById("notificationToast");
if (toastTrigger) {
  toastTrigger.addEventListener("click", function () {
    let toast = new bootstrap.Toast(toastLiveContent);
    toast.show();
  });
}
