const apiKey = '945fade0525ea34ae8cc71df8eeb2226';


// fetch(apiUrl)
//     .then(response => {
//         if(!response.ok) {
//             throw new Error('Could not fetch response')
//         }
//         return response.json()
//     })
//     .then(data => console.log(data.main.temp))
//     .catch(error => console.error(error))

const button = document.getElementById('submit');
button.addEventListener('click', fetchData)


async function fetchData() {
    try{
        let cityname = document.getElementById('text').value;
        let parsedCityName = cityname.replace(' ', '%20')
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${parsedCityName}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Could not fetch resource')
        }
        // this data loads the json file. It is an object full of data that you can access
        const data = await response.json();
        console.log(data);
        let feelsLike = kelvinToFahrenheit(data.main.feels_like);
        let temperature = kelvinToFahrenheit(data.main.temp);
        let location = data.name;
        let humidity = data.main.humidity;
        document.getElementById('feels').innerHTML = `${feelsLike}&deg;`
        document.getElementById('output-container').style.display = 'flex'
        document.getElementById('location').innerHTML = `${location}`
        document.getElementById('temperature').innerHTML = `${temperature}&deg;`
        document.getElementById('humidity').innerHTML = `${humidity}%`
    }
    catch(error){
        console.log(error)
    }
}


function kelvinToFahrenheit(temp) {
    newtemp = Math.round(((temp - 273.15) * (9/5) + 32))
    
    return newtemp
}