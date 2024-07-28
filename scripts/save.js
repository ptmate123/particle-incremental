var autosaveId

function reset() {
    player.autosave = false
    player.particle = new Decimal("1")
}

function save() {
    localStorage.setItem("ParticleIncSave", JSON.stringify(player))
    player.lastSaveTime = Date.now()
}

function reload() {
    if (player.autosave) {
        document.getElementById("toggleAutoSave").innerHTML = "Autosave: ON"
        autosaveId = setInterval(save, 5000)
    }
}

function load() {
    var callback = JSON.parse(localStorage.getItem("ParticleIncSave"))
    if (callback === null) {
        reset()
        save()
        return
    }
    player = callback
    player.particle = new Decimal(player.particle)
    reload()
}

function hardReset() {
    if (confirm("你真的要重置吗？这个存档会消失很久（真的很久！）")) {
        reset()
        save()
        location.reload()
    }
}

function toggleAutoSave() {
    if (player.autosave) {
        player.autosave = false
        document.getElementById("toggleAutoSave").innerHTML = "Autosave: OFF"
        clearInterval(autosaveId)
    } else {
        player.autosave = true
        document.getElementById("toggleAutoSave").innerHTML = "Autosave: ON"
        autosaveId = setInterval(save, 5000)
    }
}