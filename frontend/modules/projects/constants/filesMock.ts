import { Drive } from '../types/Drive';
import { File } from '../types/File';
import { Folder } from '../types/Folder';

// This mock returns the files and folders that have folder 1 (personal drive root directoy) as a parent.
export const getFiles = async () => {
  const files: Array<File> = [
    {
      id: '1',
      name: 'The Consumer Trap.mp4',
      parentFolderId: '1',
      url: '',
      mimeType: 'video/mp4',
      sizeInBytes: 1000000,
      drive: Drive.Project,
      createdUtc: 1679360013000,
      updatedUtc: 1679360013000
    },
    {
      id: '2',
      name: 'The Consumer Trap 2.mp4',
      parentFolderId: '1',
      url: '',
      mimeType: 'video/mp4',
      sizeInBytes: 1000000,
      drive: Drive.Project,
      createdUtc: 1679360013000,
      updatedUtc: 1679360013000
    },
    {
      id: '3',
      name: 'The Consumer Trap 3.mp4',
      parentFolderId: '1',
      url: '',
      mimeType: 'video/mp4',
      sizeInBytes: 1000000,
      drive: Drive.Project,
      createdUtc: 1679360013000,
      updatedUtc: 1679360013000
    }
  ];
  return files;
};

export const getFolders = async () => {
  const folders: Array<Folder> = [
    {
      id: '2',
      name: 'Images',
      parentFolderId: null,
      drive: Drive.Project,
      createdUtc: 1679360010000,
      updatedUtc: 1679360010000
    },
    {
      id: '3',
      name: 'Miscellaneous',
      parentFolderId: '1',
      drive: Drive.Project,
      createdUtc: 1679360010000,
      updatedUtc: 1679360010000
    }
  ];
  return folders;
};
