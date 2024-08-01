function changeTab(tabId) {
    var tab = document.getElementsByClassName("tab")
    for (let index = 0; index < tab.length; index++) {
        tab[index].style.visibility = "hidden"
    }
    tab[tabId - 1].style.visibility = "visible"
}

setInterval(() => {
    document.getElementById("top-particle").innerHTML = toFormat(player.particle)
    player.lastOnlineTime = Date.now()
    notifyTick()
});