//READY FUNCTION
$(document).ready(function() {});

//STATE OBJECT
var state = {
    questionsAsked: [],
    score: []
};

//FUNCTIONS THAT CHANGE UI

//Here's the bulk of the program right here. It's a function that is a template string needed for the quiz
//so that we can dynamically create questions and answers on the fly.
var createQuestion = function(question, answer1, value1, answer2, value2, answer3, value3, answer4, value4) {
    $('.js-quiz-container').html(`
    <form class="js-quiz-form">
      <span class="js-question-span">${question}</span>
      <span><input type="radio" name="answer" value="${value1}" required>${answer1}</span></br>
      <span><input type="radio" name="answer" value="${value2}">${answer2}</span></br>
      <span><input type="radio" name="answer" value="${value3}">${answer3}</span></br>
      <span><input type="radio" name="answer" value="${value4}">${answer4}</span></br>
      <span class="js-buttons"><input type="submit" class="js-submit-answer-button" value="Submit">
      <input type="reset" class="js-restart-button" value="Restart"  onClick="window.location.reload()"></span>
    </form>
  `);
};
//This function hides all the divs but one and displays final score as well as a restart button
var endOfQuiz = function(score, divisor) {
    $('.js-last-question').addClass('hidden')
    $('.js-quiz-container').addClass('hidden');
    $('.js-score-container').addClass('hidden');
    $('.js-end-of-quiz').removeClass('hidden');
    $('.js-end-of-quiz').html("Your score: " + ((score / divisor) * 100) + "%" +
        `</br></br><input type="reset" class="js-restart-button" value="Restart"  onClick="window.location.reload()">`);
};
//This function determines whether the user was correct based on whether or not the correct argument === 1
//it then prints a reponse with red or green text
var wasUserCorrect = function(correct) {
    $('.js-last-question').removeClass('hidden')
    if (correct == 1) {
        $('.js-last-question').css({
            'color': 'green'
        }).text('Correct! Nice job!');
    } else {
        $('.js-last-question').css({
            'color': 'red'
        }).text('BOOOOOOO! Wrong answer!');
    }
};

//EVENT LISTENERS

//This event listener gets everything started. It hides itself, displays the quiz divs, and calls the createQuestion function once the button is clicked.
$('.js-begin-quiz-button').on('click', function(e) {
    $(this).addClass('hidden');
    $('.js-quiz-container').removeClass('hidden');
    $('.js-score-container').removeClass('hidden');
    questionStorage(0);
});
//This event listener is activated by the submit button. It's kind of long, so I'll explain the areas individually.
$('.js-quiz-container').submit(function(e) {
    e.preventDefault();
    //pushes a 1 to the state item for every question asked.. We use the length of the array to keep track of the question we are on.
    state.questionsAsked.push(1);
    //Stores the value of the selected radio button when submit was clicked. Correct answers equal 1.
    var answer = ($('input[name=answer]:checked').val());
    console.log(answer)
        //This if...else statement checks if the user was correct.
        //If the user was correct, push a 1 to the state item.. We use the length of that array to keep score.
    if (answer == 1) {
        state.score.push(1);
        $('.js-score').text('Current Score: ' + state.score.length + '/10');
        //Tells the user they were correct. Triggers the next question
        wasUserCorrect(1);
        questionIterator();
    } else {
        //Tells the user they were incorrect. Triggers the next question
        wasUserCorrect(0);
        questionIterator();
    }


});
//Basically a for-loop that iterates over the length of state.questionsAsked
//It then calls for the next question strictly based on the value of i
var questionIterator = function() {
    for (var i = 0; i <= state.questionsAsked.length; i++) {
        //console.log (state.questionsAsked.length)
        questionStorage(i);
    }
}
//A bunch of if...else if...else statements. Best way I could think of to store all the info.
//It stores the questions, all possible answers, and also adds a value of 1 to the correct answer.
var questionStorage = function(i) {
    if (i === 0) {
        createQuestion('1.) Learning is defined as a change in behavior as a result of what?',
            'Experience', 1,
            'Mistakes', 0,
            'Instruction', 0,
            'Confusion', 0);
    }
    else if (i === 1) {
        createQuestion('2.) What are the four Levels of Learning?',
            'Rote, Understanding, Application, Correlation', 1,
            'Rote, Understanding, Execution, Correlation', 0,
            'Rote, Confusion, Execution, Correlation', 0,
            'Memorization, Confusion, Execution, Correlation', 0);
    }
    else if (i === 2) {
        createQuestion('3.) What are the first three laws of learning?',
            'Primacy, Intensity, Recency', 0,
            'Exercise, Readiness, Effect', 0,
            'Readiness, Effect, Exercise', 1,
            'Readiness, Effect, Primacy', 0);
    }
    else if (i === 3) {
        createQuestion('4.) Who created the first three laws of learning?',
            'L. Ron Hubbard', 0,
            'George R.R. Martin', 0,
            'J.K. Rowling', 0,
            'E.L. Thorndike', 1);
    }
    else if (i === 4) {
        createQuestion('5.) What is the definition of primacy?',
            'Things that are first learned are best remembered', 1,
            'The quality of being intense', 0,
            'The state of being fully prepared for something', 0,
            'The quality or state of being recent', 0);
    }
    else if (i === 5) {
        createQuestion('6.) What is the first level of Maslows Hierarchy?',
            'Self-Esteem', 0,
            'Physiological Needs', 1,
            'Safety', 0,
            'Love and Belonging', 0);
    }
    else if (i === 6) {
        createQuestion('7.) What is the last level of Maslows Hierarchy of Human Needs?',
            'Self-Actualization', 1,
            'Safety', 0,
            'Self-Esteem', 0,
            'Physiological', 0);
    }
    else if (i === 7) {
        createQuestion('8.) What is the single greatest barrier to effective communication?',
            'Overuse of Abstractions', 0,
            'Confusion between the symbol and symbolized object', 0,
            'Lack of common experience', 1,
            'Interference', 0);
    }
    else if (i === 8) {
        createQuestion('9.) Which quote below describes the invulnerability hazardous attitude?',
            'Dont tell me what to do', 0,
            'Do something, QUICK!', 0,
            'Whats the use?', 0,
            'It wont happen to me', 1);
    }
    else if (i === 9) {
        createQuestion('10.) Which defense mechanism is defined as a refusal to accept external reality because it is too threatening?',
            'Reaction Formation', 0,
            'Compensation', 0,
            'Projection', 0,
            'Denial', 1);
    }
    else if (i === 10) {
        endOfQuiz(state.score.length, state.questionsAsked.length);
    }

}
