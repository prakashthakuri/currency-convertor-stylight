// Your JavaScript goes here.

// Prakash Shahi Thakuri 
// Email: info@prakashthakuri.com
// Stylight

const apikey = 'a97dd16b7c90bb148ead75d896132793'; // My Personal API KEY
const apiurl = "http://data.fixer.io/api/latest/"; // Api URL with its endpoint(latest)

let convert = document.getElementById("convert"); // button

// const request = new XMLHttpRequest();

function getConversion(responseData, amount, initialCurrency, exchangeCurrency) {
  currency_val = {
    USD: responseData.rates.USD,
    EUR: responseData.rates.EUR,
    JPY: responseData.rates.JPY,
  };
  var new_amount = conversion(
    amount,
    currency_val[initialCurrency],
    currency_val[exchangeCurrency]
  );

  console.log(amount, new_amount)

 
  

  console.log(responseData.timestamp);
  var newDate = new Date(responseData.timestamp * 1000) //converting timestamp to millisecond and initializing new Date object
  var year = newDate.getFullYear()
  var month = ('0'+(newDate.getMonth() + 1)).slice(-2)
  var date =('0'+newDate.getDate()).slice(-2)
  var hours = ('0' + newDate.getHours()).slice(-2)
  var minutes = ('0' + newDate.getMinutes()).slice(-2)
  var seconds = ('0' + newDate.getSeconds()).slice(-2)
  var newUpdate =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  console.log(newUpdate)
}

function conversion(amount, initial, exchange) {
  return (exchange / initial) * amount;
}

function AxiosAPI() {
  let amount = document.getElementById("amount").value;
  let initialCurrency = document.getElementById("initialCurrency").value; // This variable gets the currency you want to convert to.
  let exchangeCurrency = document.getElementById("exchangeCurrency").value; // this variable gets the value of the currency you want to convert to


  axios
    .get(
      "http://data.fixer.io/api/latest?access_key="+apikey+"&base=EUR&symbols=USD, EUR, JPY"
    )
    .then(function (response) {
    //   console.log(response);
    //   console.log(response.data);

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
