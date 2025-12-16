let value = "";


let fromCurrency = "EUR";
let toCurrency = "INR";
let rate = 0;


const fromAmountEl = document.getElementById("fromAmount");
const toAmountEl = document.getElementById("toAmount");
const rateTextEl = document.querySelector(".rate");

const fromSelect = document.getElementById("fromSelect");
const toSelect = document.getElementById("toSelect");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");


async function loadRate() {
    try {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await fetch(url);
        const data = await res.json();

        rate = data.rates[toCurrency];
        updateRateText();
        update();
    } catch (err) {
        rateTextEl.innerText = "Error loading rate";
    }
}


function updateRateText() {
    rateTextEl.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
}


function update() {
    const send = value || "0";
    const receive = value ? (Number(value) * rate).toFixed(2) : "0";

    fromAmountEl.innerText = send;
    toAmountEl.innerText = receive;
}


function press(key) {
    if (key === "del") {
        value = value.slice(0, -1);
    } else if (key === "clear") {
        value = "";
    } else {
        if (value.length < 12) value += key;
    }
    update();
}


function changeCurrency() {
    fromCurrency = fromSelect.value;
    toCurrency = toSelect.value;

    fromFlag.src = `https://flagcdn.com/w40/${currencyToFlag(fromCurrency)}.png`;
    toFlag.src = `https://flagcdn.com/w40/${currencyToFlag(toCurrency)}.png`;

    loadRate();
}

function currencyToFlag(code) {
    const map = {
        USD: "us",
        EUR: "eu",
        GBP: "gb",
        INR: "in",
        RUB: "ru",
        JPY: "jp",
        CNY: "cn",
        CHF: "ch",
        CAD: "ca",
        AUD: "au",
        TRY: "tr",
        KRW: "kr",
        SGD: "sg",
        BRL: "br",
        ZAR: "za",
        KZT: "kz",
        KGS: "kg",
        MXN: "mx"
    };
    return map[code] || "eu";
}

loadRate();
