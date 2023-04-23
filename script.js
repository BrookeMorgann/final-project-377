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


    console.log("PD", parsedData);
  });

  generateListButton.addEventListener("click", (event) => {
    console.log("generate list");
    data = parsedData.items;
    injectHTML(national);
  });

  

}
document.addEventListener("DOMContentLoaded", async () => mainEvent());
