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

const ButtonLink: FunctionComponent<ButtonProps> = ({ label, href, buttonStyle, buttonSize }) => {
  return (
    <button
      className={`${styles.btn} ${styleToCssClass[buttonStyle]} ${sizeToCssClass[buttonSize]}`}>
      <Link href={href}>{label}</Link>
    </button>
  );
};

export default ButtonLink;
