// Your JavaScript goes here.
const apikey = API_KEY;
const apiurl = "http://data.fixer.io/api/latest/";
// const endpoint = 'latest' --> the endpoint is integrated with apiurl because we donot have many options for endpoint based upon our api subscription

console.log(apikey)
let convert = document.getElementById("convert"); // button

const request = new XMLHttpRequest();
var responseData  = 1
//Here goes the Ajax Request

function getConversion(responseData, amount, initialCurrency, exchangeCurrency){
    currency_val = {
        "USD": responseData.rates.USD,
        "EUR": responseData.rates.EUR,
        "JPY": responseData.rates.JPY
    }
     var new_amount = conversion(amount, currency_val[initialCurrency], currency_val[exchangeCurrency])
    console.log(new_amount)
    console.log(responseData.date)
    console.log(responseData)
    console.log(responseData.timestamp)

}

function conversion(amount, initial, exchange){
    return (exchange/initial) * amount;
    }

function AjaxAPI() {
    let amount = document.getElementById("amount").value;
    let initialCurrency = document.getElementById("initialCurrency").value; // This variable gets the currency you want to convert to.
    let exchangeCurrency = document.getElementById("exchangeCurrency").value; // this variable gets the value of the currency you want to convert to



//   const request = new XMLHttpRequest();

// axios.get('"http://data.fixer.io/api/latest?access_key="+apikey+"&base=EUR&symbols=USD, EUR, JPY"')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
  request.open(
    "GET",
    "http://data.fixer.io/api/latest?access_key="+apikey+"&base=EUR&symbols=USD, EUR, JPY",
    true
  );
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");

  request.send();
  request.onload = function () {
  
    responseData =JSON.parse(this.responseText);
    getConversion(responseData, amount, initialCurrency, exchangeCurrency)
  };
//   return request.responseText
// console.log(JSON.parse(request.responseText));
}



// AjaxAPI()


convert.addEventListener("click", AjaxAPI);
console.log(responseData)
// console.log(responseData.rates.USD)





// 1 IC  = 1.6 NPR
//

// 1 NPR = 1/1.6

// 1 EUR = 1.21 USD = 126.15 
// 1 EUR /

// AMTUSD = (1/1.21) * AMT
// AMTJPY = (126.15/1.21) * AMT

