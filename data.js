var JSON_URL = 'https://rawgit.com/bobby1030/6561d1fe087a0b4fb21b/raw/786ab26cb7aead2b0d2421b9a631935a92aee05b/FinanceKnowledge.json'
var correct = 0,
    wrong = 0




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

    function randomNum(max) {
        return Math.floor(Math.random() * max);
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
        } else if (score == 'wrong') {
            wrong++
        }
        $('#scoreBoard').html('<h3><span class="label label-default">成績</span>&nbsp;&nbsp;&nbsp;正確：' + correct + ' / 錯誤：' + wrong + ' / 總題數：' + (correct + wrong))
    }

    function init() {
        var quizIndex = ar.pop()
        $('#testing-area').html('')
        if (quizIndex != undefined) {
            $('#testing-area').append('<h2><span class="label label-default">題目</span>&nbsp;&nbsp;&nbsp;' + data.quiz[quizIndex].title + '</h2>');
            for (var i = 0; i < 4; i++) {
                $('#testing-area').append('<a option="' + i + '" id="option' + i + '">' + data.quiz[quizIndex].option[i] + '</a>');
            };
        }else{
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
