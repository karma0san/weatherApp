window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureLocation = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = proxy + 'https://api.darksky.net/forecast/17a8eae8cc9ccd5bb10a06a80cc41fe4/' + lat + ',' + lon;
            //console.log(api);

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    temperatureLocation.textContent = data.timezone;
                    
                    //set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //
                    changeDegree(temperature);
                })
        });
    } else {
        h1.textContent = "Please enable location check";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function changeDegree(degree) {
        temperatureDegree.addEventListener('click', () => {
            if(temperatureSpan.textContent === "`F") {
                temperatureSpan.textContent = "`C";
                temperatureDegree.textContent = Math.floor((degree - 32) * (5/9));
            } else {
                temperatureSpan.textContent = "`F";
                temperatureDegree.textContent = Math.floor(degree);
            }
        })
    }
});