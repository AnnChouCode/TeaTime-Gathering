//星評樣板
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