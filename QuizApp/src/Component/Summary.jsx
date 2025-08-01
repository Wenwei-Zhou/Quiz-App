import quizComplete from '../assets/quiz-complete.png';
import Question from '../Question.js';

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === Question[index].answers[0]
    );

    const skippedAnswersShare = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    );

    const correctAnswersShare = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    );

    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    // 计算成绩

    return (
            <div id="summary">
                <img src={quizComplete} alt="complete" />
                <h1>Quiz Completed!</h1>
                <div id="summary-stats">
                    <p>
                        <span className='number'>{skippedAnswersShare}%</span>
                        <span className='text'>skipped</span>
                    </p>
                    <p>
                        <span className='number'>{correctAnswersShare}%</span>
                        <span className='text'>answered correctly</span>
                    </p>
                    <p>
                        <span className='number'>{wrongAnswersShare}%</span>
                        <span className='text'>answered incorrectly</span>
                    </p>
                </div>
                <ol>
                    {userAnswers.map((answer, index) => {
                        let cssClass = 'user-answer';

                        if (answer === null) {
                            cssClass += ' skipped';
                        } else if (answer === Question[index].answers[0]) {
                            cssClass += ' correct';
                        } else {
                            cssClass += ' wrong'; // //空格是确保和cssClass不会站在一起。（className = 'user-answer wrong'）
                        }
                        return (
                            <li key={index}>
                                <h3>{index + 1}</h3>
                                <p className='question'>{Question[index].text}</p>
                                <p className={cssClass}>{answer}</p>
                            </li>
                        )
                    })}
                </ol>
            </div>
    )
}