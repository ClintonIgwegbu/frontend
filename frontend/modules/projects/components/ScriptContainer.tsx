import React, { FunctionComponent } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import Toolbar from './Toolbar';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { Link as EditorLink } from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import styles from '@styles/components/Scripts.module.scss';

const ScriptContainer: FunctionComponent = () => {
  const textEditor = useEditor({
    extensions: [
      StarterKit,
      EditorLink,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ]
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
