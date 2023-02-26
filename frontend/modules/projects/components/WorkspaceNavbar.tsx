import React, { FunctionComponent } from 'react';
import Navbar from '@modules/shared/components/Navbar';

const WorkspaceNavbar: FunctionComponent = () => {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Scripts', href: '/projects/1/workspace/scripts' },
    { label: 'Editor', href: '/projects/1/workspace/editor' }
  ];
  return <Navbar menuItems={menuItems} showLoginButtons={false} heightInPixels={45} />;
};

export default WorkspaceNavbar;
