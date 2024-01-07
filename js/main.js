"use strict";

const API_KEY = "23bd4857c8094d1da27133658240701";
const inputElement = document.getElementById("search");

function getAllNews() {
  const inputElementValue = inputElement.value;

  if (inputElementValue.length >= 3) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputElementValue}&days=3`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }
        return response.json();
      })
      .then((finalResult) => {
        console.log(finalResult);
        updateUI(finalResult);
        document.getElementById("find").classList.replace("d-block", "d-none");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error.message);
      });
  } else {
    document.getElementById("find").classList.replace("d-none", "d-block");
  }
}

function updateUI(finalResult) {
  const {
    location,
    current,
    forecast: { forecastday },
  } = finalResult;

  const dateElement = document.getElementById("date");
  const dayElement = document.getElementById("day");
  const dayElement2 = document.getElementById("day1");
  const dayElement3 = document.getElementById("day2");
  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");
  const wind_Element = document.getElementById("windElement");
  const iconDay1 = document.getElementById("icon-day1");
  const maxTemp = document.getElementById("max_temp2");
  const minTemp = document.getElementById("min_temp2");
  const img_tow = document.getElementById("img_tow");
  const sun_ele = document.getElementById("sun-ele");
  const maxTemp3 = document.getElementById("max-temp-day3");
  const minTemp3 = document.getElementById("min-temp-day3");
  const img_tow3 = document.getElementById("img-day");
  const sun_ele3 = document.getElementById("day3-sun");

  locationElement.textContent = location.name;
  temperatureElement.textContent = `${current.temp_c}°C`;
  iconDay1.src = current.condition.icon;
  wind_Element.textContent = current.condition.text;

  getFormattedDay(forecastday, dateElement, dayElement, 0);
  getFormattedDay(forecastday, null, dayElement2, 1);
  getFormattedDay(forecastday, null, dayElement3, 2);

  getTwoDay(forecastday, maxTemp, minTemp, img_tow, sun_ele, 1);
  getThreeDay(forecastday, maxTemp3, minTemp3, img_tow3, sun_ele3, 2);
}

function getFormattedDay(forecast, dateElement, dayElement, index) {
  const element = forecast[index];
  const date = new Date(element.date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  if (dateElement) {
    dateElement.textContent = `${month} ${year}`;
  }
  if (dayElement) {
    dayElement.textContent = day;
  }
}

function getTwoDay(forecast, maxTemp, minTemp, img_tow, sun_ele, index) {
  const maxAndMinTemp = forecast[index].day;

  if (img_tow) {
    img_tow.src = maxAndMinTemp.condition.icon;
  }
  if (maxTemp) {
    maxTemp.textContent = `${maxAndMinTemp.maxtemp_c}°C`;
  }
  if (minTemp) {
    minTemp.textContent = `${maxAndMinTemp.mintemp_c}°C`;
  }
  if (sun_ele) {
    sun_ele.textContent = maxAndMinTemp.condition.text;
  }
}

function getThreeDay(forecast, maxTemp3, minTemp3, img_tow3, sun_ele3, index) {
  const maxAndMinTemp = forecast[index].day;

  if (img_tow3) {
    img_tow3.src = maxAndMinTemp.condition.icon;
  }
  if (maxTemp3) {
    maxTemp3.textContent = `${maxAndMinTemp.maxtemp_c}°C`;
  }
  if (minTemp3) {
    minTemp3.textContent = `${maxAndMinTemp.mintemp_c}°C`;
  }
  if (sun_ele3) {
    sun_ele3.textContent = maxAndMinTemp.condition.text;
  }
}
