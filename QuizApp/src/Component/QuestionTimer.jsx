import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('setting timeout')
        const timer = setTimeout(onTimeOut, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeOut]);

    useEffect(() => {
        if (remainingTime <= 0) return;
        console.log('setting internval')
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);
    // 这里的依赖项是空的, 因为每回答一个问题，都会重新渲染，重新渲染时会重新执行一遍｡
    
    // 这段 useEffect 的作用是：组件挂载时启动一个定时器，每隔 100 毫秒让 remainingTime 减少 100。
    // [] 作为依赖数组，表示只在组件挂载和卸载时运行一次。
    // setInterval 每 100ms 执行一次，让 remainingTime 递减 100。
    // clearInterval 在组件卸载时清除定时器，避免内存泄漏。
    // 每当组件重新渲染并且 useEffect 重新执行时，cleanup function会先运行，清理上一次的 interval，防止多个定时器同时存在或内存泄漏。
    // 如果 remainingTime <= 0，定时器不会启动。

    return (
        <progress max={timeout} value={remainingTime} className={mode} />
    )
}