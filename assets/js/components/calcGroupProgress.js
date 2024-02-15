/**
 * 計算成團、投票進度條
 * @param {number} numParticipants - 參與者人數，預設為 0
 * @param {number} numMinGroupSize - 最小組人數，預設為 0
 * @return {number} 返回成團進度的百分比
 */

function calcGroupProgress(numParticipants = 0, numMinGroupSize = 0) {
  return Math.floor(numParticipants / numMinGroupSize * 100)
}

export default calcGroupProgress