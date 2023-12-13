// 處理購物車時間(享用時間、訂購期限)
function timeForCarts(eventDateTime = '',deadlineDateTime = ''){
  // eventDateTime = '2023/12/13 12:00'
  // deadlineDateTime = '2023/12/13 12:00'
  let data = {eventDateTime:{},deadlineDateTime:{}};
  if(eventDateTime!=''){
    const [yymmdd, time] = eventDateTime.split(" ");
    const originalDateObject = new Date(eventDateTime);
    const date = originalDateObject.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
    data.eventDateTime.yymmdd = yymmdd;
    data.eventDateTime.date = date;
    data.eventDateTime.time = time;
  }
  if(deadlineDateTime!=''){
    const [yymmdd, time] = deadlineDateTime.split(" ");
    const originalDateObject = new Date(deadlineDateTime);
    const date = originalDateObject.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
    data.deadlineDateTime.yymmdd = yymmdd;
    data.deadlineDateTime.date = date;
    data.deadlineDateTime.time = time;
  }

    //  回傳格式 
    // data = {
    //   "eventDateTime": {
    //     "yymmdd": "2023/12/13",
    //     "date": "12/13",
    //     "time": "12:00"
    //   },
    //   "deadlineDateTime": {
    //       "yymmdd": "2023/12/13",
    //       "date": "12/13",
    //       "time": "12:00"
    //   }
    // }

    // 判斷 obj 內有無值用 Object.keys
    // if(Object.keys(data.deadlineDateTime).length === 0){}
  return data
}
export default timeForCarts;