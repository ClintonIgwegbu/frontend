import { ScriptsPageContent } from '@modules/projects';
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
