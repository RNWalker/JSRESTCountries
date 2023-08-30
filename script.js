let globalVariable =[];
const enterButton = document.querySelector("#enter");
const userInput = document.querySelector("#user-input");

// 1. fetch request to RESTCountries and return Json
const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const jsonData = await response.json();
    return jsonData;
}

// 3. add name and population to <ul> and call within setUp() function
const allCountries = () => {
    const countryList = document.querySelector("ul");
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
enterButton.addEventListener('click', () => {
    const inputValue = userInput.value;
    console.log(inputValue);
});



// call function on loading of webpage
setUp();
