let globalVariable =[];
const enterButton = document.querySelector("#enter");
const userInput = document.querySelector("#user-input");
const countryList = document.querySelector("ul");

// 1. fetch request to RESTCountries and return Json
// throw and catch errors
const fetchCountries = async () => {
    try{
    const response = await fetch("https://restcountries.com/v3.1/all")
   
    // use line below to test error handling works
    // const response = await fetch("https://restcountries.com/v3.1/nonexistentendpoint");
    
    if(!response.ok){
        throw new Error("failed to fetch API");
    }
    const jsonData = await response.json();
    return jsonData;
} catch (error) {
    console.error(error);
    return null;
}
};


//6. abstract function to cater to repeated functionality
const createCountryLi = (country) => {
    const countryLi = document.createElement("li");
    countryLi.textContent = `Name: ${country.name.common}, Population: ${country.population}`;
    return countryLi;
};


// 3. add name and population to <ul> and call within setUp() function
const allCountries = () => {
    globalVariable.forEach(country => {
        const countryLi = createCountryLi(country);
        countryList.appendChild(countryLi);
    });
};

// 2. create a setup function calling fetchCountries to populate global variable with the json data
const setUp = async () => {
    const heading = document.querySelector("#status-heading");
    const awaitingP = document.querySelector("#awaiting-api-p");

    // update the status of heading text and display message 
    heading.textContent = "Awaiting API...";
    awaitingP.style.display = "block";

    // introduces 1.5s delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    globalVariable = await fetchCountries();
    if(globalVariable !== null){
    allCountries();
    // update status heading 
    heading.textContent = "Countries loaded";
    } else {
    heading.textContent = "Error loading countries";
    }


    // hide "awaiting api... message"
    awaitingP.style.display = "none";

    setTimeout(() => {
        filterCountries(userInput.value); // Apply delay before initial filtering
    }, 1500); // Additional delay
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
            const filteredCountry = createCountryLi(country);
            countryList.appendChild(filteredCountry);
        }
        
    }
}

// call function on loading of webpage
setUp();
