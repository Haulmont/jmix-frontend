import { useState, useEffect, useCallback } from "react";

interface TimerHookControls {
  start: () => void, 
  stop: () => void
}

type TimerId = ReturnType<typeof setTimeout | typeof setInterval>;

type TimerHook = (
  delay: number,
  callback: () => void,
  autostart?: boolean, 
  repeating?: boolean
) => TimerHookControls;

/**
 * This hook is used for creaiting and manipulating custom 
 * timers (setTimeout, setInterval) in functional React components.
 * useTimer hook returns object with start and stop method (to run and stop timer).
 * 
 * @example
 *  const CustomComponent: React.FC = () => {
 *    const {start, stop} = useTimer(1000, () => console.log('custom callback'));
 *    return (
 *      <>
 *        <button onClick={start}>
 *          Start timer
 *        </button>
 *        <button onClick={stop}>
 *          Stop timer
 *        </button>
 *      </>
 *    )
 *  }
 * 
 * @param {number} delay delay time to run callback in setTimeout/setInterval.
 * @param {function} callback to be passed to setTimeout/setInterval as callback.
 * @param {boolean} autostart When it true, timer will be ran without start() call.
 * @param {boolean} repeating When it true, timer will use setInterval (false - setTimeout).
 *
 * @returns {TimerHookControls} object with start and stop method to control timer
 */
export const useTimer: TimerHook = (...timerHookArgs) => {
  const [delay, callback, autostart = false, repeating = false] = timerHookArgs;
  const [isTimerInProgress, setTimerToInProgress] = useState<boolean>(autostart);
  const [timerId, setTimerId] = useState<TimerId>();

  const startTimer = useCallback(() => {
    if(repeating) {
      setTimerId(setInterval(callback, delay));
      return;
    }

    setTimerId(setTimeout(
      () => {
        callback();
        setTimerToInProgress(false);
      }, delay));
  }, [repeating, delay, callback])

  const clearTimer = useCallback(() => {
    if(repeating) {
      clearInterval(timerId!)
      return;
    }
    clearTimeout(timerId!);
  }, [repeating, timerId])

  useEffect(() => {
    isTimerInProgress ? startTimer() : clearTimer();
  }, [clearTimer, isTimerInProgress, startTimer]);


  return {
   start: () => {
      setTimerToInProgress(true);
    },
    stop: () => {
      setTimerToInProgress(false);
    }
  }
};
