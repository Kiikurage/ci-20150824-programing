var fs = require('fs');

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res.trim());
    });
}

function main(input) {
    console.log(toDEC(input, '0123'));
}

/**
 * 入力された数字列を10進数に変換する
 * @param {string} exp 入力数字列
 * @param {string} map 用いる記号列
 * @return {number} 変換結果
 */
function toDEC(exp, map) {
    var i = 0,
        res = 0,
        base = map.length;
    for (i = 0; i < exp.length; i++) {
        res *= base;
        res += map.indexOf(exp.charAt(i));
    }

    return res;
}
