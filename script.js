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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

function cutRestaurantList(list) {
  console.log('fired cut list');
  const range = [...Array(5).keys()];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length -1);
    return list[index]
  })
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
  


  loadDataButton.addEventListener("click", async (submitEvent) => {
    // async has to be declared on every function that needs to "await" something

    console.log("load data");

    let result = await fetch("https://lldev.thespacedevs.com/2.2.0/astronaut/");
    // currentList = await results.json();

    const storedList = await result.json();
    localStorage.setItem('storedData', JSON.stringify(storedList));
    parsedData = storedList;



    if (parsedData?.length > 0) {
      generateListButton.classList.remove('hidden')
    };
    

    console.log("PD", parsedData)
    
  });

  chartLoadButton.addEventListener("click", (event) => {
    data = parsedData.results;
    pee = []
    data.forEach((item) => {
      const st = item.flights_count
      pee.push(st);
    });

    
    const counts = {};

    for (const num of pee) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    count = [counts[1], counts[2], counts[3], counts[4]]
    console.log('counts', counts);
    console.log(counts[1], counts[2], counts[3], counts[4]);
    initChart(count);

    console.log("PD", count);
  });
    
  textField.addEventListener('input', (event) => {
      console.log('input', event.target.value);

      const newList = filterList(parsedData, event.target.value);
      
      console.log('text', newList);
      injectHTML(newList);
  });

  generateListButton.addEventListener("click", (event) => {
    console.log("generate list", currentList);
    data = parsedData.results;
    currentList = cutRestaurantList(data)
    injectHTML(currentList);
  });

  
};


document.addEventListener("DOMContentLoaded", async () => mainEvent());
