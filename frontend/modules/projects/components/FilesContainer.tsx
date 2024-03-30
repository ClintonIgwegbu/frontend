import { Grid } from '@mui/material';
import { useState, useEffect, FunctionComponent } from 'react';
import DirectoryTree from './DirectoryTree';
import FolderContent from './FolderContent';

type FilesContainerProps = {
  rootDirectoryId: string;
};

const FilesContainer: FunctionComponent<FilesContainerProps> = ({ rootDirectoryId }) => {
  const [currentFolderId, setCurrentFolderId] = useState(rootDirectoryId);

  return (
    <Grid>
      <DirectoryTree />
      <FolderContent folderId={currentFolderId} />
    </Grid>
  );
};

export default FilesContainer;
