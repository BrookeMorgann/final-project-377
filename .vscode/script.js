async function mainEvent() {
    const loadDataButton = document.querySelector('#data_load');

    let currentList = [];

    loadDataButton.addEventListener('click', async (submitEvent) =>{
        
        console.log('load data')

        let results = await fetch('https://api.fbi.gov/wanted/v1/list');

        currentList = await results.json();

        storedData = JSON.stringify(currentList);
        parsedData = JSON.parse(storedData);

        console.log('PD', parsedData)
    })
}
