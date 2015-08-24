var fs = require('fs');

String.prototype.repeat = function(n) {
    return (n < 2 ? this : this + this.repeat(n - 1));
};

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res.trim());
    });
}

function main(input) {
    console.log(encodeRomanNumeralExpression(input));
}

/**
 * 入力された10進数数字列をローマ数字表記に変換する
 * @param {string|number} input 入力数字列
 * @return {number} 変換結果
 */
function encodeRomanNumeralExpression(input) {
    var res = '',
        baseList = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        charList = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        d;

    input = Number(input);
    while (input > 0) {
        while (true) {
            d = Math.floor(input / baseList[0]);
            if (d !== 0) break;
            baseList.shift();
            charList.shift();
        }

        input -= baseList[0] * d;
        res += charList[0].repeat(d);
        baseList.shift();
        charList.shift();
    }

    return res
}
