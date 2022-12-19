import { ScriptsPageContent } from '@modules/index';
import WorkspaceLayout from '@modules/projects/components/WorkspaceLayout';
import React from 'react';

const ScriptsPage = () => {
  return (
    <WorkspaceLayout>
      <ScriptsPageContent />
    </WorkspaceLayout>
  );
};

export default ScriptsPage;
