import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import styles from '@styles/components/LeftNavigation.module.scss';

const LeftNavigation: FunctionComponent = () => {
  const nav = (
    <Stack className={`${styles.leftNavigation}`}>
      <button>
        <Link href='/projects/[id]/workspace/scripts'>Scripts</Link>
      </button>
      <button>
        <Link href='/about'>Editor</Link>
      </button>
    </Stack>
  );

  return nav;
};

export default LeftNavigation;

// TODO: Figure out where left navigation lives in creator dashboard, as it is not included in every page
