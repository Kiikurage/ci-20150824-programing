var fs = require('fs');

String.prototype.repeat = function(n) {
    return (n < 2 ? this : this+this.repeat(n - 1));
};

if (process.argv.length === 3) {
    main(process.argv[2]);
} else {
    require('fs').readFile('/dev/stdin', 'utf8', function(err, res) {
        main(res).trim();
    });
}

function main(input) {
    console.log(encodeRomanNumeralExpression(input));
}

/**
 * 入力された10進数数字列をローマ数字表記に変換する
 *
 * なお、サンプルとして問題文には CIL -> 149 が与えられたが、
 * これは ICL -> 149 でも問題無いと考えられる。
 * CL = 150 に対して、をα=(空白), β="C" の間にIを置いたと考えられるので
 * -1 + 100 + 50 = 149 だからである。
 *
 * @param {string|number} input 入力数字列
 * @return {number} 変換結果
 */
function encodeRomanNumeralExpression(input) {
    var res = '',
        cover, d;

    var baseList = [1000, 500, 100, 50, 10, 5, 1],
        charList = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];

    input = Number(input);
    while (input > 0) {
        cover = calcCover(input);

        if (cover.result) {
            input += cover.value;
            //毎回、高々1個しか記号は追加されない
            //（記号を追加した後、本来の隣接する記号βが置かれる）ので、
            //文法の「記号を１つだけ、」の制約は満たされる。
            res += charList[baseList.indexOf(cover.value)];
        }

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

    return res;
}

/**
 * 入力の補数が単純な形で表現できるかを確認する
 * @param {number} input 入力
 * @return {Object} 結果
 * @return {boolean} result 単純な形の補数の場合はtrueを返す
 * @return {number} value 補数
 */
function calcCover(input){
    var ma,
        input = input.toString();

    //単純な形で表現できるためには
    // - 4に対して1を足す
    // - 9に対して1を足す
    //が考えられ、それらを網羅した正規表現が次のようになる
    if (ma = input.match(/(?:(4?9+)|4)/)) {
        return {
            result: true,
            value: 1*Math.pow(10, input.length-ma.index-ma[0].length)
        }
    } else {
        return {
            result: false
        }
    }
}
