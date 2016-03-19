/**
 * Created by Valk on 14.03.16.
 *
 * input вложенный в label (без аттрибута for)
 * вариант без функции-конструктора
 */
(function task4() {

    var elem = {
        //параметры для создания элемента
        tag: 'div',
        clazz: [],
        attr: [],
        text: "",
        parent: null,

        reset: function () {
            this.tag = 'div';
            this.clazz = [];
            this.attr = [];
            this.text = "";
        },

        createAndPlaceElement: function () {
            var element = document.createElement(this.tag);

            if (this.clazz) {
                if (!(this.clazz instanceof Array)) {
                    this.clazz = this.clazz.split(',');
                }
                element.setAttribute("class", this.clazz.join(" "));
            }

            if (this.attr) {
                if (!(this.attr instanceof Array)) {
                    this.attr = this.attr.split(',');
                }
                var el = element;
                this.attr.forEach(function (attrItem) {
                    var attrPair = attrItem.split("=");
                    el.setAttribute(attrPair[0].trim(), attrPair[1].trim() ? attrPair[1].trim() : '');
                });
            }

            element.innerHTML = this.text;

            this.parent.appendChild(element);

            return element;
        },

        cloneAndPlaceElement: function (clonableElement, newParent, substitutionArr) {
            var elementClone = clonableElement.cloneNode(true);

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
        }
    };

//Form
    elem.reset();
    elem.tag = 'form';
    elem.clazz = 'question-form';
    elem.attr = 'action=#';
    elem.parent = document.body;
    var form = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'header';
    elem.clazz = 'question-form__header';
    elem.parent = form;
    var header = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'h1';
    elem.clazz = 'question-form__title';
    elem.text = 'Тест по программированию';
    elem.parent = header;
    elem.createAndPlaceElement();


//Блок вопросов ...
    elem.reset();
    elem.tag = 'main';
    elem.clazz = 'question-form__main';
    elem.parent = form;
    var main = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'ol';
    elem.clazz = 'question-form__task-list';
    elem.attr = 'type=1';
    elem.parent = main;
    var olQuestionList = elem.createAndPlaceElement();

//Блок Вопрос №1 ...
    elem.reset();
    elem.tag = 'li';
    elem.clazz = 'question-form__task';
    elem.text = 'Вопрос №1';
    elem.parent = olQuestionList;
    var liQuestion = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'div';
    elem.clazz = 'question-form__variant-list';
    elem.parent = liQuestion;
    var ulQuestionList = elem.createAndPlaceElement();

//Блок Вариант ответа №1 ...
    elem.reset();
    elem.tag = 'div';
    elem.clazz = 'question-form__variant';
    elem.parent = ulQuestionList;
    var liQuestionVariant = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'label';
    elem.parent = liQuestionVariant;
    var label = elem.createAndPlaceElement();

    elem.reset();
    elem.tag = 'input';
    elem.attr = ['type=checkbox', 'name=q1v1', 'id=q1v1'];
    elem.parent = label;
    elem.createAndPlaceElement();

    label.innerHTML = label.innerHTML + "Вариант ответа №1"; //текст ставим после вложенного input

    //Блок Вариант ответа №2 и Вариант ответа №3 клонируем из Вариант ответа №1
    elem
        .cloneAndPlaceElement(liQuestionVariant, ulQuestionList, ['#q1v1->q1v2', '[q1v1]->q1v2', 'Вариант ответа №1->Вариант ответа №2'])
        .cloneAndPlaceElement(liQuestionVariant, ulQuestionList, ['#q1v1->q1v3', '[q1v1]->q1v3', 'Вариант ответа №1->Вариант ответа №3']);

    //... Блок Вопрос №1

    //Блок Вопрос №2 и Вопрос №3 клонируем из Вопрос №1
    elem
        .cloneAndPlaceElement(liQuestion, olQuestionList, ['#q1v1->q2v1', '#q1v2->q2v2', '#q1v3->q2v3', '[q1v1]->q2v1', '[q1v2]->q2v2', '[q1v3]->q2v3', 'Вопрос №1->Вопрос №2'])
        .cloneAndPlaceElement(liQuestion, olQuestionList, ['#q1v1->q3v1', '#q1v2->q3v2', '#q1v3->q3v3', '[q1v1]->q3v1', '[q1v2]->q3v2', '[q1v3]->q3v3', 'Вопрос №1->Вопрос №3']);

    //... Блок вопросов

    elem.reset(); //можем переиспользовать
    elem.tag = 'footer';
    elem.clazz = 'question-form__footer';
    elem.parent = form;
    var footer = elem.createAndPlaceElement();

    //Button
    elem.reset();
    elem.tag = 'input';
    elem.clazz = 'question-form__submit';
    elem.attr = 'type=submit, value=Проверить мои результаты';
    elem.parent = footer;
    elem.createAndPlaceElement();

})
();