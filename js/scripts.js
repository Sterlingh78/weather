const date = new Date();

const todayDayNumber = date.getDay();

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const apiURL = "//api.openweathermap.org/data/2.5/forecast?id=5780557&appid=659af41dd0b3a0fd6e2beee053575ac9&units=imperial";

fetch(apiURL)
.then(response => response.json())
.then(weatherInfo => {
   console.log(weatherInfo);

   document.getElementById("name").textContent = weatherInfo.city.name;

   let myList = weatherInfo.list;
   let forecastDayNumber = todayDayNumber;

   for (i = 0; i < myList.length; i++) {
      let time = myList[i].dt_txt;
      
      if (time.includes("18:00:00")) {
         console.log("Found entry with 18:00:00 time. It was report "+i+"from the myList of 40");

         forecastDayNumber += 1;
         if (forecastDayNumber === 7) {
            forecastDayNumber = 0;
         }
         let theDayName = document.createElement("span");
         theDayName.textContent = weekday[forecastDayNumber];

         let theTemp = document.createElement("p");
         theTemp.textContent = weatherInfo.list[i].main.temp + "°";

         let iconCode = weatherInfo.list[i].weather[0].icon;
         let iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
         let theIcon = document.createElement("img");
         theIcon.src = iconPath;

         let theDay = document.createElement("div");
         theDay.appendChild(theDayName);
         theDay.appendChild(theTemp);
         theDay.appendChild(theIcon);

         document.getElementById("weatherForecast").appendChild(theDay);
      }
   }
})

