import React, { FunctionComponent } from 'react';
import Navbar from '@modules/shared/components/Navbar';

const WorkspaceNavbar: FunctionComponent = () => {
  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'SCRIPTS', href: '/projects/1/workspace/scripts' },
    { label: 'EDITOR', href: '/projects/1/workspace/editor' }
  ];
  return <Navbar menuItems={menuItems} showLoginButtons={true} />;
};

export default WorkspaceNavbar;
