import LineReaderSync from 'line-reader-sync';

export const multiplyCoordinates = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    var horiz = 0;
    var vert = 0;

    for(let i=0; i<strInput.length; i++) {
        let dir=strInput[i].split(" ");
        if (dir[0] === "forward")
            horiz += parseInt(dir[1]);
        else if (dir[0] === "down")
            vert += parseInt(dir[1]);
        else if (dir[0] === "up")
            vert -= parseInt(dir[1]);
    }

    return horiz*vert;
}

export const multiplyCoordinatesAim = (inputFile) => {

    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(line => line.replace(/[\r]/g, ''));

    var horiz = 0;
    var vert = 0;
    var aim = 0;

    for(let i=0; i<strInput.length; i++) {
        let dir=strInput[i].split(" ");
        if (dir[0] === "forward") {
            horiz += parseInt(dir[1]);
            vert += aim*dir[1];
        }
        else if (dir[0] === "down") {
            aim += parseInt(dir[1]);
        }
        else if (dir[0] === "up") {
            aim -= parseInt(dir[1]);
        }
    }

    return horiz*vert;
}