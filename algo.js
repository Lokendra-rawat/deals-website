function maxStockPrice (priceArr){
	var maxProfit = -1;
	var buyPrice = 0;
	var sellPrice = 0;

	var changeBuyPrice = true;

	for (var i = 0; i < priceArr.length; i++){
		if(changeBuyPrice) buyPrice = priceArr[i];
		sellPrice = priceArr[i + 1];

		if (sellPrice < buyPrice) {
			changeBuyPrice = true;
		} else {
			var tempProfit = sellPrice - buyPrice;
			if (tempProfit > maxProfit) maxProfit = tempProfit;
			changeBuyPrice = false;
		}
	}
	return maxProfit;
}

// console.log(maxStockPrice([3, 34, 43, 34, 23, 23, 33, 23, 34, 23, 1]));

function tosum(bigArr , smallArr) {
	var str = bigArr.join("");
	console.log(str);
	var res = smallArr[0].toString().match(str);
	console.log(res);
}

tosum([1,2,1,1,2,2,3,3,3],[1,2,3]);

