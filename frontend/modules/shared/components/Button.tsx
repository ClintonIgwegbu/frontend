import Link from 'next/link';
import React, { FunctionComponent, ReactElement } from 'react';
import { ButtonSize, ButtonStyle } from '../types/buttonTypes';
import styles from '@styles/components/Button.module.scss';

const STYLES = [styles.btnPrimary, styles.btnOutline, styles.btnTab];

type ButtonProps = {
  label: string;
  href: string;
  buttonStyle: ButtonStyle;
  buttonSize: ButtonSize;
};

const styleToCssClass: Record<ButtonStyle, string> = {
  [ButtonStyle.Primary]: `${styles.btnPrimary}`,
  [ButtonStyle.Outline]: `${styles.btnOutline}`,
  [ButtonStyle.Tab]: `${styles.btnTab}`
};

const sizeToCssClass: Record<ButtonSize, string> = {
  [ButtonSize.Medium]: `${styles.btnMedium}`,
  [ButtonSize.Large]: `${styles.btnLarge}`
};

// Notice how Button is a const that we export while navbar is a function then the export line is at the bottom
const Button: FunctionComponent<ButtonProps> = ({ label, href, buttonStyle, buttonSize }) => {
  return (
    <button
      className={`${styles.btn} ${styleToCssClass[buttonStyle]} ${sizeToCssClass[buttonSize]}`}>
      <Link href={href}>{label}</Link>
    </button>
  );
};

export default Button;
