var fs = require('fs');

String.prototype.repeat = function(n) {
    return (n < 2 ? this : this + this.repeat(n - 1));
};

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res);
    });
}

function main(exp) {
    var tokens = exp.split(/\s+/g),
        unit = {
            'thousand': 1000,
            'hundred': 100
        },
        number = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9,
            'ten': 10,
            'eleven': 11,
            'twelve': 12,
            'thirteen': 13,
            'fourteen': 14,
            'fifteen': 15,
            'sixteen': 16,
            'seventeen': 17,
            'eighteen': 18,
            'nineteen': 19,
            'twenty': 20,
            'thirty': 30,
            'fourty': 40,
            'fifty': 50,
            'sixty': 60,
            'seventy': 70,
            'eighty': 80,
            'ninety': 90
        },
        res = 0,
        buffer = 0,
        token;

    while (token = tokens.shift()) {
        if (unit[token] !== undefined) {
            res += buffer * unit[token];
            buffer = 0;
        } else if (number[token] !== undefined) {
            buffer += number[token];
        } else {
            console.log('unknown token: %s', token);
        }
    }
    res += buffer;

    console.log(res);
}
