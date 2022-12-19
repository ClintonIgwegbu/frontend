import { EditorPageContent } from '@modules/index';
import WorkspaceLayout from '@modules/projects/components/WorkspaceLayout';
import React from 'react';

const EditorPage = () => {
  return (
    <WorkspaceLayout>
      <EditorPageContent />
    </WorkspaceLayout>
  );
};

export default EditorPage;
