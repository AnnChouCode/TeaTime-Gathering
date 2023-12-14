// 計算到時分秒
function isGroupTime(time){

  const tody = new Date().getTime();
  const timestamp = Date.parse(time);
  // console.log(tody); // 今日
  // console.log(timestamp); // 到期日
  if(tody > timestamp){
    // 表示過期
    return true;
  }else{
    return false;
  }
}

export default isGroupTime