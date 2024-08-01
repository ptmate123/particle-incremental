var news = [
    "震惊! 一男子为观看小视频，将自己的兄弟杀害！",
    "商城评分: 1.79e308 / 5",
    "岩浆是可以喝的，里面还富含矿物质",
    "我认为意大利面就应该拌42号混凝土",
    "他给了我10001001元!!",
    "吉祥数是2048,4096等",
    "数到5吧! 0,1,2,3,4",
    "0.1+0.2不等于0.3",
    "点击开始游戏：<a href='https://developer.mozilla.org/'>START</a>",
    'cout << "hello python!" << endl;',
    "69? 很好的数字",
    "解方程, 解得0=1",
    "(++i)+(i++)",
    "不要温和的走进每一个tick",
    "a/(b+c)+b/(a+c)+c/(a+b)=7",
    "ha;;o wolrd"
]

let news_ticker = document.getElementById("news-ticker")

window.addEventListener("animationiteration", (event) => {
    if (event.animationName === "news-ticker") {
        randNews()
    }
})

function getNews(duration, index) {
    return `<span style="animation-duration: ${duration}s">${news[index]}</span>`
}

function getDuration(index) {
    return 10 + news[index].length * 0.3
}

function randNews() {
    let index = Math.floor(Math.random() * news.length)
    let duration = getDuration(index)
    news_ticker.innerHTML = getNews(duration, index)
}

randNews()