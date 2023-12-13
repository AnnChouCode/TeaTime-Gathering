// 計算成團、投票進度條
function calcGroupProgress(numParticipants = 0, numMinGroupSize = 0) {
  // 參與者人數、最小組人數
  // numParticipants = 1
  // numMinGroupSize = 4
  return Math.floor(numParticipants / numMinGroupSize * 100)
}

export default calcGroupProgress