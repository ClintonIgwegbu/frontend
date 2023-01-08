import React, { FunctionComponent } from 'react';
import styles from '@styles/components/TrimBar.module.scss';

function controlFromSlider() {
  const [from, to] = getParsed();
  fillSlider('#C6C6C6', '#25daa5');
  // if (from > to) {
  //   fromSlider.props.value = to.toString();
  // } else {
  // }
}

function controlToSlider() {
  const [from, to] = getParsed();
  fillSlider('#C6C6C6', '#25daa5');
  setToggleAccessible();
  // if (from <= to) {
  //   toSlider.props.value = to.toString();
  // } else {
  //   toSlider.props.value = from.toString();
  // }
}

function getParsed() {
  const from = parseInt(fromSlider.props.value as string, 10);
  const to = parseInt(toSlider.props.value as string, 10);
  return [from, to];
}

function fillSlider(sliderColor: string, rangeColor: string) {
  const rangeDistance =
    parseInt(toSlider.props.max as string) - parseInt(toSlider.props.min as string);
  const fromPosition =
    parseInt(fromSlider.props.value as string) - parseInt(toSlider.props.min as string);
  const toPosition =
    parseInt(toSlider.props.value as string) - parseInt(toSlider.props.min as string);
  if (toSlider.props.style) {
    toSlider.props.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
  }
}

function setToggleAccessible() {
  if (toSlider.props.style) {
    if (Number(toSlider.props.value) <= 0) {
      toSlider.props.style.zIndex = 2;
    } else {
      toSlider.props.style.zIndex = 0;
    }
  }
}

const fromSlider = (
  <input
    className={`${styles.fromSlider}`}
    onInput={() => controlFromSlider()}
    type='range'
    // value='10'
    min='0'
    max='100'
  />
);

const toSlider = (
  <input
    className={`${styles.toSlider}`}
    onInput={() => controlToSlider()}
    type='range'
    // value='40'
    min='0'
    max='100'
  />
);

fillSlider('#C6C6C6', '#25daa5');
setToggleAccessible();

const TrimBar: FunctionComponent = () => {
  const leftCap = <div className={`${styles.leftCap}`} />;
  const mid = <div className={`${styles.midSection}`} />;
  const rightCap = <div className={`${styles.rightCap}`} />;

  const bar = <div className={`${styles.bar}`} />;

  return (
    // <div className={`${styles.trimBar}`}>
    //   {leftCap}
    //   {mid}
    //   {rightCap}
    // </div>
    // <>{bar}</>
    <div className={`${styles.slidersControl}`}>
      <>
        {fromSlider}
        {toSlider}
      </>
    </div>
  );
};

export default TrimBar;
