import HomePageLayout from '@modules/home/components/HomePageLayout';
import HomePageContent from '@modules/home/pages/HomePageContent';
import React from 'react';

const HomePage = () => {
  return (
    <HomePageLayout>
      <HomePageContent />
    </HomePageLayout>
  );
};

export default HomePage;
