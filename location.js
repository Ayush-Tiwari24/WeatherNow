navigator.geolocation.getCurrentPosition(success, error);

function success(position){

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "7c49ac95fc82605c796707d9c2a1af41";

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.address)
        document.querySelector(".city").textContent = data.address.city+","+data.address.state_district+","+data.address.state;
    });


    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res=>res.json())
    .then(data=>{


        document.querySelector(".country").textContent = data.sys.country;

        document.querySelector(".lat").textContent = lat.toFixed(4);

        document.querySelector(".lon").textContent = lon.toFixed(4);

        document.getElementById("map").src =
        `https://www.google.com/maps?q=${lat},${lon}&z=12&output=embed`;


        const timezone = data.timezone;
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

        let cityTime = new Date(utc + timezone * 1000);

        const hour = cityTime.getHours();
        if (hour >= 5 && hour < 11) {

            document.body.style.backgroundImage =
                "url('sunrise.jpeg')";

        }
        else if (hour >= 11 && hour < 17) {

            document.body.style.backgroundImage =
                "url('wallpaper-edited.jpeg')";

        }
        else if (hour >= 17 && hour < 20) {

            document.body.style.backgroundImage =
                "url('sunset.jpeg')";

        }
        else {

            document.body.style.backgroundImage =
                "url('https://wallpaperaccess.com/full/941788.jpg')";

        }
    });

}

function error(){

    alert("Location permission denied.");

}