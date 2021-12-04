import LineReaderSync from 'line-reader-sync';

export const numDepthIncreases = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => parseInt(line.replace(/[\r]/g, '')));

    var ans = 0;

    for(let i=1; i<strInput.length; i++) {
        if(strInput[i] > strInput[i-1]) {
            ans++;
        }
    }

    return ans;
}

export const numDepthIncreasesWindow = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => parseInt(line.replace(/[\r]/g, '')));

    var ans = 0;

    for(let i=0; i<strInput.length-2; i++) {
        let sum1 = strInput[i]+strInput[i+1]+strInput[i+2];
        let sum2 = strInput[i+1]+strInput[i+2]+strInput[i+3];
        if(sum2>sum1) {
            ans++;
        }
    }

    return ans;
}