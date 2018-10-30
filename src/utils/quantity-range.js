export function quantityRange(min, max) {
	const quantity = [];
	for (let i = min; i <= max; i++) {
		quantity.push({
			value: i,
			label: i
		});
	}
	return quantity;
}

