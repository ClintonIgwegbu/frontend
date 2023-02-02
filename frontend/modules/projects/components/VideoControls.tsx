import React, { FormEventHandler, FunctionComponent, useCallback, useRef } from 'react';
import styles from '@styles/components/VideoControls.module.scss';

type VideoControlsProps = {
  onPlayButtonClicked: () => void;
  onSeek: FormEventHandler<HTMLInputElement>;
  onVolumeSliderInput: FormEventHandler<HTMLInputElement>;
  onMuteButtonClicked: () => void;
  onFullscreenButtonClicked: () => void;
  isVideoPlaying: boolean;
  isVideoMuted: boolean;
  isVideoFullscreen: boolean;
  videoElapsedSeconds: number;
  videoDurationInSeconds: number;
  videoVolume: number;
};

const formatTime = (timeInSeconds: number) => {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2)
  };
};

const VideoControls: FunctionComponent<VideoControlsProps> = ({
  onPlayButtonClicked,
  onSeek,
  onVolumeSliderInput,
  onMuteButtonClicked,
  onFullscreenButtonClicked,
  isVideoPlaying,
  isVideoMuted,
  isVideoFullscreen,
  videoElapsedSeconds,
  videoDurationInSeconds,
  videoVolume
}) => {
  const playbackIcons = useRef<HTMLButtonElement>(null);
  const timeElapsed = useRef<HTMLTimeElement>(null);
  const duration = useRef<HTMLTimeElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const seek = useRef<HTMLInputElement>(null);
  const seekTooltip = useRef<HTMLDivElement>(null);
  const volumeButton = useRef<HTMLButtonElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);
  const pipButton = useRef<HTMLButtonElement>(null);
  const fullscreenButton = useRef<HTMLButtonElement>(null);

  const initializeVideoControls = () => {
    const time = formatTime(Math.round(videoDurationInSeconds));
    if (duration.current) {
      duration.current.innerText = `${time.minutes}:${time.seconds}`;
      duration.current.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    }
  };

  const updateTimeElapsed = () => {
    const elapsedSeconds = videoElapsedSeconds;
    const time2 = formatTime(Math.round(elapsedSeconds));
    if (timeElapsed.current) {
      timeElapsed.current.innerText = `${time2.minutes}:${time2.seconds}`;
      timeElapsed.current.setAttribute('datetime', `${time2.minutes}m ${time2.seconds}s`);
    }
    if (seek.current) {
      seek.current.value = Math.floor(elapsedSeconds).toString();
    }
    if (progressBar.current) {
      progressBar.current.value = Math.floor(elapsedSeconds);
    }
  };

  const updatePlayIcons = useCallback(() => {
    if (isVideoPlaying) {
      playbackIcons.current?.children[0].classList.add(styles.hidden);
      playbackIcons.current?.children[1].classList.remove(styles.hidden);
    } else {
      playbackIcons.current?.children[0].classList.remove(styles.hidden);
      playbackIcons.current?.children[1].classList.add(styles.hidden);
    }
  }, [isVideoPlaying]);

  const netVolume = isVideoMuted ? 0 : videoVolume;
  if (volumeSlider.current) {
    volumeSlider.current.value = netVolume.toString();
  }

  const updateVolumeIcon = () => {
    volumeButton.current?.children[0].classList.add(styles.hidden);
    volumeButton.current?.children[1].classList.add(styles.hidden);
    volumeButton.current?.children[2].classList.add(styles.hidden);

    if (isVideoMuted || videoVolume === 0) {
      volumeButton.current?.children[0].classList.remove(styles.hidden);
    } else if (videoVolume > 0 && videoVolume <= 0.5) {
      volumeButton.current?.children[1].classList.remove(styles.hidden);
    } else {
      volumeButton.current?.children[2].classList.remove(styles.hidden);
    }
  };

  const updateFullscreenIcons = useCallback(() => {
    if (isVideoFullscreen) {
      fullscreenButton.current?.children[0].classList.add(styles.hidden);
      fullscreenButton.current?.children[1].classList.remove(styles.hidden);
    } else {
      fullscreenButton.current?.children[0].classList.remove(styles.hidden);
      fullscreenButton.current?.children[1].classList.add(styles.hidden);
    }
  }, [isVideoFullscreen]);

  initializeVideoControls();
  updateTimeElapsed();
  updatePlayIcons();
  updateVolumeIcon(); // TODO: Fix volume slider trouble
  updateFullscreenIcons();

  const controls = (
    <div className={styles.videoControls}>
      <div className={styles.videoProgress}>
        <progress
          className={styles.progressBar}
          ref={progressBar}
          max={videoDurationInSeconds}
          defaultValue='0'></progress>
        <input
          className={styles.seek}
          ref={seek}
          type='range'
          min={0}
          max={videoDurationInSeconds}
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
          <button ref={playbackIcons} onClick={onPlayButtonClicked}>
            <i className={'ri-play-fill'} />
            <i className={`ri-pause-fill ${styles.hidden}`} />
          </button>

          <div className={styles.volumeControls}>
            <button
              className={styles.volumeButton}
              ref={volumeButton}
              onClick={onMuteButtonClicked}>
              <i className={`ri-volume-mute-fill ${styles.hidden}`} />
              <i className={`ri-volume-down-fill ${styles.hidden}`} />
              <i className='ri-volume-up-fill' />
            </button>

            <input
              className={styles.volume}
              ref={volumeSlider}
              type='range'
              min={0}
              max={1}
              defaultValue={1}
              step={0.01}
              onInput={onVolumeSliderInput}
            />
          </div>

          <div className={styles.time}>
            <time ref={timeElapsed}>00:00</time>
            <span> / </span>
            <time ref={duration}>00:00</time>
          </div>
        </div>

        <div className={styles.rightControls}>
          <button className={styles.pipButton} ref={pipButton}>
            <i className='ri-picture-in-picture-fill' />
          </button>
          <button
            className={styles.fullscreenButton}
            ref={fullscreenButton}
            onClick={onFullscreenButtonClicked}>
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
