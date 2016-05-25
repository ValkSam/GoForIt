/**
 * Created by Valk on 25.05.2016.
 */
"use_strict";
function task_2(data) {
    var arr = JSON.parse(data);
    console.log("1.Массив скиллов (поле skills) всех людей, не должно быть повторяющихся скиллов, так же они должны быть отсортированы по алфавиту;");
    var arr1 =
        _.sortBy(
            _.uniq(
                _.flatten(
                    _.map(arr, 'skills'))),
            function (e) {
                return e.toUpperCase();
            });
    console.log(arr1);
    console.log("2. Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (friends)");
    var arr2 =
        _.map(
            _.sortBy(arr, [_.property('friends.length'), 'name'])
            , 'name');
    console.log(arr2);
    console.log("3. Массив всех друзей всех пользователей, не должно быть повторяющихся людей");
    var arr3 =
        _.sortBy(
            _.uniq(
                _.map(
                    _.flatten(
                        _.map(arr, 'friends')),
                    'name')),
            function (e) {
                return e.toUpperCase();
            });
    console.log(arr3);
}
