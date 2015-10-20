var JSON_URL = 'data.json'
var correct = 0,
    wrong = 0,
    lastOptionList = []




var data = $.getJSON(JSON_URL, function(data) {
    // Start Anti-Repeat Script
    for (var i = 0, ar = []; i < data.quiz.length; i++) {
        ar[i] = i;
    }

    // randomize the array
    ar.sort(function() {
        return Math.random() - 0.5;
    });
    // End Anti-Repeat Script

    $('.spinner').fadeOut()

    init()
    showQuizCount()

    function randomNum(max) {
        return Math.floor(Math.random() * max);
    }

    function showQuizCount() {
        var QuizCount = data.quiz.length
        var QuizPercent =
            $('#QuizCount').html('目前題庫數量 / 官方題庫數量：' + QuizCount + ' / 100')
    }

    function checkAns() {

        if (enteredAns == correctAns) {
            console.log('Correct!')
            scoreBoard('correct')
        } else {
            console.log('Wrong!')
            scoreBoard('wrong')
        }
    }

    function scoreBoard(score) {
        
        if (score == 'correct') {
            correct++
            $('#status').html('<span class="label label-success">正確</span>&nbsp;&nbsp;')
        } else if (score == 'wrong') {
            wrong++
            $('#status').html('<span class="label label-danger">錯誤</span>&nbsp;&nbsp;')
        }
        $('#status').append('<span class="label label-default">上題解答</span>&nbsp;&nbsp;&nbsp;' + lastOptionList[correctAns])
        $('#total').html('<span class="label label-default">成績</span>&nbsp;&nbsp;&nbsp;正確：' + correct + ' / 錯誤：' + wrong + ' / 總題數：' + (correct + wrong))

    }

    function init() {
        var quizIndex = ar.pop()
        $('#testing-area').html('')
        if (quizIndex != undefined) {
            $('#testing-area').append('<h2><span class="label label-default">題目</span>&nbsp;&nbsp;&nbsp;' + data.quiz[quizIndex].title + '</h2>');
            for (var i = 0; i < 4; i++) {
                $('#testing-area').append('<a option="' + i + '" id="option' + i + '">' + data.quiz[quizIndex].option[i] + '</a>');
            };
            lastOptionList = data.quiz[quizIndex].option

        } else {
            $('#testing-area').append('<h2>所有題目皆已作答</h2>');
        }

        correctAns = data.quiz[quizIndex].ans - 1
        console.log(correctAns)

        $('#testing-area a').attr('class', 'btn btn-info')
        $('#testing-area a').click(function(event) {
            quizIndex++
            enteredAns = $('#' + event.target.id).attr('option')
            console.log(enteredAns)
            checkAns()
            init()
        })

    }


});
