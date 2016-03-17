/**
 * Created by Valk on 14.03.16.
 *
 * input вложенный в label (без аттрибута for)
 */
(function task4() {

    /*объект DomElement
    * поля объекта описывают основные параметры элемента DOM (tag, class, attr, text, parent), которые используются
    * для создания элемента DOM (element) с помощью метода createAndPlaceElement()
    * значения параметров задаются через соответсвующие сеттеры
    *
    * */
    function DomElement() {
        //параметры для создания элемента
        var tag = 'div';
        var clazz = [];
        var attr = [];
        var text = "";
        //родитель элемента
        var parent = null;
        //созданный элемент
        var element = null;

        this.reset = function () {
            tag = 'div';
            clazz = [];
            attr = [];
            text = "";
        };

        this.setTag = function (value) {
            tag = value;
        };

        /*позволяет задать сласс для создаваемого элемента
         * значения класса можно указать в виде массива или в виде строки:
         * Например,
         * ['class-1', 'class-2']
         * 'class-1, class-2'
         * 'class-1'
         *
         * не влияет на уже созданный элемент
         * */
        this.setClazz = function (value) {
            if (value instanceof Array) {
                clazz = value;
            } else {
                clazz = value.split(',');
            }
        };

        /*Позволяет добавить класс к списку, определенному методом setClazz()
        * */
        this.addClazz = function (value) {
            clazz.push(value);
        };

        /*позволяет задать атрибуты для создаваемого элемента
        * значения атрибутов можно указать в виде массива или в виде строки.
        * Можно задать атрибуты без значений (типа hidden, required)
        * Например,
        * ['attr1=val1', 'attr2=val2']
        * ['attr1=val1', 'attr2=val2', 'attr3']
        * 'attr1=val1, attr2=val2'
        * 'attr=val'
        *
        * не влияет на уже созданный элемент
        * */
        this.setAttr = function (value) {
            if (value instanceof Array) {
                attr = value;
            } else {
                attr = value.split(',');
            }
        };

        /*Позволяет добавить атрибут к списку, определенному методом addAttr()
         * */
        this.addAttr = function (value) {
            attr.push(value);
        };

        this.setText = function (value) {
            text = value;
        };

        /* озволяет указать родителя для создаваемого элемента
        *  в качестве родителя можно указать объект DomElement
        * */
        this.setParent = function (value) {
            if (value instanceof DomElement) {
                /*для возможности принимать экземпляр DomElement
                 * таким образом записи elem.setParent(form.getElement())
                 * и elem.setParent(form) будут идентичными
                 * */
                parent = value.getElement();
            }
            else {
                parent = value;
            }
        };

        this.getElement = function () {
            return element;
        };

        this.getParent = function () {
            return parent;
        };

        /*создает элемент, используя параметры, и помещает его в DOM
        * */
        this.createAndPlaceElement = function () {
            element = document.createElement(tag);

            if (clazz != '') {
                element.setAttribute("class", clazz.join(" "));
            }

            attr.forEach(function (attrItem) {
                var attrPair = attrItem.split("=");
                element.setAttribute(attrPair[0].trim(), attrPair[1].trim() ? attrPair[1].trim() : ''); //учитываем атрибуты типа hidden, required
            });

            element.innerHTML = text;

            parent.appendChild(element);

            return this;
        };

        /*
        * клонирует элемент и помещает его в DOM
        * в качестве параметров можно указать
        * - родителя, в который будет помещен клон элемента
        * - данные для замены в клоне атрибутов и текста
        * */
        this.cloneAndPlaceElement = function (newParent, substitutionArr) {
            if (! this.getElement()) {
                console.error("it's needed to create and place element to DOM before you can clone it");
                return null;
            }
            var elementClone = this.getElement().cloneNode(true);
            newParent = newParent ? newParent : this.getParent();
            substitutionArr = substitutionArr ? substitutionArr : [];

            /*заменяет атрибуты в клонируемом элементе*/
            substitutionArr.forEach(function (item) {
                var i, j;
                switch (item[0]) {
                    case '#':
                    {
                        //это id
                        el = elementClone.querySelectorAll(item.split('->')[0]);
                        for (i = 0; i < el.length; i++) {
                            el[i].setAttribute('id', item.split('->')[1]);
                        }
                        break;
                    }
                    case '[':
                    {
                        //это attribute
                        el = elementClone.querySelectorAll('*');
                        for (i = 0; i < el.length + 1; i++) {
                            var currentElem = i < el.length ? el[i] : elementClone; //не только для детей, не забываем про сам клонируемый элемент
                            var attr = currentElem.attributes;
                            for (j = 0; j < attr.length; j++) {
                                if (attr[j].nodeValue == item.split('->')[0].replace('[', '').replace(']', '')) {
                                    currentElem.setAttribute(attr[j].nodeName, item.split('->')[1]);
                                }
                            }
                        }
                        break;
                    }
                    default:
                    {
                        //это текст
                        el = elementClone.querySelectorAll('*');
                        for (i = 0; i < el.length + 1; i++) {
                            var child = i < el.length ? el[i].childNodes : elementClone.childNodes; //не только для детей, не забываем про сам клонируемый элемент
                            for (j = 0; j < child.length; j++) {
                                if (child[j].nodeType == Node.TEXT_NODE) {
                                    child[j].nodeValue = child[j].nodeValue.replace(item.split('->')[0], item.split('->')[1]);
                                }
                            }
                        }
                        break;
                    }
                }
            });

            newParent.appendChild(elementClone);

            return this;
        };
    }


    //создание DOM

    var elem;

    //Form
    elem = new DomElement();
    elem.setTag('form');
    elem.setClazz('question-form');
    elem.setAttr('action=#');
    elem.setParent(document.body);
    var form = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('header');
    elem.setClazz('question-form__header');
    elem.setParent(form);
    var header = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('h1');
    elem.setClazz('question-form__title');
    elem.setText('Тест по программированию');
    elem.setParent(header);
    elem.createAndPlaceElement();

    //Блок вопросов ...
    elem = new DomElement();
    elem.setTag('main');
    elem.setClazz('question-form__main');
    elem.setParent(form);
    var main = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('ol');
    elem.setClazz('question-form__task-list');
    elem.setAttr('type=1');
    elem.setParent(main);
    var olQuestionList = elem.createAndPlaceElement();

    //Блок Вопрос №1 ...
    elem = new DomElement();
    elem.setTag('li');
    elem.setClazz('question-form__task');
    elem.setText('Вопрос №1');
    elem.setParent(olQuestionList);
    var liQuestion = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('div');
    elem.setClazz('question-form__variant-list');
    elem.setParent(liQuestion);
    var ulQuestionList = elem.createAndPlaceElement();

    //Блок Вариант ответа №1 ...
    elem = new DomElement();
    elem.setTag('div');
    elem.setClazz('question-form__variant');
    elem.setParent(ulQuestionList);
    var liQuestionVariant = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('label');
    elem.setParent(liQuestionVariant);
    var label = elem.createAndPlaceElement();

    elem = new DomElement();
    elem.setTag('input');
    elem.setAttr(['type=checkbox', 'name=q1v1', 'id=q1v1']);
    elem.setParent(label);
    elem.createAndPlaceElement();

    label.getElement().innerHTML = label.getElement().innerHTML + "Вариант ответа №1"; //текст ставим после вложенного input

    //... Блок Вариант ответа №1

    //Блок Вариант ответа №2 и Вариант ответа №3 клонируем из Вариант ответа №1
    liQuestionVariant
        .cloneAndPlaceElement(null, ['#q1v1->q1v2', '[q1v1]->q1v2', 'Вариант ответа №1->Вариант ответа №2'])
        .cloneAndPlaceElement(null, ['#q1v1->q1v3', '[q1v1]->q1v3', 'Вариант ответа №1->Вариант ответа №3']);

    //... Блок Вопрос №1

    //Блок Вопрос №2 и Вопрос №3 клонируем из Вопрос №1
    liQuestion
        .cloneAndPlaceElement(null, ['#q1v1->q2v1', '#q1v2->q2v2', '#q1v3->q2v3', '[q1v1]->q2v1', '[q1v2]->q2v2', '[q1v3]->q2v3', 'Вопрос №1->Вопрос №2'])
        .cloneAndPlaceElement(null, ['#q1v1->q3v1', '#q1v2->q3v2', '#q1v3->q3v3', '[q1v1]->q3v1', '[q1v2]->q3v2', '[q1v3]->q3v3', 'Вопрос №1->Вопрос №3']);

    //... Блок вопросов

    elem.reset(); //можем переиспользовать
    elem.setTag('footer');
    elem.setClazz('question-form__footer');
    elem.setParent(form);
    var footer = elem.createAndPlaceElement();

    //Button
    elem.reset();
    elem.setTag('input');
    elem.setClazz('question-form__submit');
    elem.setAttr('type=submit');
    elem.addAttr('value=Проверить мои результаты');
    elem.setParent(footer);
    elem.createAndPlaceElement();

})();