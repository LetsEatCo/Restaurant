export function quantityRange() {
	const quantity = [];
	for (let i = 1; i <= 50; i++) {
		quantity.push({
			value: i,
			label: i
		});
	}
	return quantity;
}

