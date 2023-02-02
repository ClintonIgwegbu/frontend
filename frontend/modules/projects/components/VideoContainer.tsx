import React, { FormEventHandler, FunctionComponent, useRef, useState } from 'react';
import styles from '@styles/components/VideoControls.module.scss';
import VideoControls from './VideoControls';

const VideoContainer: FunctionComponent = () => {
  const video = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(false);
  const [isVideoFullscreen, setVideoFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [volume, setVolume] = useState(1);

  const onPlayClicked = () => {
    if (video.current?.paused || video.current?.ended) {
      video.current?.play();
    } else {
      video.current?.pause();
    }
  };

  const togglePlayState = () => {
    setVideoPlaying(!isVideoPlaying);
  };

  const onSeek: FormEventHandler<HTMLInputElement> = event => {
    const skipTo = event.currentTarget.value;
    if (video.current) {
      video.current.currentTime = Math.floor(parseInt(skipTo));
    }
  };

  const onVolumeSliderInput: FormEventHandler<HTMLInputElement> = event => {
    if (video.current) {
      if (video.current.muted) {
        video.current.muted = false;
      }
      const sliderValue = parseFloat(event.currentTarget.value);
      video.current.volume = sliderValue;
    }
  };

  const onMuteButtonClicked = () => {
    if (video.current) {
      video.current.muted = !video.current.muted;
      setVideoMuted(!isVideoMuted);
    }
  };

  // TODO: Does not work on Safari
  const onFullscreenButtonClicked = () => {
    setVideoFullscreen(!isVideoFullscreen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainerRef.current?.requestFullscreen();
    }
  };

  const onTimeUpdate = () => {
    setElapsedSeconds(video.current?.currentTime ?? 0);
  };

  const onVolumeChange = () => {
    setVolume(video.current?.volume ?? 1);
  };

  const videoContainer = (
    <div className={styles.videoContainer} ref={videoContainerRef}>
      <video
        ref={video}
        width='100%'
        height='100%'
        onPlay={togglePlayState}
        onPause={togglePlayState}
        onClick={onPlayClicked}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={onVolumeChange}>
        <source src='/60 Second Cut.mp4' />
        Video unsupported by your browser.
      </video>
      <VideoControls
        onPlayButtonClicked={onPlayClicked}
        onFullscreenButtonClicked={onFullscreenButtonClicked}
        onSeek={onSeek}
        onVolumeSliderInput={onVolumeSliderInput}
        onMuteButtonClicked={onMuteButtonClicked}
        isVideoPlaying={isVideoPlaying}
        isVideoMuted={isVideoMuted}
        isVideoFullscreen={isVideoFullscreen}
        videoDurationInSeconds={video.current?.duration ?? 0}
        videoElapsedSeconds={elapsedSeconds}
        videoVolume={volume}
      />
    </div>
  );

  return videoContainer;
};

export default VideoContainer;
