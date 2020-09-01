//lib contains the core functionality of our project

const endpoint = 'https://api.exchangeratesapi.io/latest';
//cache object, where we are going to store the rates that we already asled for
const ratesByBase = {};

export async function fetchRates(base = 'USD') {
	const res = await fetch(`${endpoint}?base=${base}`);
	const rates = await res.json();
	return rates;
}

export async function convert(amount, from, to) {
	//first check if we have the rates to convert from that currency
	//CACHE MISS
	if (!ratesByBase[from]) {
		console.log(`Oh no we don't have ${from} to convert to ${to}.Let's get it`);
		const rates = await fetchRates(from);
		console.log(rates);
		//store them for next time! if CAD, store them to 'ratesByBase.CAD'
		ratesByBase[from] = rates;
	}
	//convert the amount that they passed it
	//CACHE HIT
	const rate = ratesByBase[from].rates[to];
	const convertedAmount = rate * amount;
	console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
	return convertedAmount;
}
