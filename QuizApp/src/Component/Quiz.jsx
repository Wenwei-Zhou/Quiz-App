import { useState, useCallback } from "react"
import Question from "../Question.js";
// import QuestionTimer from "./QuestionTimer.jsx";
// import Answer from "./Answer.jsx";
import QuestionModal from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

    
    
    // const [answerState, setAnswerState] = useState('');
    // 记录当前答案状态，可能的值有 'answered'、'correct'、'wrong' 或 ''（空字符串表示未回答或正在倒计时）。

    const [userAnswers, setUserAnswers] = useState([]); // 记录用户的答案，初始为空数组。
    const activeQuestionIndex = userAnswers.length; // 数着一共回答了多少问题

    // const activeQuestionIndex = answerState === '' 
    //     ? userAnswers.length 
    //     : userAnswers.length - 1; 
    // 数着一共回答了多少问题
    // 如果当前答案状态为空字符串, 则活动问题索引等于用户答案长度。
    // 如果当前答案状态不为空字符串, 则活动问题索引等于用户答案长度减一。
    // 这样可以确保在回答完当前问题后，activeQuestionIndex 会指向下一个问题。
    // 例如，如果用户回答了3个问题，
    // 当 answerState 为空时，activeQuestionIndex 为3，表示下一个问题是第4个问题。
    // 如果用户正在回答第3个问题，answerState 不为空，则 activeQuestionIndex 为2，表示当前正在回答第3个问题。
    // 确保如果当前答案状态为空字符串, 则活动问题索引等于用户答案长度。
//     | 状态                                 | activeQuestionIndex            |
// | ----------------                        | ------------------------------ |
// | 当前还没答题（或正在倒计时）                 | 当前是第 `userAnswers.length` 题    |
// | 正在作答（刚选了答案，还没切题， 还在显示反馈） | 当前是 `userAnswers.length - 1` 题 |


    const quizIsComplete = activeQuestionIndex === Question.length;
    // 检查测验是否完成，如果当前回答的问题数量等于总问题数量（activeQuestionIndex === Question.length），则测验完成。
    // quizIsComplete 是一个boolean，表示测验是否完成。如果activeQuestionIndex === Question.length，说明用户已经回答了所有问题，quizIsComplete 为 true，否则为 false。

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        // setAnswerState('answered');
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });

        // setTimeout(() => {
        //     if (selectedAnswer === Question[activeQuestionIndex].answers[0]) { // Question.js里面的answer，放在第一个的是正确答案
        //         setAnswerState('correct');
        //     } else {
        //         setAnswerState('wrong');
        //     }

        //     setTimeout(() => {
        //         setAnswerState('');
        //     }, 2000); // 2秒后清除答案状态，重新设置为''

        // }, 1000);

    // }, [activeQuestionIndex]);
    }, []);
    // 更新 userAnswers 数组，添加新答案｡

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return(
            <Summary userAnswers={userAnswers} />
        )
    }

    // 这是因为我们确实检查了quizIsComplete,
    // 然后输出了一个不同的组件｡
    // 但在此之前, 甚至在我生成这个quizIsComplete值之前,
    // 我已经在尝试访问这里的activeQuestionIndex来获取我的答案, 我想打乱它｡
    // 但是如果测验完成了, 这将失败, 因为我们已经问完了所有的问题｡

    
    

    return(
        <div id="quiz">
            <QuestionModal
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                // questionText={Question[activeQuestionIndex].text}
                // answers={Question[activeQuestionIndex].answers} // 这里假设第一个答案是正确的
                onSelectAnswer={handleSelectAnswer}
                // selectedAnswer={userAnswers[userAnswers.length - 1]}
                // answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}

// const [userAnswers, setUserAnswers] = useState([]);

// const activeQuestionIndex = userAnswers.length;

// 每答一个问题，userAnswers 数组长度增加，activeQuestionIndex 变化，整个 Quiz 组件会重新渲染。

// 同时，QuestionTimer 的 key 属性设置为 activeQuestionIndex，每次换问题时 key 变化，React 会卸载旧的计时器组件并重新挂载新的，这样计时器会重置。

// 所以，每答一个问题或跳过一个问题，都会重新渲染并重置相关子组件。



// 怎么跳到下一题的？？？？？？
// 通过点击答案按钮或跳过按钮，调用 handleSelectAnswer 函数，更新 userAnswers 数组，activeQuestionIndex 也随之更新，触发组件重新渲染，显示下一题。
// activeQuestionIndex是数字（index），表示当前正在回答的题目索引。每次用户选择答案或跳过题目时，activeQuestionIndex会增加1，Quiz组件会根据新的activeQuestionIndex渲染对应的题目和答案选项。
// 这样，Quiz 组件会根据新的 activeQuestionIndex 渲染对应的题目和答案选项，同时 QuestionTimer 组件也会重置计时器。
// 通过这种方式，Quiz 组件实现了题目切换和计时器重置的功能。
// 这样，Quiz 组件实现了题目切换和计时器重置的功能。




// 为什么用useCallback？？？？？？
// 重新渲染时生成新的函数实例会影响依赖这些函数的子组件或 useEffect。

// 比如你的 QuestionTimer 组件：

// onTimeOut 是父组件传来的函数。
// 在 QuestionTimer 里，useEffect 依赖 [timeout, onTimeOut]。
// 如果 onTimeOut 每次渲染都变（因为是新函数），useEffect 就会每次都重新执行，定时器会被清除再重建，导致计时器不稳定或重置。
// 总结：
// 如果函数引用不稳定，React 认为它“变了”，相关副作用（如定时器）就会反复重启，影响功能和性能。
// 用 useCallback 可以让函数引用保持不变，避免这些问题。

// 虽然新生成的函数“内容”一样，但内存地址不一样，React 会认为它是不同的函数。

// 在 React 里，props 变化是通过“引用对比”判断的。即使函数逻辑一样，只要是新生成的，引用就变了。
// 如果子组件的 useEffect 依赖这个函数（比如 onTimeOut），每次父组件重新渲染，子组件的 useEffect 都会重新执行，导致副作用（如定时器）被重置。

// 用 useCallback 可以让函数引用保持稳定，这样只有真正依赖变化时才会触发副作用，避免不必要的重置和性能浪费。