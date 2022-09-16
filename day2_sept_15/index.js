// API wrapper

const API = {
    getRandomDog() {
        var dogButton = document.querySelector("#dogStatus")
        dogButton.innerHTML = "Getting dog now."
        fetch("https://random.dog/woof.json").then((response) => {
            dogButton.innerHTML = "Received dog"
            return response.json()
        }).then(function (data) {

            const dog = data.url // link to the video or picture
            const isVideo = dog.split('.').pop() == "mp4"
            // <iframe class="embed-responsive-item" src="..."></iframe>
            document.querySelector("#dog").setAttribute("src", dog)
            dogButton.innerHTML = "Get a new dog."
            // TODO: make images & videos scale better on the html canvas
        })
    },
}


window.onload = function () {
    API.getRandomDog()
}