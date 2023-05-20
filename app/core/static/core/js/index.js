function option1(id) {
  document.getElementById("input-" + id).remove()
  newElement = document.createElement("input")
  newElement.type = "text"
  newElement.classList = "form-control mt-3"
  newElement.id = "input-" + id
  newElement.name = "tw-" + id
  newElement.placeholder = "Channel Name"
  newElement.required = true

  document.getElementById(id).appendChild(newElement)

  document.getElementById("stream-" + id + "-option-1").checked = true
  document.getElementById("stream-" + id + "-option-2").checked = false
  document.getElementById("stream-" + id + "-option-3").checked = false
}

function option2(id) {
  document.getElementById("input-" + id).remove();
  newElement = document.createElement("input")
  newElement.type = "text"
  newElement.classList = "form-control mt-3"
  newElement.id = "input-" + id
  newElement.name = "yt-" + id
  newElement.placeholder = "Video ID"
  newElement.required = true

  document.getElementById(id).appendChild(newElement)

  document.getElementById("stream-" + id + "-option-1").checked = false
  document.getElementById("stream-" + id + "-option-2").checked = true
  document.getElementById("stream-" + id + "-option-3").checked = false
}

function option3(id) {
  document.getElementById("input-" + id).remove()
  newElement = document.createElement("input")
  newElement.type = "text"
  newElement.classList = "form-control mt-3"
  newElement.id = "input-" + id
  newElement.name = "tw-vod-" + id
  newElement.placeholder = "Video ID"
  newElement.required = true

  document.getElementById(id).appendChild(newElement)

  document.getElementById("stream-" + id + "-option-1").checked = false
  document.getElementById("stream-" + id + "-option-2").checked = false
  document.getElementById("stream-" + id + "-option-3").checked = true
}
  