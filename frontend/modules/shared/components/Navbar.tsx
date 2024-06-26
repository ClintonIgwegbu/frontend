import React, { useState, FunctionComponent } from 'react';
import styles from '@styles/components/NavBar.module.scss';
import Link from 'next/link';
import { ButtonStyle, ButtonSize } from '../types/buttonTypes';
import ButtonLink from './ButtonLink';
import NavbarMenuItem from '../types/NavbarMenuItem';

type NavbarProps = {
  menuItems: NavbarMenuItem[];
  showLoginButtons: boolean;
  heightInPixels?: number;
};

const Navbar: FunctionComponent<NavbarProps> = ({
  menuItems,
  showLoginButtons,
  heightInPixels
}) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  // const showButton = () => {
  //   if (window.innerWidth <= 960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // };

  // useEffect(() => {
  //   showButton();
  // }, []);

  // window.addEventListener('resize', showButton);

  const navMenuItems = menuItems.map(menuItem => {
    return (
      <li key={menuItem.label} className={styles.navItem}>
        <Link href={menuItem.href} className={styles.navLinks}>
          {menuItem.label}
        </Link>
      </li>
    );
  });

  const navMenu = (
    <ul className={click ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
      {navMenuItems}
    </ul>
  );

  const loginButtons = (
    <>
      <Link href='/log-in' className={styles.navLinks}>
        Log In
      </Link>
      {button && (
        <ButtonLink
          label='Sign Up'
          href='/sign-up'
          buttonStyle={ButtonStyle.Primary}
          buttonSize={ButtonSize.Medium}
        />
      )}
    </>
  );
  return (
    <>
      <nav
        className={`${styles.navbar} ${styles.active}`}
        style={{ height: `${heightInPixels}px` }}>
        <div className={styles.navbarContainer}>
          <Link href='/' className={styles.navbarLogo}>
            {/* <div className={styles.logoText}>colLab</div> */}
          </Link>
          <div className={styles.menuIcon} onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {navMenu}
          {showLoginButtons && loginButtons}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
