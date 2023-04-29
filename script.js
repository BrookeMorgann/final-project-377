function initChart(lit) {
  const ctx = document.getElementById('myChart');
  console.log("p", lit)
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [1, 2, 3, 4],
      datasets: [{
        label: '# of Votes',
        data: lit,
        borderWidth: 1
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  return myChart;
};
 
function isNull(value) {
    return value > 0; 
};

function injectHTML(list) {
  console.log("injected HTML");
  const target = document.querySelector("#people_list");
  target.innerHTML = "";
  list.forEach((item) => {
    const str = `<table>
    <tr><td><b>${item.name}:</b></td><td>${item.nationality}</td></tr>
    <tr><td>Flight Count: ${item.flights_count}</td>
    <td>Landings Count: ${item.landings_count}</td></tr>
     </table>`;
    target.innerHTML += str;
  });
};

function filterList(list, query) {
  a = list.results
  console.log(a)
  return a.filter((item) => {
    const lowerCaseName = item.nationality.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });  
  
};

let currentList = [];
let flightList = [];
let landList = [];

async function mainEvent() {
  const mainForm = document.querySelector(".main_form");
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector("#generate");
  const chartLoadButton = document.querySelector("#flights_load");
  const textField = document.querySelector('#astro');

   // this is "scoped" to the main event function

loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something

  console.log("load data");

  let results = await fetch("https://lldev.thespacedevs.com/2.2.0/astronaut/");
  currentList = await results.json();

  storedData = JSON.stringify(currentList);
  parsedData = JSON.parse(storedData);
  

  console.log("PD", parsedData)

  // parsedData.forEach((item) => {
  //   flightList.push(item.flights_count)
  //   landList.push(item.landings_count)
  // });

  // console.log(flightList);
  // console.log(landList);

    
  });

  chartLoadButton.addEventListener("click", (event) => {
    data = parsedData.results;
    pee = []
    data.forEach((item) => {
      const st = item.flights_count
      pee += st;
    });

    initChart(pee);

    console.log("PD", pee);
  });
    
  textField.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);
  })

  generateListButton.addEventListener("click", (event) => {
    console.log("generate list");
    data = parsedData.results;
    injectHTML(data);
  });


  
};


document.addEventListener("DOMContentLoaded", async () => mainEvent());
