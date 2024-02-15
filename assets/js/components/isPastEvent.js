/**
 * 判斷傳入時間是否早於今天（意即過去式事件）
 * @param {string} 活動時間
 * @param {boolean} 判斷是否為過去事件結果
 */

function isPastEvent(time) {
    const eventDate = moment(time, 'YYYY/MM/DD HH:mm:ss');
    const result = moment().isAfter(eventDate)

    return result
  }

export default isPastEvent;