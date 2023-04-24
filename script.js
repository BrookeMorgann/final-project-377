
  const ctx = document.getElementById('myChart');

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Under 60in', 'Between 60 and 70in', 'Over 70in'],
      datasets: [{
        label: '# of Votes',
        data: chartArr,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

function isNull(value) {
    return value > 0; 
};

function greaterFive(val) {
    return val < 60;
}

function greaterSix(va) {
    return va < 70 && va > 59;
}

function greaterSeven(v) {
    return v > 69;
}

function injectHTML(list) {
  console.log("injected HTML");
  const target = document.querySelector(".people_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<table>${item}</table>`;
    target.innerHTML += str;
  });
}    

async function mainEvent() {
  const mainForm = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector("#generate");

  let currentList = []; // this is "scoped" to the main event function


  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something

    console.log("load data");

    let results = await fetch("https://api.fbi.gov/wanted/v1/list");
    currentList = await results.json();

    storedData = JSON.stringify(currentList);
    parsedData = JSON.parse(storedData);
    

    offenderSex = parsedData.items.map((x) => x.sex);
    placeOB = parsedData.items.map((x) => x.place_of_birth);
    national = parsedData.items.map((x) => x.nationality);
    height = parsedData.items.map((x) => x.height_max);
    newHeights = height.filter(isNull);

    five = newHeights.filter(greaterFive);
    six = newHeights.filter(greaterSix);
    seven = newHeights.filter(greaterSeven);

    chartArr = [five.length, six.length, seven.length]

    console.log("PD", chartArr);
  });

  generateListButton.addEventListener("click", (event) => {
    console.log("generate list");
    data = parsedData.items;
    injectHTML(six);
  });

  

}


document.addEventListener("DOMContentLoaded", async () => mainEvent());
