import { Mark, getMarkRange, mergeAttributes } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import scriptStyles from '@styles/components/Scripts.module.scss';

interface CommentOptions {
  setSelectedCommentId?: (commentId: string | null) => void;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    comment: {
      /**
       * Set a comment mark
       */
      setComment: (attributes: { commentId: string }) => ReturnType;
      /**
       * Unset a comment mark
       */
      unsetComment: () => ReturnType;
    };
  }
}

export const Comment = Mark.create<CommentOptions>({
  name: 'comment',

  addOptions() {
    return {
      HTMLAttributes: { class: `${scriptStyles.comment} ${scriptStyles.unselectedComment}` }
    };
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: el => (el as HTMLElement).getAttribute('comment-id'),
        renderHTML: attrs => ({ 'comment-id': attrs.commentId })
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark[comment-id]',
        getAttrs: el => !!(el as HTMLElement).getAttribute('comment-id') && null
      }
    ];
  },

  // TODO: Make sure parseHTML and renderHTML are correct then update the setSelectedCommentId call below
  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setComment:
        attributes =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetComment:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        }
    };
  },

  addProseMirrorPlugins() {
    const thisExtension = this;
    const setSelectedCommentId = this.options.setSelectedCommentId;

    const plugins = [
      new Plugin({
        props: {
          handleClick(view, pos) {
            const { schema, doc } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.comment);

            if (!range) {
              if (setSelectedCommentId) {
                setSelectedCommentId(null);
              }
              return true;
            }

            if (setSelectedCommentId) {
              const commentId = thisExtension.editor.getAttributes(thisExtension.name).commentId;
              setSelectedCommentId(commentId);
            }

            return true;
          }
        }
      })
    ];

    return plugins;
  }
});
