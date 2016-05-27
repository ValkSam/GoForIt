"use strict";

$(function () {
    /*init and store data*/
    var testingObject = {
        "testTitle": "Тест по программированию",
        "pages": [{
            "pageTitle": "Тест по программированию. Блок вопросов №1",
            "questions": [{
                "questionTitle": "Вопрос №1-1",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №1-2",
                "questionType": "singlton",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №1-3",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }]
        }, {
            "pageTitle": "Тест по программированию. Блок вопросов №2",
            "questions": [{
                "questionTitle": "Вопрос №2-1",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №2-2",
                "questionType": "singlton",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №2-3",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }]
        }, {
            "pageTitle": "Тест по программированию. Блок вопросов №3",
            "questions": [{
                "questionTitle": "Вопрос №3-1",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №3-2",
                "questionType": "singlton",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": false
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": true
                }]
            }, {
                "questionTitle": "Вопрос №3-3",
                "questionType": "multiple",
                "variants": [{
                    "variantTitle": "Вариант ответа №1",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №2",
                    "variantResult": true
                }, {
                    "variantTitle": "Вариант ответа №3",
                    "variantResult": false
                }]
            }]
        }]
    };
    localStorage.removeItem("myTest");
    localStorage.setItem("myTest", JSON.stringify(testingObject));

    /*run test*/
    var options = {
        testingContainerId: "testing-place",
        testingObject: "myTest",
        beforeFinishTest: beforeEndTest,
        afterCheckResult: afterCheckTest
    };
    $('body').runTesting(options);

    function beforeEndTest() {
        //returns 'true' for finish test or 'false' for continue
        return confirm("Закончить тест и проверить результаты ?");
    }

    function afterCheckTest(resultSummery) {
        $('#correct-result-count').html("Правильных ответов: " + resultSummery.correctResultCount);
        $('#wrong-result-count').html("Ошибочных ответов: " + resultSummery.wrongResultCount);
        $('#result-modal').one('hidden.bs.modal', function () {
            if (confirm("Пройти еще раз ?")) {
                $('body').runTesting(options);
            }
        });
        $('#result-modal').modal();
    }
});
