import React, { FunctionComponent } from 'react';
import Navbar from '@modules/shared/components/Navbar';

const HomePageNavbar: FunctionComponent = () => {
  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects/1/workspace/scripts' },
    { label: 'PRICING', href: '/pricing' }
  ];
  return <Navbar menuItems={menuItems} showLoginButtons={true} />;
};

export default HomePageNavbar;
