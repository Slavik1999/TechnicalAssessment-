import { memo, useCallback } from 'react';
import styles from './LandingPage.module.scss';
import PreviewLandingImage from "@assets/images/previewLandingImage.png";
import createEvent from "@assets/images/createEvent.svg";
import { useHistory } from 'react-router-dom';

const LadingPage = () => {
  const router = useHistory();

  const onCreateEvent = useCallback(() => {
    router.push('/event')
  }, [])

  return (
    <div className={styles.landingPage}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={styles.text}>
              Imagine if
            </span>

            <span className={`${styles.text} ${styles.text_purple}`}>
              Snapchat 
            </span>

            <span className={styles.text}>
              had events. 
            </span>
          </div>

          <div className={styles.subTitle}>
            <span className={styles.text}>
              Easily host and share events with your friends across any social media.
            </span>
          </div>
        </div>

        <div className={styles.bodyImg}>
          <img className={styles.img} src={PreviewLandingImage} alt="previewImage"/>
        </div>

        <div className={styles.eventBtn}>
          <button className={styles.btn} onClick={onCreateEvent}>
            <img className={styles.img} src={createEvent} alt="createEvent"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LadingPage;