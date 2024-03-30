import { Drive } from './Drive';

export type Folder = {
  id: string;
  name: string;
  parentFolderId: string | null;
  drive: Drive;
  createdUtc: number;
  updatedUtc: number;
};
