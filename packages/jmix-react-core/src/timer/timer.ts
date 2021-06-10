import { useState, useEffect, useCallback } from "react";

interface TimerHookControls {
  start: () => void, 
  stop: () => void
};

type TimerId = ReturnType<typeof setTimeout | typeof setInterval>;

type TimerHookOptions = {
  /**
   * Delay time to run callback in setTimeout/setInterval
   */
  delay: number,
  /**
   * To be passed to setTimeout/setInterval as callback
   */
  callback: () => void,
  /**
   * When it true, timer will be ran without start() call
   */
  autostart?: boolean, 
  /**
   * When it true, timer will use setInterval (false - setTimeout)
   */
  repeating?: boolean
}
type TimerHook = (options: TimerHookOptions) => TimerHookControls;

/**
 * This hook is used for creaiting and manipulating custom 
 * timers (setTimeout, setInterval) in functional React components.
 * useTimer hook returns object with start and stop method (to run and stop timer).
 * 
 * @example
 *  const CustomComponent: React.FC = () => {
 *    const {start, stop} = useTimer({
 *      delay: 1000, 
 *      callback: () => console.log('custom callback')
 *    });
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
 * @param {TimerHookOptions} options object with settings params: delay, callback, autostart, repeating.
 *
 * @returns {TimerHookControls} object with start and stop method to control timer
 */
export const useTimer: TimerHook = ({delay, callback, autostart = false, repeating = false}) => {
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
    return () => {
      clearTimer();
    }
  }, []);

  useEffect(() => {
    isTimerInProgress ? startTimer() : clearTimer();
  }, [isTimerInProgress]);

  return {
   start: () => {
      setTimerToInProgress(true);
    },
    stop: () => {
      setTimerToInProgress(false);
    }
  }
};
