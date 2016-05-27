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
;
/**
 * Created by Valk on 24.04.16.
 */

"use strict";

(function ($) {
    $.fn.runTesting = testing;
})(jQuery);

function testing(options) {
    var defaults = {
        testingContainerId: "",
        testingObject: "",
        beforeStartTest: "",
        beforeFinishTest: "",
        afterCheckResult: ""
    };

    var settings = $.extend(defaults, options);

    var testingObject = JSON.parse(localStorage.getItem(settings.testingObject));

    initTesting();

    return this;

    /*-------------------------------------*/

    function initTesting() {
        var $testingContaner = $('#' + settings.testingContainerId);
        $testingContaner.empty();
        var $testingFormTitle = $("<h1>" + testingObject.testTitle + "</h1>");

        var $testingForm = $('<div class="testing-form"></div>');
        $testingForm.append($testingFormTitle);

        testingObject.pages.forEach(function (currentPage, currentPageIdx) {
            var $testingPage = $('<div class="testing-form__page"></div>');
            $testingPage.attr('id', 'page-' + currentPageIdx);
            $testingPage.toggle(false);
            var $currentPageTitle = $("<h2>" + currentPage.pageTitle + "</h2>");
            $testingPage.append($currentPageTitle);

            var $testingQuestionList = $('<ol class="testing-form__question-list"></ol>');
            $testingPage.append($testingQuestionList);

            currentPage.questions.forEach(function (currentQuestion, currentQuestionIdx) {
                var $testingQuestionItem = $('<li class="testing-form__question-item"></li>');
                $testingQuestionItem.html(currentQuestion.questionTitle);
                $testingQuestionList.append($testingQuestionItem);

                var $testingVariantList = $('<ol class="testing-form__variant-list"></ol>');
                $testingQuestionItem.append($testingVariantList);

                var inputType = currentQuestion.questionType == 'multiple' ? 'checkbox' : 'radio';
                currentQuestion.variants.forEach(function (currentVariant, currentVariantIdx) {
                    var $testingVariantItem = $('<li class="testing-form__variant-item"></li>');
                    var $testingVariantItemLabel = $('<label></label>');
                    var testingVariantItemTitle = currentVariant.variantTitle;
                    var $testingVariantItemInput = $('<input/>');
                    $testingVariantItemInput.attr('type', inputType);
                    var inputId = 'p' + currentPageIdx + '_q' + currentQuestionIdx + '_v' + currentVariantIdx;
                    var inputName = inputType == 'radio' ? 'p' + currentPageIdx + '_q' + currentQuestionIdx : inputId;
                    $testingVariantItemInput.attr('id', inputId);
                    $testingVariantItemInput.attr('name', inputName);
                    $testingVariantItemLabel.append($testingVariantItemInput);
                    $testingVariantItem.append($testingVariantItemLabel);
                    $testingVariantList.append($testingVariantItem);
                    $testingVariantItemLabel.append(testingVariantItemTitle);
                });
            });
            var $testingPageButtonWrapper = $('<div class="testing-form__page-button-wrapper"></div>');
            $testingPage.append($testingPageButtonWrapper);

            if (currentPageIdx > 0) {
                var $predButton = $('<button class="testing-form__page-button">Назад</button>');
                $predButton.attr('data-current-page', currentPageIdx).css({ 'display': 'inline-block' });
                $predButton.on('click', function () {
                    var cp = '#page-' + $(this).data('current-page');
                    var tp = '#page-' + (+$(this).data('current-page') - 1);
                    $(cp).toggle(false);
                    $(tp).toggle(true);
                });
                $testingPageButtonWrapper.append($predButton);
            }

            if (currentPageIdx < testingObject.pages.length - 1) {
                var $nextButton = $('<button class="testing-form__page-button">Вперед</button>');
                $nextButton.attr('data-current-page', currentPageIdx).css({ 'display': 'inline-block' });
                $testingPageButtonWrapper.append($nextButton);
                $nextButton.on('click', function () {
                    var cp = '#page-' + $(this).data('current-page');
                    var tp = '#page-' + (+$(this).data('current-page') + 1);
                    $(cp).toggle(false);
                    $(tp).toggle(true);
                });
            }

            if (currentPageIdx == testingObject.pages.length - 1) {
                var $endButton = $('<button class="testing-form__page-button">Закончить</button>');
                $endButton.attr('data-current-page', -1).css({ 'display': 'inline-block' });
                $testingPageButtonWrapper.append($endButton);
                $endButton.on('click', function () {
                    if (settings.beforeFinishTest) {
                        if (settings.beforeFinishTest()) {
                            checkResult();
                        }
                    } else {
                        checkResult();
                    }
                });
            }
            $testingForm.append($testingPage);
        });
        $testingContaner.append($testingForm);
        $('#page-0').toggle(true);
    }

    function checkResult() {
        var correctResultCount = 0;
        var wrongResultCount = 0;
        testingObject.pages.forEach(function (cp, cpi) {
            cp.questions.forEach(function (cq, cqi) {
                var questionResult = true;
                cq.variants.forEach(function (cv, cvi) {
                    questionResult = questionResult && cv.variantResult === $('#p' + cpi + '_q' + cqi + '_v' + cvi).prop('checked');
                });
                if (questionResult) {
                    correctResultCount++;
                } else {
                    wrongResultCount++;
                }
            });
        });
        var result = {
            correctResultCount: correctResultCount,
            wrongResultCount: wrongResultCount
        };
        if (settings.afterCheckResult) {
            settings.afterCheckResult(result);
        }
    }
}
