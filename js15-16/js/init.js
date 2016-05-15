"use strict";

$(function () {
    $('.pixabay-search__button').on('click', pixabaySearch);

    $('.pixabay-search__input').on('keypress', function (key) {
        if (key.which == 13) {
            pixabaySearch();
        }
    });

    //SECOND PART OF TASK

    var worker1 = new Worker();
    var worker2 = new Worker();
    var student1 = new Student();
    var student2 = new Student("Дима");
    worker2.name = "Реальный Коля";
    console.log(worker1.name);
    worker1.toEat();
    worker1.toWork();
    console.log('-----------------');
    console.log(worker2.name);
    worker2.toEat();
    worker2.toWork();
    console.log('-----------------');
    console.log(student1.name);
    student1.toEat();
    student1.toWatchTv();
    console.log('-----------------');
    console.log(student2.name);
    student2.toEat();
    student2.toWatchTv();

});

function pixabaySearch() {
    var searchText = $('.pixabay-search__input').val();
    var key = "2574245-7d692ea33d2a67fe98dc9e2b7";
    $.ajax({
            url: "https://pixabay.com/api/?key=" + key + "&q=" + searchText + "s&image_type=photo",
            dataType: "jsonp",
            success: function (data) {
                var $pixabayResultList = $('.pixabay-result__list');
                $pixabayResultList.empty();
                if (data.hits.length == 0) {
                    var $pixabayResultItem = $('<li class="pixabay-result__item">Ничего не найдено :(</li>');
                    $pixabayResultList.append($pixabayResultItem);
                } else {
                    $.each(data.hits, function (i, val) {
                        var $pixabayResultItem = $('<li class="pixabay-result__item"></li>');
                        var $$pixabayResultItemImg = $("<img src =" + val.previewURL + ">");
                        $pixabayResultItem.append($$pixabayResultItemImg);
                        $pixabayResultList.append($pixabayResultItem);
                    });
                }
            },
            error: function (data) {
                var $pixabayResultList = $('.pixabay-result__list');
                $pixabayResultList.empty();
                var $pixabayResultItem = $('<li class="pixabay-result__item">Ничего не вышло - ошибочка вышла :( Звоните 103 (звонки бесплатные)</li>');
                $pixabayResultList.append($pixabayResultItem);
            }
        }
    );
}


//SECOND PART OF TASK

//Human
function Human(){
    this.name = "условный Вася";
    this.age = undefined;
    this.sex = "не определен";
    this.height = undefined;
    this.weight = undefined;
}
Human.prototype.toEat = function (){
    console.log('Может покушаешь, '+ this.name+' ?');
};

//Worker
function Worker(){
    this.jobPlace = undefined;
    this.salary = undefined;
}
Worker.prototype = new Human();
Worker.prototype.toWork = function (){
    console.log('Работать, '+ this.name+' !!!');
};

//Student
function Student(name){
    if (name) {
        this.name = name;
    }
    this.studyPlace = undefined;
    this.scholarship = undefined;
}
Student.prototype = new Human();
Student.prototype.toWatchTv = function (){
    console.log('Пойди расслабся, '+ this.name+' !');
};


