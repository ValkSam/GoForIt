/**
 * Created by Valk on 14.03.16.
 */
function task2() {
    var nameArray = [];
    for (var i = 1; i <= 2; i++) {
        nameArray[i] = promptWrapper("Ввод имен.", "(минимальная длина имени - 3 символа, не должно начинаться на цифру)", "Введите " + i + "-е имя");
        if (!nameArray[i]) {
            return alert("Ввод прерван !");
        }
    }

    var checkedName = promptWrapper("Ввод имени для проверки", "Введите имя:");
    if (!checkedName) {
        return alert("Ввод прерван !");
    }
    if (checkName(nameArray, checkedName)) {
        alert(checkedName + ", вы успешно вошли !");
    } else {
        alert("ОШИБКА: имя '" + checkedName + "' не найдено в списке допустимых имен !");
    }

    /**/
    function promptWrapper() {
        var message = "";
        var inputString;
        for (var i = 0; i < arguments.length; i++) {
            message += arguments[i] + "\n";
        }
        do {
            inputString = prompt(message, "");
        } while (
        inputString != null
        && !testNameInput(inputString)
        && function () {
            inputString = "";
            return confirm("ОШИБКА: Имя не введено или введено не корректно! \nПовторить попытку?")
        }());
        return inputString;
    }
}

function checkName(nameArray, checkedName) {
    return nameArray
            .map(function (name) {
                return name.toUpperCase();
            })
            .lastIndexOf(checkedName.toUpperCase()) !== -1;
}

function testNameInput(inputString){
    return /^\D{1}.{2,}/.test(inputString.trim());
}

try {
    module.exports.checkName = checkName;
    module.exports.testNameInput = testNameInput;
} catch (e) {
}