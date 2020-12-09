// Your JavaScript goes here.

// Prakash Shahi Thakuri
// Email: info@prakashthakuri.com
// Stylight

const apikey = "a97dd16b7c90bb148ead75d896132793"; // My Personal API KEY
const apiurl = "http://data.fixer.io/api/latest/"; // Api URL with its endpoint(latest)

let convert = document.getElementById("convert"); // button
let history = document.getElementById("history");
const resultDiv = document.getElementById("result-div");
// let convertedAmount, amount // this is a global variable (checking for localstorage)

//RESULT DIV Hide for Toogle
resultDiv.style.display = "none";

//responsedate is the value fetched from axios, amount is the value input by the user,
//initial currencya and exchange currency is the exchange currency desired by the user
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

  console.log(amount, convertedAmount);

  //Displaying the result
  const result = `${initialCurrency} ${amount} <br> is equivalent to <br/> <b> ${exchangeCurrency} ${convertedAmount} </b>`;

  //Getting the TimeStamp for the history
  console.log(responseData.timestamp);
  var newDate = new Date(responseData.timestamp * 1000); //converting timestamp to millisecond and initializing new Date object
  var year = newDate.getFullYear();
  var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  var date = ("0" + newDate.getDate()).slice(-2);
  var hours = ("0" + newDate.getHours()).slice(-2);
  var minutes = ("0" + newDate.getMinutes()).slice(-2);
  var seconds = ("0" + newDate.getSeconds()).slice(-2);
  var date = `${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`;
  console.log(date);

  if (amount == "") {
    document.getElementById("result").innerHTML =
      "Please enter the amount greater than 0.1"; // error message if the amount is 0 or null
  } else {
    document.getElementById("result").innerHTML = result; //Rendering the Converted Amount

    document.getElementById("date").innerHTML = `<br> as of <br> ${date}`; // Rendering date
    document.getElementById(
      "conv"
    ).innerHTML = `${initialCurrency} to ${exchangeCurrency} Conversion `;
  }

  localStore(amount, convertedAmount, initialCurrency, exchangeCurrency, date);
}

// Mathematical Conversion of the currency

function conversion(amount, initial, exchange) {
  return (exchange / initial) * amount;
}

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

      getConversion(responseData, amount, initialCurrency, exchangeCurrency);
      // handle success
      //   console.log(response);
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
window.onload = localStore();

// Storing the converted histroy
function localStore(key, value, initialCurrency, exchangeCurrency, time) {
  console.log("this is working onload");
 
  console.log(key, value, initialCurrency, exchangeCurrency);

    if (key && value) {
      sessionStorage.setItem('amount', key);
      sessionStorage.setItem('value', value);
      sessionStorage.setItem('time', time)
      sessionStorage.setItem('initialCur', initialCurrency)
      sessionStorage.setItem('excCur', exchangeCurrency)
      
   }

  let rAmount = sessionStorage.getItem('amount')
  let rValue = sessionStorage.getItem('value')
  let rTime = sessionStorage.getItem('time')
  let rInit = sessionStorage.getItem('initialCur')
  let rExc = sessionStorage.getItem('excCur')
  
  let finalResult = `<ul><li>${rInit} ${rAmount} is equivalent to ${rExc} ${rValue} as of ${rTime} <br/></li></ul>`;
  console.log(finalResult);
  history.innerHTML += finalResult

}
