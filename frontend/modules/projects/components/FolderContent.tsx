import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState, useEffect, FunctionComponent } from 'react';
import { getFiles } from '../constants/filesMock';
import { File } from '../types/File';
import { Folder } from '../types/Folder';
import { getFiles as getFilesApi } from '../constants/filesMock';

type FolderContentProps = {
  folderId: string;
};

interface Column {
  id: 'name' | 'fileType' | 'sizeInBytes' | 'createdUtc';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'fileType', label: 'File type', minWidth: 100 },
  {
    id: 'sizeInBytes',
    label: 'File size',
    // minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US') // TODO: Edit this
  },
  {
    id: 'createdUtc',
    label: 'Date uploaded',
    // minWidth: 170,
    // align: 'right',
    format: (value: number) => value.toLocaleString('en-US') // TODO: Edit this
  }
];

const FolderContent: FunctionComponent<FolderContentProps> = ({ folderId }) => {
  const [subFolders, setSubFolders] = useState<Array<Folder>>([]);
  const [files, setFiles] = useState<Array<File>>([]);

  const getFiles = (folderId: string) => {
    getFilesApi().then(data => {
      setFiles(data);
    });
  };

  useEffect(() => {
    getFiles(folderId);
  }, [folderId]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FolderContent;
