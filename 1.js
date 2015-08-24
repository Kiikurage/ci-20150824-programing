var fs = require('fs');

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res.trim());
    });
}

function main(input) {
    console.log(toDEC(input, 4));
}

/**
 * 入力された数字列を10進数に変換する
 * @param {string} exp 入力数字列
 * @param {number} baseFrom 基数
 * @return {number} 変換結果
 */
function toDEC(exp, baseFrom) {
    var i = 0,
        res = 0;
    for (i = 0; i < exp.length; i++) {
        res *= baseFrom;
        res += toDECNumber(exp.charAt(i));
    }

    return res;
}

/**
 * 入力された数字を10進数に変換する
 * @param {string} w 数字
 * @return {number} 変換結果
 */
function toDECNumber(w) {
    return Number(w);
}
