var fs = require('fs');

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res.trim());
    });
}

function main(input) {
    console.log(decodeRomanNumberExpression(input));
}

/**
 * 入力されたローマ数字列を10進数に変換する
 * @param {string} input 入力数字列
 * @return {number} 変換結果
 */
function decodeRomanNumberExpression(input){
    var i = 0,
        res = 0,
        v, lastV;
    for (i = 0; i < input.length; i++) {
        v = decodeRomanNumber(input.charAt(i));
        if (lastV < v) {
            res -= lastV;
            res += v-lastV;
        } else {
            res += v;
        }
        lastV = v;
    }

    return res;
}

/**
 * 入力されたローマ数字1文字を10進数に変換する
 * @param {string} w ローマ数字
 * @return {number} 変換結果
 */
function decodeRomanNumber(w) {
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
