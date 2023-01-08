import React, { FunctionComponent } from 'react';
import { ButtonSize, ButtonStyle, ButtonType } from '../types/buttonTypes';
import styles from '@styles/components/Button.module.scss';

const STYLES = [styles.btnPrimary, styles.btnOutline, styles.btnTab];

type ButtonProps = {
  label: string;
  onClick?: () => void;
  buttonStyle: ButtonStyle;
  buttonSize: ButtonSize;
  disabled?: boolean;
  type?: ButtonType;
};

const styleToCssClass: Record<ButtonStyle, string> = {
  [ButtonStyle.Primary]: `${styles.btnPrimary}`,
  [ButtonStyle.Outline]: `${styles.btnOutline}`,
  [ButtonStyle.Tab]: `${styles.btnTab}`,
  [ButtonStyle.NoBackground]: `${styles.btnNoBackground}`,
  [ButtonStyle.Cancel]: `${styles.btnCancel}`,
  [ButtonStyle.FormSubmit]: `${styles.btnPrimary}`
};

const sizeToCssClass: Record<ButtonSize, string> = {
  [ButtonSize.Minimal]: `${styles.btnMinimal}`,
  [ButtonSize.Small]: `${styles.btnSmall}`,
  [ButtonSize.Medium]: `${styles.btnMedium}`,
  [ButtonSize.Large]: `${styles.btnLarge}`
};

// Notice how Button is a const that we export while navbar is a function then the export line is at the bottom
const Button: FunctionComponent<ButtonProps> = ({
  label,
  onClick,
  buttonStyle,
  buttonSize,
  disabled = false,
  type = ButtonType.Button
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styleToCssClass[buttonStyle]} ${sizeToCssClass[buttonSize]}`}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
