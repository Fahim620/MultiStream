const mode = ["side-by-side", "stacked", "co-stream"]
var layout = mode[0]
var streams = ["stream-1", "stream-2"]
const chats = ["chat-1", "chat-2"]
var chat = false
var hidden = false

var channels = []


function init(param1, param2) {
    channels[0] = "sideshow"
    channels[1] = "bren"
    document.getElementById(streams[0]).src = "https://player.twitch.tv/?video=v1772874401&parent=stream.feest.app&muted=true"
    document.getElementById(chats[0]).src = "https://www.twitch.tv/embed/sideshow/chat?darkpopout&parent=localhost"
    document.getElementById(streams[1]).src = "https://player.twitch.tv/?video=v1772874811&parent=stream.feest.app&muted=true"
    document.getElementById(chats[1]).src = "https://www.twitch.tv/embed/bren/chat?darkpopout&parent=stream.feest.app"

    // channel1 = param1
    // channel2 = param2
    // document.getElementById(streams[0]).src = "https://player.twitch.tv/?channel=" + channel1 + "&parent=stream.feest.app&muted=true"
    // document.getElementById(chats[0]).src = "https://www.twitch.tv/embed/" + channel1 + "/chat?darkpopout&parent=stream.feest.app"
    // document.getElementById(streams[1]).src = "https://player.twitch.tv/?channel=" + channel2 + "&parent=stream.feest.app&muted=true"
    // document.getElementById(chats[1]).src = "https://www.twitch.tv/embed/" + channel2 + "/chat?darkpopout&parent=stream.feest.app"

    $("#chat-1").on( 'load', function() {
        document.getElementById("switch-chat-wrapper").style.display = "inline"
    } );
    
    document.getElementById("current-chat").innerText = channels[0].toUpperCase()

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}


function switchChat() {
    chat = !chat
    document.getElementById(chats[+ chat]).style.display = "inline"
    document.getElementById(chats[+ !chat]).style.display = "none"

    document.getElementById("current-chat").innerText = channels[+ chat].toUpperCase()
}


function collapse() {
    document.querySelector('.chat').style.setProperty("display", "none")
    document.querySelector(':root').style.setProperty("--chat-width", "0%")
    document.getElementById("collapse").style.display = "none"
    document.getElementById("switch-chat-wrapper").style.display = "none"
    document.getElementById("expand").style.display = "block"
}


function expand() {
    document.querySelector('.chat').style.setProperty("display", "inline")
    document.querySelector(':root').style.setProperty("--chat-width", "20rem")
    document.getElementById("collapse").style.display = "inline"
    document.getElementById("switch-chat-wrapper").style.display = "inline"
    document.getElementById("expand").style.display = "none"
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


function toggleSecondStream() {
    if (!hidden) {
        hidden = true
        document.getElementById("toggle-icon").classList.remove("fa-video")
        document.getElementById("toggle-icon").classList.add("fa-video-slash")

        document.getElementById(streams[1]).style.display = "none"

        document.getElementById(streams[0]).style.width = "var(--full-width)"
        document.getElementById(streams[0]).style.height = "100%"

        if (layout === mode[2]) {
            document.querySelector(':root').style.setProperty("--offset", "0%")
        }
    } else {
        hidden = false
        document.getElementById("toggle-icon").classList.remove("fa-video-slash")
        document.getElementById("toggle-icon").classList.add("fa-video")

        document.getElementById(streams[1]).style.display = "inline"
        if (layout === mode[0]) {
            document.getElementById(streams[0]).style.width = "var(--half-width)"
            document.getElementById(streams[0]).style.height = "100%"
        } else if (layout === mode[1]) {
            document.getElementById(streams[0]).style.width = "var(--full-width)"
            document.getElementById(streams[0]).style.height = "50%"
        } else if (layout === mode[2]) {
            document.getElementById(streams[0]).style.width = "var(--full-width)"
            document.getElementById(streams[0]).style.height = "100%"

            document.querySelector(':root').style.setProperty("--offset", "var(--costream-height)")
        }
    }
    
}


function swapStreams() {
    if (hidden) {
        toggleSecondStream()
        toggleBack = true
    }

    temp = streams[0]
    streams[0] = streams[1]
    streams[1] = temp
    
    document.getElementById(streams[0]).style.top = "0%"
    document.getElementById(streams[0]).style.left = "0%"

    if (layout === mode[0]) {
        switchSideBySide()
    } else if (layout === mode[1]) {
        switchStacked()
    } else if (layout === mode[2]) {
        switchCostream()
    }

    if (toggleBack) {
        toggleSecondStream()
        toggleBack = false
    }
}


function switchSideBySide() {
    layout = mode[0]
    if (!hidden) {
        document.getElementById(streams[0]).style.width = "var(--half-width)"
        document.getElementById(streams[0]).style.height = "100%"
    }
    document.getElementById(streams[1]).style.width = "var(--half-width)"
    document.getElementById(streams[1]).style.height = "100%"
    document.getElementById(streams[1]).style.top = "0%"
    document.getElementById(streams[1]).style.left = "var(--half-width)"

    document.querySelector(':root').style.setProperty("--offset", "0%")
}


function switchStacked() {
    layout = mode[1]
    if (!hidden) {
        document.getElementById(streams[0]).style.width = "var(--full-width)"
        document.getElementById(streams[0]).style.height = "50%"
    }
    document.getElementById(streams[1]).style.width = "var(--full-width)"
    document.getElementById(streams[1]).style.height = "50%"
    document.getElementById(streams[1]).style.top = "50%"
    document.getElementById(streams[1]).style.left = "0%"

    document.querySelector(':root').style.setProperty("--offset", "0%")
}


function switchCostream() {
    layout = mode[2]
    document.getElementById(streams[0]).style.width = "var(--full-width)"
    document.getElementById(streams[0]).style.height = "100%"

    document.getElementById(streams[1]).style.width = "var(--chat-width)"
    document.getElementById(streams[1]).style.height = "var(--costream-height)"
    document.getElementById(streams[1]).style.top = "0%"
    document.getElementById(streams[1]).style.left = "var(--full-width)"

    if (!hidden) {
        document.querySelector(':root').style.setProperty("--offset", "var(--costream-height)")
    }
}