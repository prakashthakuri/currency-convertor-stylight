// Your JavaScript goes here.

// Prakash Shahi Thakuri
// Email: info@prakashthakuri.com
// Stylight

const apikey = "a97dd16b7c90bb148ead75d896132793"; // My Personal API KEY
const apiurl = "http://data.fixer.io/api/latest/"; // Api URL with its endpoint(latest)

let convert = document.getElementById("convert"); // button
let history = document.getElementById("history");
const resultDiv = document.getElementById("result-div");
 //DIv Toogle
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
  var convertedAmount = conversion(
    amount,
    currency_val[initialCurrency],
    currency_val[exchangeCurrency]
  );

  console.log(amount, convertedAmount);

  //Displaying the result
  const result =
    initialCurrency +
    " " +
    amount +
    "<br/> is equivlent to<br/> <strong>" +
    exchangeCurrency +
    " " +
    convertedAmount +
    "</strong>";

  //Getting the TimeStamp for the history
  console.log(responseData.timestamp);
  var newDate = new Date(responseData.timestamp * 1000); //converting timestamp to millisecond and initializing new Date object
  var year = newDate.getFullYear();
  var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  var date = ("0" + newDate.getDate()).slice(-2);
  var hours = ("0" + newDate.getHours()).slice(-2);
  var minutes = ("0" + newDate.getMinutes()).slice(-2);
  var seconds = ("0" + newDate.getSeconds()).slice(-2);
  var date =
    year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  console.log(date);

  if (amount == "") {
    document.getElementById("result").innerHTML =
      "Please enter the amount greater than 0.1"; // error message if the amount is 0 or null
  } else {
    document.getElementById("result").innerHTML = result; //Rendering the Converted Amount

    document.getElementById("date").innerHTML = "<br>as of <br> " + date; // Rendering date
    document.getElementById("conv").innerHTML =
      initialCurrency + " to " + exchangeCurrency + " Conversion";
    localStorage();
  }
}
function localStorage() {
  //Storage using localStorage
  const key = amount;
  const value = convertedAmount;
  console.log(key, value);
  if (key && value) {
    localStorage.setItem(key, value);

    for (let i = 0; i < 10; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      history.innerHTML += `${initialCurrency} ${key} is equivalent to ${exchangeCurrency} ${value} <br/>`;
    }
  }
}
// Mathematical Conversion of the currency

function conversion(amount, initial, exchange) {
  return (exchange / initial) * amount;
}

function AxiosAPI() {
  let amount = document.getElementById("amount").value;
  let initialCurrency = document.getElementById("initialCurrency").value; // This variable gets the currency you want to convert to.
  let exchangeCurrency = document.getElementById("exchangeCurrency").value; // this variable gets the value of the currency you want to convert to
  if(resultDiv.style.display == "none") {
    resultDiv.style.display ='block';
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
