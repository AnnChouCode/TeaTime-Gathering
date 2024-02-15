/**
 * 將傳入的活動時間字串，分割成可以陣列資料
 * @param {string} datetime - 活動截止時間
 * @param {string} date - 活動截止時間中的 年/月/日
 * @param {string} time - 活動截止時間中的 時:分
 */

function showDateTime(datetime) {
    //月份 & 日期
    const date = datetime.substring(5, 10)
    //時間
    const time = datetime.split(" ")[1]

    //回傳陣列，日期請使用[0]，時間請使用[1]
    return [date, time]
}

export default showDateTime;