// Your JavaScript goes here.

const apikey='a97dd16b7c90bb148ead75d896132793'
const apiEndPoint = 'http://data.fixer.io/api/'
const amount = document.querySelector(".amount");
const intialCurrency = document.querySelector(".initialCurrency");
const exhchangeCurrency = document.querySelector(".exchangeCurrency");
const convert = document.querySelector(".convert")

const fetchCurrency = () => {
    axios.get(apiEndPoint).then(response => {
        console.log(response)
    })
}

convert.addEventListener('click', fetchCurrency)