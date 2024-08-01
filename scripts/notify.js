var NOTIFY_STANDARD = 0, NOTIFY_ERROR = 1, NOTIFY_SUCCESS = 2

var container = document.getElementById("notify-container")

var startClear = 0

var firstDelay = 100
var delay = 6

function getClassName(type) {
    if (type === NOTIFY_STANDARD) {
        return "notify-standard"        
    }
    if (type === NOTIFY_ERROR) {
        return "notify-error"
    }
    if (type === NOTIFY_SUCCESS) {
        return "notify-success"
    }
}

function sendNotify(type, message) {
    let notify = document.createElement("div")
    notify.className = getClassName(type)
    notify.innerHTML = message
    if (container.childElementCount > 0) {
        if (container.lastElementChild.classList[1] == "notify-fadeout") {
            container.removeChild(container.lastElementChild)
        }
    }
    container.appendChild(notify)
    startClear = 0
}

function deleteNotify() {
    let last = container.lastElementChild
    if (last === null || last.classList[1] === "notify-fadeout") {
        return
    }
    last.className += " notify-fadeout"
    last.addEventListener("animationend", (event) => {
        container.removeChild(container.lastElementChild)
    })
}

function notifyTick() {
    startClear++
    if (startClear == firstDelay) {
        deleteNotify()
        startClear = firstDelay - delay
    }
}