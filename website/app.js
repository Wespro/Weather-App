// Personal API Key for OpenWeatherMap API
const apiKey = 'f3f1f9837bd563f20d047c3f9859c0c7';

/* Global Variables */
const generate = document.querySelector('#generate');


const content = document.querySelector('#content');
const tempreture = document.querySelector('#temp');
const date = document.querySelector('#date');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

 // get temp by fetch  from weather api
 const tempWeather= []

async function getTmep(url) {
  const allData = await fetch(url);
  const allDataJson= await allData.json();
  // accses tempreture all data coming from the weather api
 const temp = await allDataJson.main.temp;
 tempWeather.push(temp);
try{
  postData ('/postData', {
    date: newDate,
    temp: temp,
    feelings: feelings
  });
}catch(err){
  console.log('erorr '+ err)
}
 }


//postData to server-side
async function postData(url = '', data = {}) {

      const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      try {
        const dataPosted = await res.json(data)
        console.log( 'post sucsess' + dataPosted);

        getDataOpject('/getData')

      } catch (err) {
        console.log(" post error " + err);
      }
    }

     // get Data Opject from server with all data gathered
      async function getDataOpject (url) {
        const dataOpject = await fetch(url);
        try {
          const dataOpjectJson = await dataOpject.json();
          console.log(dataOpjectJson);

        } catch (err) {
          console.log(" Data opject error" + err);
        }
      }

//addEventListner to Generate and updating UI
      generate.addEventListener('click',  async function(e) {
        let zipCode = document.querySelector('#zip').value;
        let feelings = document.querySelector('#feelings').value;
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid='+apiKey+'&units=imperial';

!zipCode||!feelings ? alert('please enter the zipcode and your feeling about the weather.') : console.log("sucsess");

await getTmep(baseUrl);

//Updating UI
  tempreture.innerHTML = "Temp: " + tempWeather[tempWeather.length-1];
   date.innerHTML = "Date: " +  newDate;
  content.innerHTML = "feelling: " + feelings;



      });
