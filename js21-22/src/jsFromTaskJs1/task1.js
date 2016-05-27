/**
 * Created by Valk on 14.03.16.
 */
/*Test pow function*/
/*(function testPowFunc() {
    console.log(pow(2, 4), Math.pow(2, 4));
    console.log(pow(-2, 4), Math.pow(-2, 4));
    console.log(pow(-2, 3), Math.pow(-2, 3));
    console.log(pow(2, 1), Math.pow(2, 1));
    console.log(pow(2, 0), Math.pow(2, 0));
    console.log(pow(0, 3), Math.pow(0, 3));
    console.log(pow(2, -4), Math.pow(2, -4));
    console.log(pow(-2, -5), Math.pow(-2, -5));
    console.log(pow(-3, -555), Math.pow(-3, -555));
    console.log(pow(-3, 5555), Math.pow(-3, 5555));
    console.log(pow(-2, "a"), Math.pow(-2, "a"));
    console.log(pow("-2s", 2), Math.pow("-2s", 2));
    console.log(pow(null, 2), Math.pow(null, 2));
    console.log(pow(2, null), Math.pow(2, null));
    console.log(pow(undefined, 2), Math.pow(undefined, 2));
    console.log(pow(2, undefined, 2), Math.pow(2, undefined));
})();*/
/**/
/*run task 1*/
function task1() {
    var x = promptWrapper("Возведение числа в степень.", "Введите число:");
    if (isNaN(x)) return alert("Расчет прерван !");

    var n = promptWrapper("Возведение числа в степень.", "Введите степень числа:");
    if (isNaN(n)) return alert("Расчет прерван !");

    var result = pow(x, n);
    console.log(x + "^" + n + "=" + result);

    function promptWrapper() {
        var message = "";
        var inputString;
        for (var i = 0; i < arguments.length; i++) {
            message += arguments[i] + "\n";
        }
        do {
            inputString = prompt(message, "");
        } while (inputString != null && (isNaN(inputString) || !inputString.trim()) && confirm("ОШИБКА: Необходимо ввести число! \nПовторить попытку?"));
        return !inputString ? NaN : inputString;
    }
};
/**/
function pow(base, exponent) {
    if (isNaN(base) || isNaN(exponent)) return NaN;
    if (base === 0) return 0;
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    if (exponent < 0) {
        base = 1 / base;
        exponent = -exponent;
    }
    return base * pow(base, --exponent);
}

try {
    module.exports.pow = pow;
} catch (e) {
}