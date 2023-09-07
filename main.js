import './assets/scss/all.scss';
import * as bootstrap from "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world!");


// Notification Boostrap Toasts
const toastTrigger = document.getElementById("notificationToastBtn");
const toastLiveContent = document.getElementById("notificationToast");
if (toastTrigger) {
  toastTrigger.addEventListener("click", function () {
    let toast = new bootstrap.Toast(toastLiveContent);
    toast.show();
  });
}
