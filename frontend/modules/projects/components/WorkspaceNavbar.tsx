import React, { FunctionComponent } from 'react';
import styles from '@styles/components/WorkspaceNavbar.module.scss';
import Link from 'next/link';
import Button from '@modules/shared/components/Button';
import { ButtonSize, ButtonStyle } from '@modules/shared/types/buttonTypes';

type WorkspaceNavbarProps = {
  projectName: string;
};

const WorkspaceNavbar: FunctionComponent<WorkspaceNavbarProps> = ({ projectName }) => {
  return (
    <>
      <nav className={styles.workspaceNavbarContainer}>
        <div className={styles.leftNavbar}>
          <Link href='/' className={styles.navbarLogo}>
            <i className='ri-live-fill' />
          </Link>
          <span>{projectName}</span>
        </div>
        <div className={styles.rightNavbar}>
          <Button
            label='Editor'
            buttonSize={ButtonSize.Medium}
            buttonStyle={ButtonStyle.Primary}
            customStyle={{ backgroundColor: '#2F3245' }}
          />
          <Button label='Share' buttonSize={ButtonSize.Medium} buttonStyle={ButtonStyle.Primary} />
        </div>
      </nav>
    </>
  );
};

export default WorkspaceNavbar;
