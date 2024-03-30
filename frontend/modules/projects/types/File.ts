import { Url } from 'url';
import { Drive } from './Drive';

export type File = {
  id: string;
  name: string;
  parentFolderId: string;
  url: string; // TODO: Confirm if this, Url or something is the best type to use
  mimeType: string;
  drive: Drive;
  sizeInBytes: number;
  createdUtc: number;
  updatedUtc: number;
};
