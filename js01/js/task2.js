/**
 * Created by Valk on 14.03.16.
 */
(function task2() {
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

    var variant = 2;
    switch (variant) {
        case 1:
        {
            /*Вариант 1*/
            var found = false;
            nameArray.some(function (name, i) {
                console.log("=");
                return (found = checkedName.toUpperCase() === name.toUpperCase());
            });

            if (!found) {
                alert("ОШИБКА: имя '" + checkedName + "' не найдено в списке допустимых имен !");
            } else {
                alert(checkedName + ", вы успешно вошли !");
            }
            break;
        }
        case 2:
        {
            /*Вариант 2*/
            if (nameArray
                    .map(function (name) {
                        return name.toUpperCase();
                    })
                    .lastIndexOf(checkedName.toUpperCase()) === -1) {
                alert("ОШИБКА: имя '" + checkedName + "' не найдено в списке допустимых имен !");
            } else {
                alert(checkedName + ", Вы успешно вошли !");
            }
            break;
        }
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
        && !/^\D{1}.{2,}/.test(inputString.trim())
        && function () {
            inputString = "";
            return confirm("ОШИБКА: Имя не введено или введено не корректно! \nПовторить попытку?")
        }());
        return inputString;
    }
})();