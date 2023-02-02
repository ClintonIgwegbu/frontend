import React, { FormEventHandler, FunctionComponent, useCallback, useRef } from 'react';
import styles from '@styles/components/VideoControls.module.scss';

type VideoControlsProps = {
  video: React.RefObject<HTMLVideoElement>;
  videoStateChange: boolean;
};

const formatTime = (timeInSeconds: number) => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2)
  };
};

// TODO: Find out what data-title is for on the buttons
const VideoControls: FunctionComponent<VideoControlsProps> = ({ video }) => {
  const playbackIcons = useRef<HTMLButtonElement>(null);
  const timeElapsed = useRef<HTMLTimeElement>(null);
  const duration = useRef<HTMLTimeElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const seek = useRef<HTMLInputElement>(null);
  const seekTooltip = useRef<HTMLDivElement>(null);
  const volumeButton = useRef<HTMLButtonElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);

  const initializeVideoControls = () => {
    const time = formatTime(Math.round(video.current?.duration ?? 0));
    if (duration.current) {
      duration.current.innerText = `${time.minutes}:${time.seconds}`;
      duration.current.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    }
  };

  const updateTimeElapsed = () => {
    const elapsedSeconds = video.current?.currentTime ?? 0;
    const time2 = formatTime(Math.round(elapsedSeconds));
    if (timeElapsed.current) {
      timeElapsed.current.innerText = `${time2.minutes}:${time2.seconds}`;
      timeElapsed.current.setAttribute('datetime', `${time2.minutes}m ${time2.seconds}s`);
    }
    if (seek.current) {
      seek.current.value = Math.floor(elapsedSeconds).toString(); // TODO: Why floor?
    }
    if (progressBar.current) {
      progressBar.current.value = Math.floor(elapsedSeconds); // TODO: Why floor?
    }
  };

  // const updateSeekTooltip = event => {
  //   const skipTo = Math.round(
  //     (event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10)
  //   );
  //   seek.current?.setAttribute('data-seek', skipTo.toString());
  //   const t = formatTime(skipTo);
  //   if (seekTooltip.current) {
  //     seekTooltip.current.textContent = `${t.minutes}:${t.seconds}`;
  //     const rect = video.getBoundingClientRect();
  //     seekTooltip.current.style.left = `${event.pageX - rect.left}px`;
  //   }
  // };

  const onPlayClicked = () => {
    if (video.current?.paused || video.current?.ended) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
  };

  const onSeek: FormEventHandler<HTMLInputElement> = event => {
    const skipTo = event.currentTarget.value;
    if (video.current) {
      video.current.currentTime = Math.floor(parseInt(skipTo));
    }
  };

  const onVolumeSliderUpdated: FormEventHandler<HTMLInputElement> = event => {
    if (video.current) {
      if (video.current.muted) {
        video.current.muted = false;
      }
      const sliderValue = parseFloat(event.currentTarget.value);
      video.current.volume = sliderValue;
      // if (sliderValue === 0) {
      //   volumeButton.current?.children[0].classList.remove(styles.hidden);
      //   volumeButton.current?.children[1].classList.add(styles.hidden);
      //   volumeButton.current?.children[2].classList.add(styles.hidden);
      // if (sliderValue < 0.5) {
      //   volumeButton.current?.children[0].classList.add(styles.hidden);
      //   volumeButton.current?.children[1].classList.remove(styles.hidden);
      //   volumeButton.current?.children[2].classList.add(styles.hidden);
      // } else {
      //   volumeButton.current?.children[0].classList.add(styles.hidden);
      //   volumeButton.current?.children[1].classList.add(styles.hidden);
      //   volumeButton.current?.children[2].classList.remove(styles.hidden);
      // }
    }
  };

  const updateVolumeIcon = () => {
    volumeButton.current?.children[0].classList.add(styles.hidden);
    volumeButton.current?.children[1].classList.add(styles.hidden);
    volumeButton.current?.children[2].classList.add(styles.hidden);

    if (video.current?.muted || video.current?.volume === 0) {
      volumeButton.current?.children[0].classList.remove('hidden');
    } else if ((video.current?.volume ?? 0) > 0 && (video.current?.volume ?? 0) <= 0.5) {
      volumeButton.current?.children[1].classList.remove('hidden');
    } else {
      volumeButton.current?.children[2].classList.remove('hidden');
    }
  };

  // if (video.current) {
  //   video.current.onvolumechange = updateVolumeIcon;
  // }

  const onMuteButtonClicked = () => {
    if (video.current) {
      video.current.muted = !video.current.muted;
      const netVolume = video.current.muted ? 0 : video.current.volume;
      if (volumeSlider.current) {
        volumeSlider.current.value = netVolume.toString();
      }
    }
  };

  // TODO: This setStateChange approach is very hacky. Change it.
  initializeVideoControls();
  updateTimeElapsed();
  updateVolumeIcon();

  // if (videoPlaying) {
  //   playbackIcons.current?.children[0].classList.add(styles.hidden);
  //   playbackIcons.current?.children[1].classList.remove(styles.hidden);
  // } else {
  //   playbackIcons.current?.children[0].classList.remove(styles.hidden);
  //   playbackIcons.current?.children[1].classList.add(styles.hidden);
  // }

  if (video.current?.paused || video.current?.ended) {
    playbackIcons.current?.children[0].classList.remove(styles.hidden);
    playbackIcons.current?.children[1].classList.add(styles.hidden);
  } else {
    playbackIcons.current?.children[0].classList.add(styles.hidden);
    playbackIcons.current?.children[1].classList.remove(styles.hidden);
  }

  const controls = (
    <div className={styles.videoControls} id='video-controls'>
      <div className={styles.videoProgress}>
        {/* <progress id='progress-bar' value='0' min='0'></progress> */}
        <progress
          className={styles.progressBar}
          ref={progressBar}
          max={video.current?.duration}
          defaultValue='0'></progress>
        <input
          className={styles.seek}
          ref={seek}
          type='range'
          min={0}
          max={video.current?.duration}
          defaultValue={0}
          step={1}
          onInput={onSeek}
        />
        <div className={styles.seekTooltip} ref={seekTooltip}>
          00:00
        </div>
      </div>

      <div className={styles.bottomControls}>
        <div className={styles.leftControls}>
          <button data-title='Play (k)' ref={playbackIcons} onClick={onPlayClicked}>
            {/* <button data-title='Play (k)' id='play' onClick={onPlayClicked}> */}
            {/* <svg className={styles.playbackIcons}> */}
            {/* <use href='#play-icon'></use> */}
            {/* <use className={styles.hidden} href='#pause'></use> */}
            <i className={'ri-play-fill'} />
            <i className={`ri-pause-fill ${styles.hidden}`} />
            {/* </svg> */}
          </button>

          <div className={styles.volumeControls}>
            <button
              data-title='Mute (m)'
              className={styles.volumeButton}
              ref={volumeButton}
              onClick={onMuteButtonClicked}>
              {/* <svg>
                <use className={styles.hidden} href='#volume-mute'></use>
                <use className={styles.hidden} href='#volume-low'></use>
                <use href='#volume-high'></use>
              </svg> */}
              <i className={`ri-volume-mute-fill ${styles.hidden}`} />
              <i className={`ri-volume-down-fill ${styles.hidden}`} />
              <i className='ri-volume-up-fill' />
            </button>

            <input
              className={styles.volume}
              // data-mute='0.5'
              ref={volumeSlider}
              type='range'
              min={0}
              max={1}
              defaultValue={1}
              step={0.01}
              onInput={onVolumeSliderUpdated}
            />
          </div>

          <div className={styles.time}>
            <time ref={timeElapsed}>00:00</time>
            <span> / </span>
            <time ref={duration}>00:00</time>
          </div>
        </div>

        <div className={styles.rightControls}>
          <button data-title='PIP (p)' className={styles.pipButton} id='pip-button'>
            {/* <svg>
              <use href='#pip'></use>
            </svg> */}
            <i className='ri-picture-in-picture-fill' />
          </button>
          <button
            data-title='Full screen (f)'
            className={styles.fullscreenButton}
            id='fullscreen-button'>
            {/* <svg>
              <use href='#fullscreen'></use>
              <use href='#fullscreen-exit' className={styles.hidden}></use>
            </svg> */}
            <i className='ri-fullscreen-fill' />
            <i className={`ri-fullscreen-exit-fill ${styles.hidden}`} />
          </button>
        </div>
      </div>
    </div>
  );
  return controls;
};

export default VideoControls;
