function initChart(lit) {
  const ctx = document.getElementById("myChart");
  console.log("p", lit);
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [1, 2, 3, 4],
      datasets: [
        {
          label: "# of Astronauts",
          data: lit,
          borderWidth: 1,
          backgroundColor: "rgb(104, 50, 87, 0.9)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Flight Count",
            font: {
              family: "Times",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
        },
        y: {
          beginAtZero: true,
          display: true,
          title: {
            display: true,
            text: "# of People",
            font: {
              family: "Times",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 },
          },
        },
      },
    },
  });
  return myChart;
}
function initLine() {
  const ctx = document.getElementById("myLine");
  console.log("p", lit);
  const myLine = new Chart(ctx, {
    type: "line",
    data: {
      labels: [1, 50, 100],
      datasets: [
        {
          label: "Age",
          data: [32, 45, 77],
          borderWidth: 1,
          backgroundColor: "rgb(104, 50, 87, 0.9)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Flight Count",
            font: {
              family: "Times",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
        },
        y: {
          beginAtZero: true,
          display: true,
          title: {
            display: true,
            text: "# of People",
            font: {
              family: "Times",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 },
          },
        },
      },
    },
  });
  return myLine;
}
}

function isNull(value) {
  return value > 0;
}

function injectHTML(list) {
  console.log("injected HTML");
  const target = document.querySelector("#people_list");
  target.innerHTML = "";
  let str = `<table>
              <thead>
                <th>Name</th>
                <th>Nationality</th>
                <th>Flights</th>
                <th>Landings</th>
              </thead>`
  list.forEach((item) => {
    str += `<tr>
    <td scope="row"><b>${item.name}</b></td>
    <td>${item.nationality}</td>
    <td><b>${item.flights_count}</b></td>
    <td>${item.landings_count}</td>
    </tr>`;
  });
  str += `</table>`;
  target.innerHTML = target.innerHTML + str;
}

function filterList(list, query) {
  a = list.results;
  console.log(a);
  return a.filter((item) => {
    const lowerCaseName = item.nationality.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function cutRestaurantList(list) {
  console.log("fired cut list");
  const range = [...Array(10).keys()];
  return (newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  }));
}

let currentList = [];
let flightList = [];
let landList = [];

async function mainEvent() {
  const mainForm = document.querySelector(".main_form");
  const generateListButton = document.querySelector("#generate");
  const chartLoadButton = document.querySelector("#flights_load");
  const textField = document.querySelector("#astro");

  //loadDataButton.addEventListener("click", async (submitEvent) => {
  // async has to be declared on every function that needs to "await" something

  console.log("load data");

  let result = await fetch("https://lldev.thespacedevs.com/2.2.0/astronaut/");
  // let result = await fetch("https://ll.thespacedevs.com/2.2.0/astronaut/");

  // currentList = await results.json();

  const storedList = await result.json();
  localStorage.setItem("storedData", JSON.stringify(storedList));
  parsedData = storedList;

  if (parsedData?.length > 0) {
    generateListButton.classList.remove("hidden");
  }

  console.log("PD", parsedData);

  //});

  //chartLoadButton.addEventListener("click", (event) => {
  data = parsedData.results;
  pee = [];
  data.forEach((item) => {
    const st = item.flights_count;
    pee.push(st);
  });

  const counts = {};

  for (const num of pee) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  count = [counts[1], counts[2], counts[3], counts[4]];
  console.log("counts", counts);
  console.log(counts[1], counts[2], counts[3], counts[4]);
  initChart(count);

  console.log("PD", count);
  //});

  textField.addEventListener("input", (event) => {
    console.log("input", event.target.value);

    const newList = filterList(parsedData, event.target.value);

    console.log("text", newList);
    injectHTML(newList);
  });

  //generateListButton.addEventListener("click", (event) => {
  console.log("generate list", currentList);
  data = parsedData.results;
  currentList = data;
  injectHTML(currentList);
  //});
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
