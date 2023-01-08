import React, { FunctionComponent, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import styles from '@styles/components/Scripts.module.scss';

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
  iconType: string;
  label?: string;
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

  // TODO: Implement custom mark functionality for comment
  const setComment = useCallback(() => {
    if (textEditor === null) {
      return;
    }

    const commentId = window.prompt('Enter the comment ID');

    // cancelled
    if (commentId === null) {
      return;
    }

    // empty
    if (commentId === '') {
      textEditor.chain().focus().extendMarkRange('comment').unlinkComment().run();

      return;
    }

    // update link
    textEditor.chain().focus().extendMarkRange('comment').linkComment({ id: commentId }).run();
  }, [textEditor]);

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
          iconType: 'ri-bold'
        },
        {
          onClick: () => textEditor.chain().focus().toggleItalic().run(),
          className: `${textEditor.isActive('italic') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-italic'
        },
        {
          onClick: () => textEditor.chain().focus().toggleUnderline().run(),
          className: `${textEditor.isActive('underline') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-underline'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('left').run(),
          className: `${textEditor.isActive('textAlign', 'left') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-left'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('center').run(),
          className: `${textEditor.isActive('textAlign', 'center') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-center'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('right').run(),
          className: `${textEditor.isActive('textAlign', 'right') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-right'
        },
        {
          onClick: () => textEditor.chain().focus().setTextAlign('justify').run(),
          className: `${textEditor.isActive('textAlign', 'justify') ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-align-justify'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 1 }).run(),
          className: `${textEditor.isActive('heading', { level: 1 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-1'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 2 }).run(),
          className: `${textEditor.isActive('heading', { level: 2 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-2'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHeading({ level: 3 }).run(),
          className: `${textEditor.isActive('heading', { level: 3 }) ? 'is-active' : ''} ${
            styles.btnEditor
          }`,
          iconType: 'ri-h-3'
        },
        {
          onClick: () => textEditor.chain().focus().setParagraph().run(),
          className: `${textEditor.isActive('paragraph') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-paragraph'
        },
        {
          onClick: () => textEditor.chain().focus().toggleBulletList().run(),
          className: `${textEditor.isActive('bulletList') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-list-unordered'
        },
        {
          onClick: () => textEditor.chain().focus().toggleOrderedList().run(),
          className: `${textEditor.isActive('orderedList') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-list-ordered'
        },
        {
          onClick: () => textEditor.chain().focus().toggleBlockquote().run(),
          className: `${textEditor.isActive('blockquote') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-double-quotes-l'
        },
        {
          onClick: () => textEditor.chain().focus().undo().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-arrow-go-back-line'
        },
        {
          onClick: () => textEditor.chain().focus().redo().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-arrow-go-forward-fill'
        },
        {
          onClick: setLink,
          className: `${textEditor.isActive('link') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'ri-link'
        },
        {
          onClick: () => textEditor.chain().focus().unsetLink().run(),
          className: `${styles.btnEditor}`,
          iconType: 'ri-link-unlink',
          disabled: !textEditor.isActive('link')
        },
        {
          onClick: () => textEditor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run(),
          className: `${
            textEditor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''
          } ${styles.btnEditor}`,
          iconType: 'fas fa-highlighter',
          label: 'red'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHighlight({ color: '#ffc078' }).run(),
          className: `${
            textEditor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''
          } ${styles.btnEditor}`,
          iconType: 'fas fa-highlighter',
          label: 'orange'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHighlight().run(),
          // TODO: Edit the condition below - changes were made to use default yellow though the condition below probably
          // applies to all highlights
          className: `${textEditor.isActive('highlight') ? 'is-active' : ''} ${styles.btnEditor}`,
          iconType: 'fas fa-highlighter',
          label: 'yellow'
        },
        {
          onClick: () => textEditor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run(),
          className: `${
            textEditor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''
          } ${styles.btnEditor}`,
          iconType: 'fas fa-highlighter',
          label: 'green'
        },
        {
          onClick: saveText,
          className: `${styles.btnEditor}`,
          iconType: 'ri-save-fill'
        }
        // {
        //   onClick: () => textEditor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run(),
        //   className: `${
        //     textEditor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''
        //   } ${styles.btnEditor}`,
        //   iconType: 'fas fa-highlighter',
        //   label: 'blue'
        // }
      ]
    : [];

  const buttons = buttonProps.map(prop => (
    <button
      key={prop.iconType + prop.label}
      onClick={prop.onClick}
      className={prop.className}
      disabled={prop.disabled}>
      <div>
        <i className={prop.iconType} /> {prop.label}
      </div>
    </button>
  ));

  const label = <i className='ri-double-quotes-l' />;

  return <div className={className}>{buttons}</div>;
};

export default Toolbar;
