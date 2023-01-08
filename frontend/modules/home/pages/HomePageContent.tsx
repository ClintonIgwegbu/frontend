import React, { FunctionComponent } from 'react';
import styles from '@styles/pages/HomePage.module.scss';
import ButtonLink from '@modules/shared/components/ButtonLink';
import { ButtonSize, ButtonStyle } from '@modules/shared/types/buttonTypes';

const HomePage: FunctionComponent = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homeText}>
        <h1>Collaborate with your video editor</h1>
        <p>
          Our cloud-based collaboration platform enables you to collaborate using our simple
          intuitive interface.
        </p>
        <form className={styles.homeSignUp}>
          <input
            className={styles.homeInput}
            name='email'
            type='email'
            placeholder='Enter your email'
          />
          <ButtonLink
            label='SIGN UP'
            href='/sign-up'
            buttonStyle={ButtonStyle.Primary}
            buttonSize={ButtonSize.Medium}
          />
        </form>
        <div className={styles.watch}>
          <i className={`far fa-play-circle ${styles.playCircle}`} />
          <h5>WATCH THE VIDEO</h5>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
