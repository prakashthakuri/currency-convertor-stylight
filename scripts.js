// Your JavaScript goes here.

const apikey='a97dd16b7c90bb148ead75d896132793' // Personl API
const apiurl = 'http://data.fixer.io/api/latest/'
// const endpoint = 'latest' --> the endpoint is integrated with apiurl because we donot have many options for endpoint based upon our api subscription

let amount = document.getElementById('amount')
let initialCurrency = document.getElementById('initialCurrency').value // This variable gets the currency you want to convert to.
let exchangeCurrency = document.getElementById('exchangeCurrency').value // this variable gets the value of the currency you want to convert to


let convert = document.getElementById("convert") // button

console.log(initialCurrency, exchangeCurrency)// was checking errors


//Here goes the Ajax Request
function AjaxAPI() {

    const request = new XMLHttpRequest()
    request.open('GET', apiurl+'?access_key='+apikey+'&base='+initialCurrency+'&symbols='+exchangeCurrency, true)
    request.setRequestHeader('Content-Type','application/x-www-form-urlencoded;')

        request.send()
    request.onload = function(){
    console.log(request)
}

}


// let convertedCurrency = amount * conversionrate

convert.addEventListener('click', request)