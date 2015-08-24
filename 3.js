var fs = require('fs');

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res);
    });
}

function main(exp) {
    var i = 0,
        res = 0,
        v, lastV;
    for (i = 0; i < exp.length; i++) {
        v = toNumber(exp.charAt(i));
        if (lastV < v) {
            res -= lastV;
            res += v-lastV;
        } else {
            res += v;
        }
        lastV = v;
    }

    console.log(res);
}

function toNumber(w) {
    var map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    return map[w];
}
