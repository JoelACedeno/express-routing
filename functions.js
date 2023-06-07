/**
 * Convert array of strings to array of numbers or throw error
 * @param {Array} numsToString array of string
 * @returns {Array|Error} array or error
 */
function convertNumsArr(numsToString){
    let result = [];

    for (i=0; i < numsToString.length; i++){
        let stringToNum = Number(numsToString[i]);

        result.push(stringToNum);
        
        if (Number.isNaN(stringToNum)) {
            return new Error(
                `Value '${numsToString[i]}' at index ${i} is not a valid number.`
            );
        }
        result.push(stringToNum);
    }

    return result;
}

/** find the mean of an array of numbers */
function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce(function (acc, cur){
        return acc + cur;
    }) / nums.length;
}

/** find the median of an array of numbers */
function findMedian(nums){
    //sort numbers in array and find the number in the middle
    nums.sort((a,b) => a-b);
    let middleIndex = Math.floor(nums.length / 2);

    let median;
    if (nums.length %2 === 0) {
        median = (nums[middleIndex] - nums[middleIndex - 1] / 2 );
    } else {
        median = nums[middleIndex];
    }
     return median;
}

/**
 * Frequency counter for elements in an array
 * @param {Array} arr 
 */
function frequencyCounter(arr){
    return arr.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});
}

/** find the mode of an array of numbers */
function findMode(nums){
    let freqCounter = frequencyCounter(nums)

    let count = 0;
    let mostFrequent;

    for (let key in freqCounter){
        if (freqCounter[key] > count){
            mostFrequent = key;
            count = freqCounter[key];
        }
    }

    return mostFrequent;
}

module.exports =
{
    convertNumsArr,
    findMean,
    findMedian,
    frequencyCounter,
    findMode
}