import React, { FunctionComponent, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import styles from '@styles/components/Scripts.module.scss';
import { AnnotationType } from '../types/AnnotationType';

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
  iconType: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
};

type ToolbarProps = {
  textEditor: Editor | null;
  className: string;
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ textEditor, className }) => {
  const setLink = useCallback(() => {
    if (textEditor === null) {
      return;
    }

    const previousUrl = textEditor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      textEditor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    textEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [textEditor]);

  const setAnnotation = useCallback(
    (annotationType: AnnotationType) => {
      if (textEditor === null) {
        return;
      }

      const annotationId = window.prompt('Enter the annotation ID');

      // cancelled
      if (annotationId === null || annotationId === '') {
        return;
      }

      // update link
      textEditor
        .chain()
        .focus()
        .setAnnotation({ annotationId: annotationId, annotationType: annotationType })
        .run();
    },
    [textEditor]
  );

  // TODO: One possibility is that we can link to a next API which simply calls a function that changes the src of the bRollPreview.
  const setVideo = useCallback(() => {
    if (textEditor === null) {
      return;
    }

    const previousVideoPath = textEditor.getAttributes('link').href;
    const videoPath = window.prompt('videoPath', previousVideoPath);

    // cancelled
    if (videoPath === null) {
      return;
    }

    // empty
    if (videoPath === '') {
      textEditor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    textEditor.chain().focus().extendMarkRange('link').setLink({ href: videoPath }).run();
  }, [textEditor]);

  const saveText = useCallback(() => {
    if (textEditor !== null) {
      console.log(textEditor.getHTML());
    }
  }, [textEditor]);

  const buttonProps: ButtonProps[] = textEditor
    ? [
        {
          onClick: () => textEditor.chain().focus().toggleBold().run(),
          className: `${textEditor.isActive('bold') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-bold',
          tooltip: 'Bold'
        },
        {
          onClick: () => textEditor.chain().focus().toggleItalic().run(),
          className: `${textEditor.isActive('italic') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-italic',
          tooltip: 'Italic'
        },
        {
          onClick: () => textEditor.chain().focus().toggleUnderline().run(),
          className: `${textEditor.isActive('underline') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-underline',
          tooltip: 'Underline'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('left').run(),
          className: `${textEditor.isActive('textAlign', 'left') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-left',
          tooltip: 'Left align'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('center').run(),
          className: `${textEditor.isActive('textAlign', 'center') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-center',
          tooltip: 'Center align'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('right').run(),
          className: `${textEditor.isActive('textAlign', 'right') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-right',
          tooltip: 'Right align'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('justify').run(),
          className: `${textEditor.isActive('textAlign', 'justify') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-justify',
          tooltip: 'Justify'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 1 }).run(),
          className: `${textEditor.isActive('heading', { level: 1 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-1',
          tooltip: 'Heading 1'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 2 }).run(),
          className: `${textEditor.isActive('heading', { level: 2 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-2',
          tooltip: 'Heading 2'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 3 }).run(),
          className: `${textEditor.isActive('heading', { level: 3 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-3',
          tooltip: 'Heading 3'
        },
        {
          onClick: () => textEditor.chain().focus().setParagraph().run(),
          className: `${textEditor.isActive('paragraph') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-paragraph',
          tooltip: 'Paragraph'
        },
        {
          onClick: () => textEditor.chain().focus().toggleBulletList().run(),
          className: `${textEditor.isActive('bulletList') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-list-unordered',
          tooltip: 'Bulleted list'
        },
        {
          onClick: () => textEditor.chain().focus().toggleOrderedList().run(),
          className: `${textEditor.isActive('orderedList') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-list-ordered',
          tooltip: 'Numbered list'
        },
        {
          onClick: () => textEditor.chain().focus().toggleBlockquote().run(),
          className: `${textEditor.isActive('blockquote') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-double-quotes-l',
          tooltip: 'Block quote'
        },
        {
          onClick: () => textEditor.chain().focus().undo().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-arrow-go-back-fill',
          tooltip: 'Undo'
        },
        {
          onClick: () => textEditor.chain().focus().redo().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-arrow-go-forward-fill',
          tooltip: 'Redo'
        },
        {
          onClick: setLink,
          className: `${textEditor.isActive('link') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-link',
          tooltip: 'Insert link'
        },
        {
          onClick: () => textEditor.chain().focus().unsetLink().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-link-unlink',
          disabled: !textEditor.isActive('link'),
          tooltip: 'Remove link'
        },
        {
          onClick: () => setAnnotation(AnnotationType.Comment),
          className: `${styles.btnEditor}`,
          iconType: 'ri-chat-new-fill',
          tooltip: 'Add comment'
        },
        {
          onClick: () => setAnnotation(AnnotationType.BRoll),
          className: `${styles.btnEditor}`,
          iconType: 'ri-film-fill',
          tooltip: 'Link b-roll'
        },
        {
          onClick: saveText,
          className: `${styles.btnEditor}`,
          iconType: 'ri-save-fill',
          tooltip: 'Save'
        }
      ]
    : [];

  const buttons = buttonProps.map(prop => (
    <div key={prop.iconType + prop.label} className={styles.buttonWrapper}>
      <button
        key={prop.iconType + prop.label}
        onClick={prop.onClick}
        className={prop.className}
        disabled={prop.disabled}>
        <div>
          <i className={prop.iconType} /> {prop.label}
        </div>
      </button>
      <div className={styles.tooltip}>
        <span>{prop.tooltip}</span>
      </div>
    </div>
  ));

  const label = <i className='ri-double-quotes-l' />;

  return <div className={className}>{buttons}</div>;
};

export default Toolbar;
