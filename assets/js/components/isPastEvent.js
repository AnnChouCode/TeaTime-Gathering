//判斷傳入時間是否早於今天（意即過去式事件）
function isPastEvent(time) {
    const eventDate = moment(time, 'YYYY/MM/DD HH:mm');
    const result = moment().isAfter(eventDate)

    return result
  }

export default isPastEvent;