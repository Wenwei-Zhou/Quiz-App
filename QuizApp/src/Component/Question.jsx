import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answer from "./Answer.jsx";
import Question from "../Question.js";


export default function QuestionModal({
        index,
        onSelectAnswer, 
        onSkipAnswer,
    }) {

        const [answer, setAnswer] = useState({
            selectedAnswer: '',
            isCorrect: null
        });

        let timer = 10000; // 默认倒计时10秒

        if (answer.selectedAnswer) {
            timer = 1000;
        }
        // 如果用户已经选择了答案，则倒计时为1秒

        if (answer.isCorrect !== null) {
            timer = 2000;
        }
        // 如果用户已经选择了答案并且答案状态已确定（正确或错误），则倒计时为2秒

        function handleSelectAnswer(answer) {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: null
            })

            setTimeout(() => {
                setAnswer({
                    selectedAnswer: answer,
                    isCorrect: Question[index].answers[0] === answer
                })

                setTimeout(() => {
                    onSelectAnswer(answer);
                }, 2000);
            }, 1000);
        }
        // 1秒后设置答案状态为正确或错误，然后再2秒后调用 onSelectAnswer 函数

        let answerState = '';

        if (answer.selectedAnswer && answer.isCorrect !== null) {
            answerState = answer.isCorrect ? 'correct' : 'wrong';
        } else if (answer.selectedAnswer) {
            answerState = 'answered';
        }
    return (
        <div id="question">
            <QuestionTimer 
            // key={activeQuestionIndex}
            key={timer}
            timeout={timer} 
            onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
            mode={answerState}
            />
            <h2>{Question[index].text}</h2>
            <Answer 
                // key={activeQuestionIndex}
                answers={Question[index].answers} 
                selectedAnswer={answer.selectedAnswer} 
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}