// every interval has unique id
var autosaveId

function saveIsVaild(save) {
    return save && save != null && save != ""
}

function setAutoSave(state) {
    player.autosave = state
    var toggleBtn = document.getElementById("toggle-auto-save")
    if (player.autosave) {
        toggleBtn.innerHTML = "自动保存: 开"
        autosaveId = setInterval(save, 5000)
        return
    }
    toggleBtn.innerHTML = "自动保存: 关"
    clearInterval(autosaveId)
}

function toggleAutoSave() {
    if (player.autosave) {
        setAutoSave(false)
    } else {
        setAutoSave(true)
    }
}

function resetData() {
    player.autosave = false
    player.particle = new Decimal("1")
}

function save() {
    player.lastSaveTime = Date.now()
    localStorage.setItem("ParticleIncSave", JSON.stringify(player))
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
    if (!saveIsVaild(loadgame)) {
        resetData()
        save()
        return
    }
    player = loadgame
    player.particle = new Decimal(player.particle)

    // first call
    setAutoSave(player.autosave)
}

function exportSave() {
    save()

    navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function () {
        alert("Copied to clipboard!")
    }, function () {
        alert("Error copying to clipboard, try again...")
    });
}

function importSave() {
    loadgame = JSON.parse(atob(prompt("Input your save here:")))

    if (!saveIsVaild(loadgame)) {
        alert("Invalid input.")
        return
    }

    player = loadgame
    player.particle = new Decimal(player.particle)
    save()
    location.reload()
}