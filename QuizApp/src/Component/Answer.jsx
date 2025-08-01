import { useRef } from "react";

export default function Answer({answers, selectedAnswer, answerState, onSelect}) {

    const shuffledAnswers = useRef();
        // 使用 useRef 来存储打乱后的答案，避免每次渲染时都重新计算打乱顺序。
        // useRef 返回一个可变的 ref 对象，初始值为一个空数组。
        // 这个 ref 对象的 current 属性可以在组件的整个生命周期内保持不变。
        // 当 Quiz 组件重新渲染时，shuffledAnswers.current 仍然指向同一个数组引用，
        // 这样可以避免不必要的重新计算和性能开销。

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5); // 打乱答案选择顺序
    }

    return (
        <ul id="answers">
                    {shuffledAnswers.current.map((answer) => {
                        const isSelected = selectedAnswer === answer;
                        // isSelected 用于判断当前答案是否被选中
                        // selectedAnswer 是用户当前选择的答案
                        // answer 是当前遍历的答案，answer是在map里面每一个答案，然后和选的答案对一遍
                        // 检查当前答案是否被选中
                        // userAnswers[userAnswers.length - 1] 获取最新的用户答案
                        // 如果当前答案与最新的用户答案相同，则 isSelected 为 true
                        // 这样可以确保在用户选择答案后，正确地标记当前答案为选中状态
                        // 这对于在 UI 中高亮显示用户选择的答案非常有用
                        // 例如，如果用户选择了答案 "A"，则 isSelected 为 true，
                        // 这样可以在渲染时为该答案添加选中样式或类名
                        
                        let cssClass = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }
                        // 如果答案状态为 'answered' 并且(and)当前答案被选中，则设置 cssClass 为 'selected'

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }
                        // 如果答案状态为 'correct' 或 'wrong' 并且(and)当前答案被选中，则设置 cssClass 为答案状态

                        return (
                            <li key={answer} className="answer">
                                <button 
                                    onClick={() => onSelect(answer)}
                                    className={cssClass}
                                    disabled={answerState !== ''} // 禁用按钮，防止在回答状态不为空时再次点击
                                >
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>
    )
}