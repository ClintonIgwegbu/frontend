import { Mark, getMarkRange, mergeAttributes } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { AnnotationType } from '../types/AnnotationType';
import styles from '@styles/components/Scripts.module.scss';

interface AnnotationOptions {
  onClick?: (annotationType: AnnotationType | null, annotationId: string | null) => void;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    annotation: {
      /**
       * Set an annotation mark
       */
      setAnnotation: (attributes: {
        annotationId: string;
        annotationType: AnnotationType;
      }) => ReturnType;
      /**
       * Unset an annotation mark
       */
      unsetAnnotation: () => ReturnType;
    };
  }
}

const AnnotationTypeToClass: Record<AnnotationType, string> = {
  [AnnotationType.Comment]: styles.comment,
  [AnnotationType.BRoll]: styles.bRollAnnotation
};

export const Annotation = Mark.create<AnnotationOptions>({
  name: 'annotation',

  addOptions() {
    return {
      // HTMLAttributes: { class: `${scriptStyles.annotation}` }
      HTMLAttributes: {}
    };
  },

  addAttributes() {
    return {
      annotationId: {
        default: null,
        parseHTML: el => (el as HTMLElement).getAttribute('annotation-id'),
        renderHTML: attrs => ({ 'annotation-id': attrs.annotationId })
      },
      annotationType: {
        default: null,
        parseHTML: el => (el as HTMLElement).getAttribute('annotation-type'),
        renderHTML: attrs => ({ 'annotation-type': attrs.annotationType })
      },
      class: {
        default: '',
        parseHTML: el => (el as HTMLElement).getAttribute('class'),
        renderHTML: attrs => ({ class: attrs.class })
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark[annotation-id]'
      }
    ];
  },

  // TODO: Make sure parseHTML and renderHTML are correct then update the onClick call below
  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setAnnotation:
        attributes =>
        ({ commands }) => {
          return commands.setMark(this.name, {
            ...attributes,
            class: AnnotationTypeToClass[attributes.annotationType]
          });
        },
      unsetAnnotation:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        }
    };
  },

  addProseMirrorPlugins() {
    const thisExtension = this;
    const onClick = this.options.onClick;

    const plugins = [
      new Plugin({
        props: {
          handleClick(view, pos) {
            const { schema, doc } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.annotation);

            if (!range) {
              if (onClick) {
                onClick(null, null);
              }
              return true;
            }

            if (onClick) {
              const { annotationId, annotationType } = thisExtension.editor.getAttributes(
                thisExtension.name
              );
              onClick(annotationType, annotationId);
            }

            return true;
          }
        }
      })
    ];

    return plugins;
  }
});
