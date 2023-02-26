import React, { FunctionComponent } from 'react';
import Navbar from '@modules/shared/components/Navbar';

const HomePageNavbar: FunctionComponent = () => {
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects/1/workspace/scripts' },
    { label: 'Pricing', href: '/pricing' }
  ];
  return <Navbar menuItems={menuItems} showLoginButtons={true} />;
};

export default HomePageNavbar;
