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
    shortenURL(url) {
        fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(url)}`,
            { method: 'GET' })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
    }
}

const WeatherAPI = {
    APIKEY: "<Your API key here>",
    kelvinToFahrenheit: (k) => ((k - 273.15) * (9 / 5) + 32), // convert to f
    getCurrentWeather() {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const lat = coords.latitude;
                const lon = coords.longitude;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.APIKEY}&units=imperial`,
                    { method: 'GET' })
                    .then(response => response.json())
                    .then((data) => {
                        data = { data, ...{ coords: null } }
                        let city = data.data.name
                        let forecast = data.data.main
                        document.querySelector("#weather").innerHTML = `The weather in <b>${city}</b> is currently <i>${forecast.feels_like}°F</i>`
                        //forecast.feels_like
                    })
            }, console.error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }
}


const RonQuotesAPI = {
    changeText: function(quotesArray) {
        document.querySelector("#ronQuotes").innerHTML = quotesArray.join("<br/><br/>")
    },
    getQuotes: function (numQuotes=1) {
        fetch(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${numQuotes}`,
            { method: 'GET' })
            .then(response => response.json())
            .then(this.changeText)
    },
    searchQuotes: function () {
        let searchTerms = document.querySelector("#ronSearchTerms").value
        if (!searchTerms) {
            return alert("Please enter something.")
        }
        fetch(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/search/${searchTerms}`,
            { method: 'GET' })
            .then(response => response.json())
            .then(this.changeText)
    }
}



window.onload = function () {
    RonQuotesAPI.getQuotes(1)
    API.getRandomDog()
    WeatherAPI.getCurrentWeather()
}