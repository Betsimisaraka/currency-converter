//named export

export function generateOptions(options) {
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

export function formatCurrency(amount, currency) {
	return Intl.NumberFormat('en-US', {
		style:'currency',
		currency,
	}).format(amount);
}