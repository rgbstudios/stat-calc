window.onload = function() {
	calc();
}

function calc() {
	let output = document.getElementById("output");
	let nums = getInput();
		
	if(!isValid(nums) ) {
		output.value = "Invalid Input";
		return;
	}
	output.value = "";
	
	sortedNums = nums.sort(sortNum);

	output.value += "Input: " + nums.toString();
	output.value += "\nInput size: " + nums.length;
	output.value += "\nValid: " + isValid(nums);
	output.value += "\nSorted lo-hi: " + sortedNums.toString();
	output.value += "\nSorted hi-lo: " + sortedNums.reverse().toString();
	output.value += "\nSum: " + sum(nums);
	output.value += "\nSum of Squares: " + sumOfSquares(nums);
	output.value += "\nMean (\u03BC): " + mean(nums);
	output.value += "\nPopulation Variance (\u03C3^2): " + variancePop(nums);
	output.value += "\nPopulation Standard Deviation (\u03C3): " + stdDevPop(nums);
	output.value += "\nSample Variance (s^2): " + varianceSamp(nums);
	output.value += "\nSample Standard Deviation (s): " + stdDevSamp(nums);
	output.value += "\nGeometric Mean: " + geoMean(nums);
	output.value += "\nQuadratic Mean: " + quadMean(nums);
	output.value += "\nMedian: " + median(sortedNums);
	output.value += "\nMode: " + mode(sortedNums);
	output.value += "\nRange: " + range(sortedNums);
	output.value += "\nFirst Quartile: " + firstQuartile(sortedNums);
	output.value += "\nThird Quartile: " + thirdQuartile(sortedNums);
	output.value += "\nInterquartile Range: " + (thirdQuartile(sortedNums) - firstQuartile(sortedNums) );
	output.value += "\nMid-Range: " + midrange(sortedNums);
	output.value += "\nMin: " + sortedNums[sortedNums.length-1];
	output.value += "\nMax: " + sortedNums[0];
}
function sortNum(a, b) {
	return a - b;
}

function getInput() {
	//splits text with selected delim and new lines
	let nums = document.getElementById("input").value.split(document.getElementById("delim").value).join("\n").split("\n");
	for(let i = 0; i < nums.length; i++) {
		nums[i] = parseFloat(nums[i].trim() ); //trim because whitespace doesn't get found in isNaN()
		if( (isNaN(nums[i]) || nums[i] == "") && nums[i] != 0) { //doesn't accept "" but does accept 0
			nums.splice(i, 1);
			i--;
		}
	}
	return nums;
}

function isValid(nums) {
	return (nums.length != 0);
}

function stdDevPop(array) { //standard deviation
	if(array.length < 2) {
		return 0;
	} return Math.sqrt(variancePop(array) );
}

function stdDevSamp(array) {
	if(array.length < 2) {
		return 0;
	} return Math.sqrt(varianceSamp(array) );
}

function variancePop(array) {
	if(array.length < 2) {
		return 0;
	}
	let devs = 0, len = array.length;
	for(let i = 0; i < len; i++) {
		devs += Math.pow(array[i], 2);
	}
	return devs / len - Math.pow(mean(array), 2);
}

function varianceSamp(array) {
	if(array.length < 2) {
		return 0;
	}
	let devs = 0, len = array.length;
	for(let i = 0; i < len; i++) {
		devs += Math.pow(array[i] - mean(array), 2);
	}
	return devs / (len - 1);
}

function sumOfSquares(array) {
	if(!isValid(array) ) {
		return 0;
	}
	let sumOfSquares = 0, len = array.length;
	for(let i = 0; i < len; i++) {
		sumOfSquares += Math.pow(array[i], 2);
	}
	return sumOfSquares;
}

function sum(array) {
	if(!isValid(array) ) {
		return 0;
	}
	let sum = 0, len = array.length;
	for(let i = 0; i < len; i++) {
		sum += array[i];
	}
	return sum;
}

function mean(array) {
	if(!isValid(array) ) {
		return 0;
	}
	return sum(array) / array.length;
}


function median(sortedArray) {
	if(!isValid(sortedArray) ) {
		return 0;
	}
	len = sortedArray.length;
	if(len % 2 == 1) { //odd
		return sortedArray[(len-1)/2];
	} else { //even
		return (sortedArray[len/2] + sortedArray[(len/2)-1] ) /2;
	}
}

function thirdQuartile(sortedArray) {	//TODO median of upper half (round to less items)
	if(!isValid(sortedArray) ) {
		return 0;
	}
	let bottomHalf = sortedArray.slice(0, Math.floor(sortedArray.length/2)-1);
	return median(bottomHalf);
}

function firstQuartile(sortedArray) {	//TODO median of lower half (round to less items)
	if(!isValid(sortedArray) ) {
		return 0;
	}
	let topHalf = sortedArray.slice(Math.ceil(sortedArray.length/2), sortedArray.length-1);
	return median(topHalf);
}

function mode(sortedArray) {
	if(!isValid(sortedArray) ) {
		return 0;
	}
	let oldNum = null, oldCount = 0, newNum = sortedArray[0], newCount = 1;
	for(let i = 1; i < sortedArray.length; i++) {
		if(sortedArray[i] == newNum) {
			newCount++;
		} else {
			if(newCount > oldCount) {
				oldCount = newCount;
				oldNum = newNum;
			}
			newCount = 1;
			newNum = sortedArray[i];
		}
	}
	return newCount > oldCount ? newNum : oldNum;
}

function range(sortedArray) {
	return sortedArray[0] - sortedArray[sortedArray.length-1]; //sorted lo-hi
}

function midrange(sortedArray) {
	return (sortedArray[0] + sortedArray[sortedArray.length-1]) / 2; //sorted lo-hi
}

function geoMean(array) {
	if(!isValid(array) ) {
		return 0;
	}
	let prod = 1, len = array.length;
	for(let i = 0; i < len; i++) {
		prod *= array[i];
	}
	return Math.pow(prod, 1/len); //Nth root
}

function quadMean(array) {
	if(!isValid(array) ) {
		return 0;
	}
	let squareSum = 1, len = array.length;
	for(let i =0; i < len; i++) {
		squareSum += Math.pow(array[i], 2);
	}
	return Math.sqrt(squareSum / len);
}

function copy() {
	let output = document.getElementById("output");
	output.setSelectionRange(0, output.value.length);
	output.focus();
	document.execCommand("copy");
}