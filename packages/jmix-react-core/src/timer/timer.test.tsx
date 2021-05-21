import React from 'react';
import {useTimer} from "./timer";
import TestRenderer from 'react-test-renderer';

let closureTimerStart: () => void;
let closureTimerStop: () => void;
let testedCallback: () => void;
const testedDelay = 1000;
const timerExecuteTime = 5000;

interface TestedProps {
  delay: number,
  callback: () => void,
  autostart?: boolean, 
  repeating?: boolean
}
const TestedCompWithUseTimer: React.FC<TestedProps> = ({delay, callback, autostart, repeating}) => {
  const {start, stop} = useTimer(delay, callback, autostart, repeating);
  closureTimerStart = start;
  closureTimerStop = stop;
  return (
    <div>
      some test content
    </div>
  )
}

describe("useTimer works correctly with setTImeout",() => {
  beforeEach(() => {
    jest.useFakeTimers();
    testedCallback = jest.fn();
  });

  it('autostart works correctly', () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <TestedCompWithUseTimer
          delay={testedDelay}
          callback={testedCallback}
          autostart={true}
        />
      )

      expect(setTimeout).toHaveBeenCalledTimes(1);
    })

    expect(testedCallback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), testedDelay);

    TestRenderer.act(() => {
      jest.runAllTimers();
      expect(setTimeout).toHaveBeenCalledTimes(3);
    })

    expect(testedCallback).toBeCalled();
    expect(testedCallback).toHaveBeenCalledTimes(1);
  })

  it('start() works correctly', () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <TestedCompWithUseTimer
          delay={testedDelay}
          callback={testedCallback}
        />
      )
    })

    expect(testedCallback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      closureTimerStart();
      jest.runAllTimers();
    })

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(testedCallback).toBeCalled();
    expect(testedCallback).toHaveBeenCalledTimes(1);
  })

  it('several start() calls works correctly', () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <TestedCompWithUseTimer
          delay={testedDelay}
          callback={testedCallback}
        />
      )
    })

    expect(testedCallback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      for (let i = 1; i <= 100; i++){
        closureTimerStart();
      }
      jest.runAllTimers();
    })

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(testedCallback).toBeCalled();
    expect(testedCallback).toHaveBeenCalledTimes(1);
  })

  it('stop() works correctly', () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <TestedCompWithUseTimer
          delay={testedDelay}
          callback={testedCallback}
        />
      )
    })

    expect(testedCallback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      closureTimerStart();
      closureTimerStop();
      jest.runAllTimers();
    })

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(testedCallback).not.toBeCalled();
  })

  it('call start() works correctly after stop() call', () => {
    TestRenderer.act(() => {
      TestRenderer.create(
        <TestedCompWithUseTimer
          delay={testedDelay}
          callback={testedCallback}
        />
      )
    })

    expect(testedCallback).not.toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      closureTimerStart();
      closureTimerStop();
      closureTimerStart();
      jest.runAllTimers();
    })

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(testedCallback).toBeCalled();
    expect(testedCallback).toHaveBeenCalledTimes(1);
  })

  describe("useTimer works correctly with setInterval",() => {
    beforeEach(() => {
      jest.useFakeTimers();
      testedCallback = jest.fn();
    });
  
    it('autostart works correctly', () => {
      TestRenderer.act(() => {
        TestRenderer.create(
          <TestedCompWithUseTimer
            delay={testedDelay}
            callback={testedCallback}
            autostart={true}
            repeating={true}
          />
        )
      })
  
      expect(testedCallback).not.toBeCalled();
  
      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(testedCallback, testedDelay);
  
      jest.advanceTimersByTime(timerExecuteTime);
      expect(testedCallback).toBeCalled();
      expect(testedCallback).toHaveBeenCalledTimes(5);
    })
  
    it('start() works correctly', () => {
      TestRenderer.act(() => {
        TestRenderer.create(
          <TestedCompWithUseTimer
            delay={testedDelay}
            callback={testedCallback}
            repeating={true}
          />
        )
      })
  
      expect(testedCallback).not.toBeCalled();
  
  
      TestRenderer.act(() => {
        closureTimerStart();
      })

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(testedCallback, testedDelay);

      jest.advanceTimersByTime(timerExecuteTime);
  
      expect(testedCallback).toBeCalled();
      expect(testedCallback).toHaveBeenCalledTimes(5);
    })
  
    it('several start() calls works correctly', () => {
      TestRenderer.act(() => {
        TestRenderer.create(
          <TestedCompWithUseTimer
            delay={testedDelay}
            callback={testedCallback}
            repeating={true}
          />
        )
      })
  
      expect(testedCallback).not.toBeCalled();

      TestRenderer.act(() => {
        for (let i = 1; i <= 100; i++){
          closureTimerStart();
        }
      })

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(testedCallback, testedDelay);

      jest.advanceTimersByTime(timerExecuteTime);

      expect(testedCallback).toBeCalled();
      expect(testedCallback).toHaveBeenCalledTimes(5);
    })
  
    it('stop() works correctly', () => {
      TestRenderer.act(() => {
        TestRenderer.create(
          <TestedCompWithUseTimer
            delay={testedDelay}
            callback={testedCallback}
            repeating={true}
          />
        )
      })
  
      expect(testedCallback).not.toBeCalled(); 
  
      TestRenderer.act(() => {
        closureTimerStart();
        closureTimerStop();
      })
  
      expect(setInterval).toHaveBeenCalledTimes(0);
      jest.advanceTimersByTime(timerExecuteTime);
      expect(testedCallback).not.toBeCalled();
    })

    it('call start() works correctly after stop() call', () => {
      TestRenderer.act(() => {
        TestRenderer.create(
          <TestedCompWithUseTimer
            delay={testedDelay}
            callback={testedCallback}
            repeating={true}
          />
        )
      })
  
      expect(testedCallback).not.toBeCalled(); 
  
      TestRenderer.act(() => {
        closureTimerStart();
        closureTimerStop();
        closureTimerStart();
      })
  
      expect(setInterval).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(timerExecuteTime);
      expect(testedCallback).toBeCalled();
      expect(testedCallback).toHaveBeenCalledTimes(5);
    })
  })
})
