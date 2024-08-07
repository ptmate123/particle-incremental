// every interval has unique id
var autosaveId

function setAutoSave(state) {
    player.settings.autosave = state
    var toggleBtn = document.getElementById("toggle-auto-save")
    if (state) {
        toggleBtn.innerHTML = "自动保存: 开"
        autosaveId = setInterval(save, 10000)
        return
    }
    toggleBtn.innerHTML = "自动保存: 关"
    clearInterval(autosaveId)
}

function toggleAutoSave() {
    setAutoSave(!player.settings.autosave)
}

function init() {
    player.particle = new Decimal(player.particle)
    setAutoSave(player.settings.autosave)
}

function resetData() {
    localStorage.clear()
    player = defaultPlayer
}

function save() {
    player.lastSaveTime = Date.now()
    localStorage.setItem("ParticleIncSave", JSON.stringify(player))
    sendNotify(NOTIFY_STANDARD, "Saved!")
}

function hardReset() {
    if (confirm("你真的要重置吗？这个存档会消失很久（真的很久！）")) {
        if (prompt("请输入 Yes 进行重置") === "Yes") {
            resetData()
            save()
            location.reload()
        }
    }
}

function load() {
    var loadgame = JSON.parse(localStorage.getItem("ParticleIncSave"))
    // didn't write any data into the local storage
    if (loadgame === null) {
        player = defaultPlayer
        save()
        return
    }
    player = loadgame
    init()
}

function exportSave() {
    save()

    navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function () {
        sendNotify(NOTIFY_SUCCESS, "Copied to clipboard!")
    }, function () {
        sendNotify(NOTIFY_ERROR, "Error copying to clipboard, try again...")
    });
}

function importSave() {
    try {
        loadgame = JSON.parse(atob(prompt("Input your save here:")))
    } catch(e) {
        sendNotify(NOTIFY_ERROR, "Invalid input.")
        return
    }

    player = loadgame
    save()
    location.reload()
}