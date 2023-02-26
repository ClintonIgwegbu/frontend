import React, { FunctionComponent } from 'react';
import styles from '@styles/components/WorkspaceNavbar.module.scss';
import Link from 'next/link';
import Button from '@modules/shared/components/Button';
import { ButtonSize, ButtonStyle } from '@modules/shared/types/buttonTypes';

const WorkspaceNavbar: FunctionComponent = () => {
  return (
    <>
      <nav className={styles.workspaceNavbarContainer}>
        <div className={styles.leftNavbar}>
          <Link href='/' className={styles.navbarLogo}>
            {/* <div className={styles.logoText}>colLab</div> */}
            <i className='ri-live-fill' />
          </Link>
        </div>
        <div className={styles.rightNavbar}>
          <Button label='Share' buttonSize={ButtonSize.Medium} buttonStyle={ButtonStyle.Primary} />
        </div>
      </nav>
    </>
  );
};

export default WorkspaceNavbar;
