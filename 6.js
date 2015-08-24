var fs = require('fs');

String.prototype.repeat = function(n) {
    return (n < 2 ? this : this+this.repeat(n - 1));
};

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res);
    });
}

function main(exp) {
    var res = '',
        cover, d;

    var baseList = [1000, 500, 100, 50, 10, 5, 1],
        charList = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];

    exp = Number(exp);
    while (exp > 0) {
        cover = calcCover(exp);

        if (cover.result) {
            exp += cover.value;
            res += charList[baseList.indexOf(cover.value)];
        }

        while (true) {
            d = Math.floor(exp / baseList[0]);
            if (d !== 0) break;
            baseList.shift();
            charList.shift();
        }

        exp -= baseList[0] * d;
        res += charList[0].repeat(d);
        baseList.shift();
        charList.shift();
    }

    res = res
        .replace(/DCCCC/g, 'CM')
        .replace(/CCCC/g, 'DM')
        .replace(/LXXXX/g, 'XC')
        .replace(/XXXX/g, 'XL')
        .replace(/VIIII/g, 'IX')
        .replace(/IIII/g, 'IV')

    console.log(res);
}

function calcCover(exp){
    var ma,
        exp = exp.toString();
    if (ma = exp.match(/^(?:(4*9+)|4)/)) {
        return {
            result: true,
            value: 1*Math.pow(10, exp.length-ma.index-ma[0].length)
        }
    } else {
        return {
            result: false
        }
    }
}
