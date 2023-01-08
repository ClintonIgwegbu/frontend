import React, { FunctionComponent, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import Toolbar from './Toolbar';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { Link as EditorLink } from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import styles from '@styles/components/Scripts.module.scss';
import ReactDOMServer from 'react-dom/server';

const logA = () => {
  console.log('aaaaaaaaaa');
};

const initialText = (
  <p>
    Lorem{' '}
    <mark
      onClick={logA}
      data-color='#ffa8a8'
      style={{ backgroundColor: '#ffa8a8', color: 'inherit' }}>
      Ipsum
    </mark>{' '}
    is more text simply dummy t
    <mark data-color='#8ce99a' style={{ backgroundColor: '#8ce99a', color: 'inherit' }}>
      ext of the
    </mark>{' '}
    printing and typesetting industry. Lorem Ipsum has been the industry&aposs standard dummy text
    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five centuries, but also the leap into electronic{' '}
    <mark data-color='#f1c232' style={{ backgroundColor: '#f1c232', color: 'inherit' }}>
      typesetting
    </mark>
  </p>
);

const ScriptContainer: FunctionComponent = () => {
  const textEditor = useEditor({
    extensions: [
      StarterKit,
      EditorLink.configure({ HTMLAttributes: { target: 'b-roll-preview' } }),
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
        // defaultAlignment: 'justify'
      })
    ],
    content: ReactDOMServer.renderToString(initialText)
  });

  return (
    <>
      <div className={styles.scriptContainer}>
        <Toolbar textEditor={textEditor} className={`${styles.scriptToolbar}`} />
        <EditorContent editor={textEditor} className={`${styles.script}`} />
      </div>
    </>
  );
};

export default ScriptContainer;
