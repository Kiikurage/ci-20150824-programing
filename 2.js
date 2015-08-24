var fs = require('fs');

if (process.argv.length === 3) {
    main(process.argv[2], 8);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res, 8);
    });
}

function main(exp, base) {
    var i = 0,
        res = 0;
    for (i = 0; i < exp.length; i++) {
        res *= base;
        res += toNumber(exp.charAt(i));
    }

    console.log(res);
}

function toNumber(w) {
    var map = 'abcdefgh';
    return map.indexOf(w);
}
