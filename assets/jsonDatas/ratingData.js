let ratingData = [
    {
      ID: "R001",
      reviewer: "陳瑋",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-16.jpg?raw=true",
      starRating: 4,
      feedbackText: "我今天的幸福都在這裡了，謝謝團主大大！",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/11/8"
    },
    {
      ID: "R002",
      reviewer: "陳雨潔",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-14.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "飲料口味都很特別，琥珀奶香有夠奶的，濃醇香就是這個意思吧。前幾天忍不住跑到現場，店裝潢的也很漂亮很文青。",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/11/19"
    },
    {
      ID: "R003",
      reviewer: "盧子晴",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-13.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "大推柚香翠玉，香味清香撲鼻，茶味甘甜，入口醇郁濃厚，加上葡萄柚的酸爽，清涼退火。還有淡雅桂花香和甘潤烏龍茶味，不僅養顏美容又醇厚好喝。還不趕緊跟著我立刻訂起來！",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/11/19"
    },
    {
      ID: "R004",
      reviewer: "黃莉琳",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-09.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "喜歡喝後帶來的清新感，每次來都能享受到非常愉快的時光，謝謝店家的用心",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/11/30"
    },
    {
      ID: "R005",
      reviewer: "Malina Chanbers",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-15.jpg?raw=true",
      starRating: 5,
      feedbackText: "口感普通，價格合理，裝潢雅致，是個平實的飲料店。",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/12/3"
    },
    {
      ID: "R006",
      reviewer: "劉明峰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-01.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "品質一流，價格較高，但每一口都是享受，是個追求品味的極致飲品店。",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/12/3"
    },
    {
      ID: "R007",
      reviewer: "陳大添",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-11.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "飲料清新可口，環境明亮舒適，價格略高但感覺很享受，是個高水準的飲品店",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/12/31"
    },
    {
      ID: "R008",
      reviewer: "張三峰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-09.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "飲品創意獨特，服務熱情，價格稍高但物有所值，是個值得一試的好地方。",
      reviewedRestaurant: "茶源 ChaSource",
      reviewDateTime: "2023/12/31"
    },
    {
      ID: "R009",
      reviewer: "James Williams",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-08.jpg?raw=true",
      starRating: 3,
      feedbackText:
        "簡直難喝到極點，口感完全失敗，讓我非常失望。絕對不會再來第二次",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/11/3"
    },
    {
      ID: "R010",
      reviewer: "張三峰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-09.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "用料新鮮，製作精湛，一杯飲品帶來的滿足感真的難以言喻。每次喝都有家的感覺",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/11/9"
    },
    {
      ID: "R011",
      reviewer: "況似棋",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-10.jpg?raw=true",
      starRating: 5,
      feedbackText: "選擇多元，每杯飲品都是驚喜",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/11/11"
    },
    {
      ID: "R012",
      reviewer: "陳雨潔",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-14.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "口感中規中矩，沒有太多特別的驚喜，但也不錯喝。希望他們可以再加強口味的創新和獨特性",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/11/18"
    },
    {
      ID: "R013",
      reviewer: "劉語柔",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-11.jpg?raw=true",
      starRating: 5,
      feedbackText: "選擇豐富多樣，總是能滿足我對美味的渴望",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/12/4"
    },
    {
      ID: "R014",
      reviewer: "陳健邦",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-06.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "每一杯飲品都是精心調配的藝術品，不僅美味，也是視覺和味蕾的享受",
      reviewedRestaurant: "涎飲",
      reviewDateTime: "2023/12/26"
    },
    {
      ID: "R015",
      reviewer: "陳大添",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-11.jpg?raw=true",
      starRating: 4,
      feedbackText: "飲品口感順滑，價格實惠，每次造訪都能感受到滿滿的用心",
      reviewedRestaurant: "綠意軒",
      reviewDateTime: "2023/11/27"
    },
    {
      ID: "R016",
      reviewer: "張三峰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-09.jpg?raw=true",
      starRating: 5,
      feedbackText: "菜單多樣，選擇豐富，無論口味偏好如何，都能找到心水的飲品",
      reviewedRestaurant: "綠意軒",
      reviewDateTime: "2023/11/28"
    },
    {
      ID: "R017",
      reviewer: "況似棋",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-10.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "用料新鮮，製作精湛，一杯飲品帶來的滿足感真的難以言喻。每次喝都有家的感覺",
      reviewedRestaurant: "綠意軒",
      reviewDateTime: "2023/11/30"
    },
    {
      ID: "R018",
      reviewer: "陳雨潔",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-14.jpg?raw=true",
      starRating: 5,
      feedbackText: "選擇多元，每杯飲品都是驚喜",
      reviewedRestaurant: "綠意軒",
      reviewDateTime: "2023/12/5"
    },
    {
      ID: "R019",
      reviewer: "劉語柔",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-11.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "口感中規中矩，沒有太多特別的驚喜，但也不錯喝。希望他們可以再加強口味的創新和獨特性",
      reviewedRestaurant: "綠意軒",
      reviewDateTime: "2023/12/5"
    },
    {
      ID: "R020",
      reviewer: "陳健邦",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-06.jpg?raw=true",
      starRating: 5,
      feedbackText: "選擇豐富多樣，總是能滿足我對美味的渴望",
      reviewedRestaurant: "糖霜繪本",
      reviewDateTime: "2023/11/6"
    },
    {
      ID: "R021",
      reviewer: "梅嘉欣",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-07.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "每一杯飲品都是精心調配的藝術品，不僅美味，也是視覺和味蕾的享受",
      reviewedRestaurant: "糖霜繪本",
      reviewDateTime: "2023/11/16"
    },
    {
      ID: "R022",
      reviewer: "Olivia Johnson",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-05.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "每一個選項都像是一段甜甜的戀愛故事，讓你想要跟每一個甜點交往！",
      reviewedRestaurant: "糖霜繪本",
      reviewDateTime: "2023/11/26"
    },
    {
      ID: "R023",
      reviewer: "劉佩珊",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-01.jpg?raw=true",
      starRating: 4,
      feedbackText:
        "這家甜點店的甜點總是讓我甜在心裡。無論是蛋糕還是冰淇淋，每一種都是甜蜜的享受，是我舒緩壓力的好地方。",
      reviewedRestaurant: "糖霜繪本",
      reviewDateTime: "2023/12/6"
    },
    {
      ID: "R024",
      reviewer: "鍾明翰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-02.jpg?raw=true",
      starRating: 3,
      feedbackText: "還可以啦，果腹一下XD",
      reviewedRestaurant: "糖霜繪本",
      reviewDateTime: "2023/12/26"
    },
    {
      ID: "R025",
      reviewer: "Mia Lin",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-03.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "他們的咖啡就像是對人生的懷疑：你不確定它是深咖啡還是淺咖啡，但你知道它一定會帶給你能量，至少是因為咖啡因。",
      reviewedRestaurant: "Leisurely Café",
      reviewDateTime: "2023/10/10"
    },
    {
      ID: "R026",
      reviewer: "周信宏",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-03.jpg?raw=true",
      starRating: 5,
      feedbackText:
        "咖啡的品質總是保持著一流水準。無論是拿鐵還是美式，每一杯都讓我感受到滿足的味蕾之旅。",
      reviewedRestaurant: "Leisurely Café",
      reviewDateTime: "2023/11/11"
    },
    {
      ID: "R027",
      reviewer: "溫雅琪",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/female/user-female-08.jpg?raw=true",
      starRating: 5,
      feedbackText: "咖啡的質量始終如一，無論何時來都能品味到美味",
      reviewedRestaurant: "Leisurely Café",
      reviewDateTime: "2023/12/12"
    },
    {
      ID: "R028",
      reviewer: "趙文杰",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-02.jpg?raw=true",
      starRating: 4,
      feedbackText: "首推黑糖美式",
      reviewedRestaurant: "Leisurely Café",
      reviewDateTime: "2023/12/13"
    },
    {
      ID: "R029",
      reviewer: "Daniel Brown",
      reviewerPhoto:
        "https://github.com/AnnChouCode/TeaTime-Gathering/blob/main/assets/images/user/male/user-male-10.jpg?raw=true",
      starRating: 1,
      feedbackText: "這種品質也能開店，我也能當老闆了",
      reviewedRestaurant: "Leisurely Café",
      reviewDateTime: "2023/12/31"
    }
  ];