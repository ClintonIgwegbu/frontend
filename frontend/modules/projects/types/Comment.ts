export type Comment = {
  id: string;
  body: string;
  username: string;
  userId: string;
  parentId: string | null;
  createdAt: number;
};
