const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const endpoint = 'https://api.exchangeratesapi.io/latest';
//cache object, where we are going to store the rates that we already asled for
const ratesByBase = {};

const currencies = {
	USD: 'United States Dollar',
	AUD: 'Australian Dollar',
	BGN: 'Bulgarian Lev',
	BRL: 'Brazilian Real',
	CAD: 'Canadian Dollar',
	CHF: 'Swiss Franc',
	CNY: 'Chinese Yuan',
	CZK: 'Czech Republic Koruna',
	DKK: 'Danish Krone',
	GBP: 'British Pound Sterling',
	HKD: 'Hong Kong Dollar',
	HRK: 'Croatian Kuna',
	HUF: 'Hungarian Forint',
	IDR: 'Indonesian Rupiah',
	ILS: 'Israeli New Sheqel',
	INR: 'Indian Rupee',
	JPY: 'Japanese Yen',
	KRW: 'South Korean Won',
	MXN: 'Mexican Peso',
	MYR: 'Malaysian Ringgit',
	NOK: 'Norwegian Krone',
	NZD: 'New Zealand Dollar',
	PHP: 'Philippine Peso',
	PLN: 'Polish Zloty',
	RON: 'Romanian Leu',
	RUB: 'Russian Ruble',
	SEK: 'Swedish Krona',
	SGD: 'Singapore Dollar',
	THB: 'Thai Baht',
	TRY: 'Turkish Lira',
	ZAR: 'South African Rand',
	EUR: 'Euro',
};

function generateOptions(options) {
	return Object.entries(options).map(([currencyCode, currencyName]) => {
		//we destructure the array straight up in the parameter definition
		return `
			<option value="${currencyCode}">
				${currencyCode} - ${currencyName}
			</option>
		`;
	})
	.join('');
}

async function fetchRates(base = 'USD') {
	const res = await fetch(`${endpoint}?base=${base}`);
	const rates = await res.json();
	return rates;
}

async function convert(amount, from, to) {
	//first check if we have the rates to convert from that currency
	if (!ratesByBase[from]) {
		console.log(`Oh no we don't have ${from} to convert to ${to}.Let's get it`);
		const rates = await fetchRates(from);
		console.log(rates);
		//store them for next time! if CAD, store them to 'ratesByBase.CAD'
		ratesByBase[from] = rates;
	}
	//convert the amount that they passed it
	const rate = ratesByBase[from].rates[to];
	const convertedAmount = rate * amount;
	console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
	return convertedAmount;
}

const optionsHtml = generateOptions(currencies);
fromSelect.innerHTML = optionsHtml;
toSelect.innerHTML = optionsHtml;

function formatCurrency(amount, currency) {
	return Intl.NumberFormat('en-US', {
		style:'currency',
		currency,
	}).format(amount);
}

async function handleInput(e) {
	const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);
	console.log(rawAmount);
	toEl.textContent = formatCurrency(rawAmount, toSelect.value);
}

form.addEventListener('input', handleInput);