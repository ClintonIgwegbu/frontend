export enum ActiveCommentType {
  Replying = 'replying',
  Editing = 'editing'
}

export type ActiveComment = {
  id: string;
  type: ActiveCommentType;
};
