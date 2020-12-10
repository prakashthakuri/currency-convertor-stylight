// Your JavaScript goes here.

// Prakash Shahi Thakuri
// Email: info@prakashthakuri.com
// Stylight

const apikey = "a97dd16b7c90bb148ead75d896132793"; // My Personal API KEY
const apiurl = "http://data.fixer.io/api/latest/"; // Api URL with its endpoint(latest)

let convert = document.getElementById("convert"); // button
let history = document.getElementById("history");
const resultDiv = document.getElementById("result-div");

//RESULT DIV Hide for Toogle
resultDiv.style.display = "none";

//responsedate is the value fetched from axios, amount is the value input by the user,
//initial currency and exchange currency is the exchange currency desired by the user
function getConversion(responseData, amount, initialCurrency, exchangeCurrency) {
  //Mapping
  currency_val = {
    USD: responseData.rates.USD, //USD, EUR and JPY is piped to index.html to get the numeric conversion value from the API
    EUR: responseData.rates.EUR,
    JPY: responseData.rates.JPY,
  };

   //referencing
  let convertedAmount = conversion(
    amount,
    currency_val[initialCurrency],
    currency_val[exchangeCurrency]
  );

  // console.log(amount, convertedAmount);

  //Displaying the result
  const result = `${initialCurrency} ${amount} is equivalent to  <b> ${exchangeCurrency} ${convertedAmount} </b>`;

  //Getting the TimeStamp for the history
  date= getDate(responseData) //Calling date function

  if (amount == "") {
    document.getElementById("result").innerHTML =
      "Please enter the amount greater than 0.1"; // error message if the amount is 0 or null
  } else {
    document.getElementById("result").innerHTML = result; //Rendering the Converted Amount

    document.getElementById("date").innerHTML = `<br> as of <br> ${date}`; // Rendering date
    document.getElementById("conv").innerHTML = `${initialCurrency} to ${exchangeCurrency} Conversion `;
  }
  return convertedAmount;



}
// initializing getDate function to get the timestamp from the api and converting into the date and we have return it to the getConversion function
function getDate(responseData){
    //Getting the TimeStamp for the history
    // console.log(responseData.timestamp);
    var newDate = new Date(responseData.timestamp * 1000); //converting timestamp to millisecond and initializing new Date object
    var year = newDate.getFullYear();
    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var date = ("0" + newDate.getDate()).slice(-2);
    var hours = ("0" + newDate.getHours()).slice(-2);
    var minutes = ("0" + newDate.getMinutes()).slice(-2);
    var seconds = ("0" + newDate.getSeconds()).slice(-2);
    var date = `${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`;
    return date
}

//getStoredItem --> a sessionStorage function to get the variable which has been stored in  setStoredItem

function getStoredItem(){
  fResult = sessionStorage.getItem('key')
  if(fResult){
  history.innerHTML = fResult; // rendering 
  }    
}

//setStoredItem --> a sessionStorage function to set the variable into the localstorage which is called from the AxiosApi

function setStoredItem(amount, convertedAmount, initialCurrency, exchangeCurrency, date){
  let finalResult = `${initialCurrency} ${amount} is equivalent to ${exchangeCurrency} ${convertedAmount} as of ${date} <br> `; 
  // console.log(finalResult);
  sResult = sessionStorage.getItem('key'); // storeResult ---> we get this result from above function as a part of sessionStorage function of js
  if(sResult){
    sResult += finalResult;
  }else{
    sResult = finalResult;
  }
  sessionStorage.setItem('key', sResult)

}

// Mathematical Conversion of the currency

function conversion(amount, initial, exchange) {
  return (exchange / initial) * amount;
}

//API CALL

function AxiosAPI() {
  let amount = document.getElementById("amount").value;
  let initialCurrency = document.getElementById("initialCurrency").value; // This variable gets the currency you want to convert to.
  let exchangeCurrency = document.getElementById("exchangeCurrency").value; // this variable gets the value of the currency you want to convert to
  if (resultDiv.style.display == "none") {
    resultDiv.style.display = "block";
  }

  axios
    .get(
      "http://data.fixer.io/api/latest?access_key=" +
        apikey +
        "&base=EUR&symbols=USD, EUR, JPY"
    )
    .then(function (response) {
      //   console.log(response);

      responseData = response.data;

    convertedAmount = getConversion(responseData, amount, initialCurrency, exchangeCurrency);
    console.log('Converted Amount:', convertedAmount)
      // handle success
      //   console.log(response);
      date = getDate(responseData);
      setStoredItem(amount, convertedAmount, initialCurrency, exchangeCurrency, date);
      getStoredItem()
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

convert.addEventListener("click", AxiosAPI);
getStoredItem() // this function is called on onload because if you are refreshing the page you can see your previous conversion