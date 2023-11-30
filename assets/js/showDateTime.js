//活動時間字串處理
function showDateTime(datetime) {
    //月份 & 日期
    const date = datetime.substring(5, 10)
    //時間
    const time = datetime.split(" ")[1]

    //回傳陣列，日期請使用[0]，時間請使用[1]
    return [date, time]
}

export default showDateTime;