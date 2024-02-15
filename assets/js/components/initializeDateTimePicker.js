// import 時間選擇器
import flatpickr from 'flatpickr'

/**
 * 將 element 的 id 或 class 傳入，使用 flatpickr 初始化
 * @param {string} element - 元素 id 或 class
 */

function initializeDateTimePicker(element){
    return flatpickr(element, {
        enableTime: true,
        dateFormat: "Y/m/d H:i", // 24 小時制時間格式
        time_24hr: true,
        minuteIncrement: 15,
        allowInput: true,
        minDate: moment().format('YYYY/MM/DD'),
    });
}

export default initializeDateTimePicker;