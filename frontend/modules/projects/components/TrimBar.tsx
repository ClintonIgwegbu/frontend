import styles from '@styles/components/TrimBar.module.scss';
import { FormEventHandler, FunctionComponent, MouseEventHandler, useRef, useState } from 'react';

const TrimBar: FunctionComponent = () => {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(100);
  const leftValueRef = useRef<HTMLSpanElement>(null);
  const rightValueRef = useRef<HTMLSpanElement>(null);
  const sliderValuesRef = useRef<HTMLDivElement>(null);
  const miniGap = 1;

  //   window.onload = () => {
  //     if (leftValueRef.current) {
  //       leftValueRef.current.textContent = leftValue.toString();
  //     }
  //     if (rightValueRef.current) {
  //       rightValueRef.current.textContent = rightValue.toString();
  //     }
  //   };

  const onLeftSliderInput: FormEventHandler<HTMLInputElement> = event => {
    const left = parseInt(event.currentTarget.value);
    const limit = rightValue - miniGap;
    if (left > limit) {
      event.currentTarget.value = limit.toString();
      setLeftValue(limit);
    } else {
      setLeftValue(left);
    }
    if (leftValueRef.current) {
      leftValueRef.current.textContent = event.currentTarget.value;
    }
  };

  const onRightSliderInput: FormEventHandler<HTMLInputElement> = event => {
    const right = parseInt(event.currentTarget.value);
    const limit = leftValue + miniGap;
    if (right < limit) {
      event.currentTarget.value = limit.toString();
      setRightValue(limit);
    } else {
      setRightValue(right);
    }
    if (rightValueRef.current) {
      rightValueRef.current.textContent = event.currentTarget.value;
    }
  };

  const showSliderValues: MouseEventHandler<HTMLInputElement> = event => {
    if (sliderValuesRef.current) {
      sliderValuesRef.current.style.opacity = '0.8';
    }
  };

  const hideSliderValues: MouseEventHandler<HTMLInputElement> = event => {
    if (sliderValuesRef.current) {
      sliderValuesRef.current.style.opacity = '0';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderValues} ref={sliderValuesRef}>
        <span ref={leftValueRef}>0</span>
        <span> - </span>
        <span ref={rightValueRef}>100</span>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack} />
        <input
          type='range'
          className={styles.slider}
          min={0}
          max={100}
          defaultValue={0}
          onInput={onLeftSliderInput}
          onMouseDown={showSliderValues}
          onMouseUp={hideSliderValues}
          style={{
            background: `linear-gradient(to right, transparent ${leftValue}%, var(--primary) ${leftValue}%, var(--primary) ${rightValue}%, transparent ${rightValue}%)`
          }}
        />
        <input
          type='range'
          className={styles.slider}
          min={0}
          max={100}
          defaultValue={100}
          onInput={onRightSliderInput}
          onMouseDown={showSliderValues}
          onMouseUp={hideSliderValues}
        />
      </div>
    </div>
  );
};

export default TrimBar;
