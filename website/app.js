const countryCode = 'in'
const WEATHER_API_KEY = "73410af64a167e19626588267c87ad69";
const weatherApi = `https://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&units=metric`;

function formatDate(date) {
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

function formatResponse(response) {
  if (response.status !== 200) 
    throw new Error(response);
  return response.json();
}

function validateZipCode() {
    const zip = document.getElementById("zip");
    if (!zip.value || isNaN(Number(zip.value))) {
      zip.classList.add("input-error");
      return false;
    }
    zip.classList.remove("input-error");
    return true;
  }

function getJournalData() {
  fetch("/data")
    .then(formatResponse)
    .then(populateJournalData);
}

function postJournalData(journalData) {
  fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalData),
  })
    .then(formatResponse)
    .then(populateJournalData);
}

function populateJournalData(journalData) {
    console.log(journalData);
    const entries = document.getElementById("entries");
    if (!journalData.length) return;
    journalData.forEach((item, index) => {
      if (document.getElementById(`${index}entry`)) return;
      const entryDiv = document.createElement("div");
      entryDiv.id = `${index}entry`;
      entryDiv.innerHTML = `
        <div id = "date">Date - ${formatDate(new Date(item.date))}</div>
        <div id = "temp">Temperature of the area - ${item.temp} Celsius</div>
        <div id = "content">Your Feeling - ${item.feelings}</div>
        <hr>
      `;
      entries.appendChild(entryDiv);
    });
  }
 
  function getWeatherData() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    fetch(`${weatherApi}&zip=${zip},${countryCode}`)
      .then(formatResponse)
      .then(data => {
        const weatherData = {
          temp: data.main.temp,
          date: new Date(),
          feelings,
        };
        postJournalData(weatherData);
      });
  }

document.getElementById("generate").addEventListener("click", e => {
  if (validateZipCode()) 
    getWeatherData();
});

getJournalData();
