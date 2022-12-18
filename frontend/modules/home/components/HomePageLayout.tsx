import React, { FunctionComponent, ReactElement } from 'react';
import styles from '@styles/components/AppLayout.module.scss';
import HomePageNavbar from './HomePageNavbar';
import Head from 'next/head';

type HomePageLayoutProps = {
  children: ReactElement;
};

const HomePageLayout: FunctionComponent<HomePageLayoutProps> = ({
  children
}: HomePageLayoutProps) => {
  return (
    <>
      <div className={`${styles.topNavigationLayout} ${styles.homePageLayout}`}>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <HomePageNavbar />
        <div className={`${styles.leftNavigationLayout}`}>{children}</div>
      </div>
    </>
  );
};
export default HomePageLayout;
