function youtube(id) {
    if (!document.getElementById("video-input-" + id)) {
      newElement = document.createElement("input")
      newElement.type = "text"
      newElement.classList = "form-control mt-3"
      newElement.id = "video-input-" + id
      newElement.name = "yt-" + id
      newElement.placeholder = "Video ID"
      newElement.required = true

      document.getElementById(id).appendChild(newElement)

      document.getElementById("channel-input-" + id).remove();
    }

    document.getElementById("stream-" + id + "-option-1").checked = false
    document.getElementById("stream-" + id + "-option-2").checked = true
  }

  function twitch(id) {
    if (document.getElementById("video-input-" + id)) {
      newElement = document.createElement("input")
      newElement.type = "text"
      newElement.classList = "form-control mt-3"
      newElement.id = "channel-input-" + id
      newElement.name = "tw-" + id
      newElement.placeholder = "Channel Name"
      newElement.required = true

      document.getElementById(id).appendChild(newElement)

      document.getElementById("video-input-" + id).remove()
    }

    document.getElementById("stream-" + id + "-option-1").checked = true
    document.getElementById("stream-" + id + "-option-2").checked = false
  }