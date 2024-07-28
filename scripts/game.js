var player = {
    particle: new Decimal("1"),
    autosave: false,
    lastSaveTime: 0,
    lastOnlineTime: 0
}

function changeTab(tabId) {
    var tab = document.getElementsByClassName("tab")
    for (let index = 0; index < tab.length; index++) {
        tab[index].style.display = "none"
    }
    tab[tabId - 1].style.display = "block"
}

function increase() {
    player.particle = player.particle.times(new Decimal("2"))
}

setInterval(() => {
    document.getElementsByClassName("top-particle")[0].innerHTML = toFormat(player.particle)
    player.lastOnlineTime = Date.now()
});