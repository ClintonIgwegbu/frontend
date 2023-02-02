import { FormEventHandler, FunctionComponent, useRef, useState } from 'react';
import styles from '@styles/components/Comments.module.scss';
import Button from '@modules/shared/components/Button';
import { ButtonSize, ButtonStyle, ButtonType } from '@modules/shared/types/buttonTypes';

type CommentFormProps = {
  submitLabel: string;
  handleSubmit: (text: string) => void;
  handleCancel?: () => void;
  hasSubmitButton: boolean;
  hasCancelButton: boolean;
  hasInlineCheckbox?: boolean;
  showControlsOnFocus?: boolean;
  initialText?: string;
  placeholder?: string;
};

const CommentForm: FunctionComponent<CommentFormProps> = ({
  submitLabel,
  handleSubmit,
  handleCancel,
  hasSubmitButton,
  hasCancelButton,
  hasInlineCheckbox = false,
  showControlsOnFocus = false,
  initialText = '',
  placeholder = ''
}) => {
  const [text, setText] = useState(initialText);
  const controlsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBorderBottomRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    handleSubmit(text);
    resetForm();
  };

  const resetForm = () => {
    if (showControlsOnFocus && controlsRef.current) {
      controlsRef.current.className = styles.commentFormControlsHidden;
    }
    inputRef.current?.blur();
    if (inputBorderBottomRef.current) {
      inputBorderBottomRef.current.className = styles.commentFormInputBorderBottom;
    }
    setText('');
  };

  const initialControlsClass = showControlsOnFocus
    ? styles.commentFormControlsHidden
    : styles.commentFormControls;

  const onFocus = () => {
    if (showControlsOnFocus && controlsRef.current) {
      controlsRef.current.className = styles.commentFormControls;
    }
    if (inputBorderBottomRef.current) {
      inputBorderBottomRef.current.className = styles.commentFormInputBorderBottomFocus;
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.commentForm}>
      <input
        className={styles.commentFormInput}
        value={text}
        placeholder={placeholder}
        onChange={e => setText(e.target.value)}
        onFocus={onFocus}
        ref={inputRef}
      />
      <div className={styles.commentFormInputBorderBottom} ref={inputBorderBottomRef} />
      <div className={initialControlsClass} ref={controlsRef}>
        {/* TODO: Disable this checkbox if no text is highlighted. */}
        {hasInlineCheckbox && (
          <div className={styles.commentFormCheckbox}>
            {/* <label>Inline</label> */}
            <input type='checkbox' ref={checkboxRef} />
          </div>
          // <Button
          //   label={'Inline Comment'}
          //   // onClick={handleCancel ?? resetForm}
          //   buttonStyle={ButtonStyle.Cancel}
          //   buttonSize={ButtonSize.Small}
          // />
        )}
        <div className={styles.commentFormButtons}>
          {hasCancelButton && (
            <Button
              label={'Cancel'}
              onClick={handleCancel ?? resetForm}
              buttonStyle={ButtonStyle.Cancel}
              buttonSize={ButtonSize.Small}
            />
          )}
          {hasSubmitButton && (
            <Button
              type={ButtonType.Submit}
              label={submitLabel}
              buttonStyle={ButtonStyle.FormSubmit}
              buttonSize={ButtonSize.Small}
              disabled={text === initialText}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
