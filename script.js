let globalVariable =[];
const enterButton = document.querySelector("#enter");
const userInput = document.querySelector("#user-input");
const countryList = document.querySelector("ul");

// 1. fetch request to RESTCountries and return Json
const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const jsonData = await response.json();
    return jsonData;
}

// 3. add name and population to <ul> and call within setUp() function
const allCountries = () => {
    globalVariable.forEach(country => {
        const countryLi = document.createElement("li");
        countryLi.textContent = `Name: ${country.name.common}, Population: ${country.population}`;
        countryList.appendChild(countryLi);
    });
};

// 2. create a setup function calling fetchCountries to populate global variable with the json data
const setUp = async () => {
    globalVariable = await fetchCountries();
    allCountries();
}

// 4. print value of input to the console
// enterButton.addEventListener('click', () => {
//     const inputValue = userInput.value;
//     console.log(inputValue);
// });

enterButton.addEventListener('click', () => filterCountries(userInput.value));

// 5. take in global variable and filters based off of input
const filterCountries = (filterValue) => {
    countryList.textContent = ""; 

    for (let i=0; i < globalVariable.length; i++){
        
        const country = globalVariable[i];
        
        if (country.name.common.toLowerCase().includes(filterValue.toLowerCase())){
            const filteredCountry = document.createElement("li");
            filteredCountry.textContent = `Name: ${country.name.common}, Population: ${country.population}`;
            countryList.appendChild(filteredCountry);
        }
        
    }
    return countryList;
}

// call function on loading of webpage
setUp();
