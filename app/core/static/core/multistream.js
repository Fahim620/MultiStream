const mode = ["side-by-side", "stacked", "co-stream"];
var layout = mode[0]
var mainStream = "stream-1"
var secondStream = "stream-2"
var swapped = false
var hidden = false
var toggleBack = false
var chatSwitched = false

function init(channel1, channel2) {
    if (channel1 === "None") {
        channel1 = "sideshow"
    } 
    if (channel2 === "None") {
        channel2 = "bren"
    } 
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    document.getElementById("stream-1").src = "https://player.twitch.tv/?channel=" + channel1 + "&parent=feest.app&muted=true"
    document.getElementById("stream-2").src = "https://player.twitch.tv/?channel=" + channel2 + "&parent=feest.app&muted=true"

    // document.getElementById("stream-1").src = "https://player.twitch.tv/?video=v1772874401&parent=feest.app&muted=true"
    // document.getElementById("stream-2").src = "https://player.twitch.tv/?video=v1772874811&parent=feest.app&muted=true"

    document.getElementById("chat-1").src = "https://www.twitch.tv/embed/" + channel1 + "/chat?darkpopout&parent=feest.app"
    document.getElementById("chat-2").src = "https://www.twitch.tv/embed/" + channel2 + "/chat?darkpopout&parent=feest.app"
}


function switchSideBySide() {
    if (layout === mode[2]) {
        undoCostream()
    }

    layout = mode[0]
    document.getElementById("stream-content").classList = "m-0 row flex-grow-1"
    if (swapped) {
        swapped = false
        swap()
    }
    document.getElementById(mainStream).style.width = "50%"
    document.getElementById(secondStream).style.width = "50%"
}


function switchStacked() {
    if (layout === mode[2]) {
        undoCostream()
    }

    layout = mode[1]
    document.getElementById("stream-content").classList = "m-0 d-flex flex-column flex-grow-1"
    if (swapped) {
        swapped = false
        swap()
    }
    document.getElementById(mainStream).style.width = "100%"
    document.getElementById(secondStream).style.width = "100%"
}


function switchCostream(stream=secondStream) {
    layout = mode[2]
    document.querySelector(':root').style.setProperty("--chat-width", "var(--extended-width)")
    document.querySelector(':root').style.setProperty("--offset", "var(--costream-height)")
    document.getElementById("costream-placeholder").style.display = "inline"
    document.getElementById("costream-placeholder").style.height = "var(--costream-height)"

    document.getElementById(stream).style.width = "var(--chat-width)"
    document.getElementById(stream).style.height = "var(--costream-height)"
    document.getElementById(stream).classList.remove("flex-grow-1")
    document.getElementById(stream).style.position = "absolute"
    document.getElementById(stream).style.top = "0%"
    document.getElementById(stream).style.right = "0%"

    // document.getElementById("chat").insertBefore(document.getElementById(secondStream), document.getElementById("chat").firstChild)
    // document.getElementById(secondStream).style.width = "100%"
    // document.getElementById(secondStream).style.height = "var(--costream-height)"
    // document.getElementById(secondStream).classList.remove("flex-grow-1")
    
}


function undoCostream(stream=secondStream) {
    document.querySelector(':root').style.setProperty("--chat-width", "var(--original-width)")
    // if (swapped) {
    //     document.getElementById("stream-content").insertBefore(document.getElementById(secondStream), document.getElementById("stream-content").firstChild)
    // } else {
    //     document.getElementById("stream-content").appendChild(document.getElementById(secondStream))
    // }
    // document.getElementById(secondStream).style.height = "auto"
    // document.getElementById(secondStream).classList.add("flex-grow-1")

    document.getElementById("costream-placeholder").style.display = "none"
    document.getElementById(stream).style.height = "auto"
    document.getElementById(stream).classList.add("flex-grow-1")
    document.getElementById(stream).style.position = "static"

    document.querySelector(':root').style.setProperty("--offset", "0px")
}


function toggleSecondStream() {
    if (!hidden) {
        document.getElementById(secondStream).style.display = "none"
        hidden = true
        document.getElementById("toggle-icon").classList.remove("fa-video")
        document.getElementById("toggle-icon").classList.add("fa-video-slash")

        if (layout === mode[2]) {
            document.getElementById("costream-placeholder").style.display = "none"
            document.querySelector(':root').style.setProperty("--offset", "0px")
        }
        
    } else {
        document.getElementById(secondStream).style.display = "inline"
        hidden = false
        document.getElementById("toggle-icon").classList.remove("fa-video-slash")
        document.getElementById("toggle-icon").classList.add("fa-video")

        if (layout === mode[2]) {
            document.getElementById("costream-placeholder").style.display = "inline"
            document.querySelector(':root').style.setProperty("--offset", "var(--costream-height)")
        }
    }
}


function swap() {
    if (hidden) {
        toggleSecondStream()
        toggleBack = true
    }
    
    if (!swapped){
        if (layout === mode[0]) {
            document.getElementById("stream-content").classList.add("flex-row-reverse")
        } else if (layout === mode[1]) {
            document.getElementById("stream-content").classList.add("flex-column-reverse")
        } else if (layout === mode[2]) {
            undoCostream()
            switchCostream(mainStream)
        }
        swapped = true
    } else {
        if (layout === mode[0]) {
            document.getElementById("stream-content").classList.remove("flex-row-reverse")
        } else if (layout === mode[1]) {
            document.getElementById("stream-content").classList.remove("flex-column-reverse")
        } else if (layout === mode[2]) {
            undoCostream()
            switchCostream(mainStream)
        }
        swapped = false
    }

    temp = mainStream
    mainStream = secondStream
    secondStream = temp

    if (toggleBack) {
        toggleSecondStream()
        toggleBack = false
    }
}


function collapse() {
    document.getElementById("chat").style.display = "none"
    document.getElementById("main").style.width = "100%"
    document.getElementById("collapse").style.display = "none"
    document.getElementById("switch-chat").style.display = "none"
    document.getElementById("expand").style.display = "block"
    document.getElementById("stream-overlay").style.right = "0.4375%"
}


function expand() {
    document.getElementById("chat").style.display = "flex";
    document.getElementById("main").style.width = "calc(100% - var(--chat-width))";
    document.getElementById("collapse").style.display = "inline"
    document.getElementById("switch-chat").style.display = "inline"
    document.getElementById("expand").style.display = "none"
    document.getElementById("stream-overlay").style.right = "calc(var(--chat-width) + 0.4375%)"
} 


function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("fullscreen-icon").classList.remove("fa-expand")
        document.getElementById("fullscreen-icon").classList.add("fa-compress")
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("fullscreen-icon").classList.remove("fa-compress")
        document.getElementById("fullscreen-icon").classList.add("fa-expand")
    }
}


function switchChat() {
    if (chatSwitched) {
        document.getElementById("chat-1").style.display = "flex"
        document.getElementById("chat-2").style.display = "none"
        chatSwitched = false
    } else {
        document.getElementById("chat-1").style.display = "none"
        document.getElementById("chat-2").style.display = "flex"
        chatSwitched = true
    }
}