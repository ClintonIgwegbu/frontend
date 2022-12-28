import React, { FunctionComponent } from 'react';
import styles from '@styles/components/TrimBar.module.scss';

const TrimBar: FunctionComponent = () => {
  const leftCap = <div className={`${styles.leftCap}`}></div>;
  const mid = <div className={`${styles.midSection}`}></div>;
  const rightCap = <div className={`${styles.rightCap}`}></div>;

  return (
    <div className={`${styles.trimBar}`}>
      {leftCap}
      {mid}
      {rightCap}
    </div>
  );
};

export default TrimBar;
