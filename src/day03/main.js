import LineReaderSync from 'line-reader-sync';

const getBitFrequency = (arr, i) => {
    const countTot = arr.length;
    let count1 = 0;
    let count0 = 0;
    let j = 0;
    while(count1 <= countTot/2 && count0 <= countTot/2 && !(count1 == countTot/2 && count0 == countTot/2)) {
        if(arr[j][i] == "1")
            count1++;
        else
            count0++;
        j++;
    }
    if(count1 > count0) {
        return {
            high: "1",
            low: "0"
        }
    } else if (count1 == count0) {
        return {
            high: "1",
            low: "0"
        }
    } else {
        return {
            high: "0",
            low: "1"
        }
    }
}

const binaryStringToInt = (str) => {
    
    let tot=0;

    for(let i=0; i<str.length; i++) {
        if(str[i] == "1")
            tot += 2**(str.length-1-i)
    }

    return tot
}
 
export const powerConsumption = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    const countTot = strInput.length;
    var gammaRateBin = "";
    var epsilonRateBin = "";

    for(let i=0; i<strInput[0].length; i++) {
        let bitFrequency = getBitFrequency(strInput, i);
        gammaRateBin += bitFrequency.high;
        epsilonRateBin += bitFrequency.low;
    }

    return binaryStringToInt(gammaRateBin)*binaryStringToInt(epsilonRateBin)
}

export const lifeSupportRating = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    var remaining = strInput;
    var temp, bitFrequency, mostCommon, leastCommon;
    let i = 0;

    while(remaining.length > 1) {
        temp = [];
        mostCommon = getBitFrequency(remaining, i).high;

        for(let j=0; j<remaining.length; j++) {
            if(remaining[j][i] == mostCommon) {
                temp.push(remaining[j])
            }
        }
        remaining = temp;
        i++;
    }
    var oxGen=binaryStringToInt(remaining[0]);
    remaining = strInput;
    i=0;

    while(remaining.length > 1) {
        temp = [];
        leastCommon = getBitFrequency(remaining, i).low;

        for(let j=0; j<remaining.length; j++) {
            if(remaining[j][i] == leastCommon) {
                temp.push(remaining[j])
            }
        }
        remaining = temp;
        i++;
    }

    var co2Scrub = binaryStringToInt(remaining[0]);
    return oxGen*co2Scrub
}