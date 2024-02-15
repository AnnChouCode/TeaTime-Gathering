/**
 * 生成星評 HTML 樣板
 * @param {number} starsTotal - 星評總計為 5 顆星
 * @param {object} starsStates - 兩種星星模組 HTML 樣板設定
 * @param {string} resultStars - 藉由傳入的星星數項 num，生成相同數量的好星星，以及剩餘未評分星星
 */

function showStars(num) {
  const starsTotal = 5
  const starsStates = {
      isGoodStar: `<iconify-icon icon="ic:round-star" style="color: #ffd43a;"
                      width="16"></iconify-icon>`,
      notGoodStar: `<iconify-icon icon="ic:round-star" style="color: #c2c1bd;"
                      width="16"></iconify-icon>`
  }
  let resultStars = starsStates["isGoodStar"].repeat(num) + starsStates["notGoodStar"].repeat(starsTotal - num)
  return resultStars
}

export default showStars;