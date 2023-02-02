import React, { FormEventHandler, FunctionComponent, useRef, useState } from 'react';
import styles from '@styles/components/VideoControls.module.scss';
import VideoControls from './VideoControls';

const VideoContainer: FunctionComponent = () => {
  const video = useRef<HTMLVideoElement>(null);
  const [stateChange, setStateChange] = useState(false);

  // TODO: This setStateChange pattern is very hacky. Change it.
  const videoContainer = (
    <div className={styles.videoContainer}>
      <video
        ref={video}
        width='100%'
        height='100%'
        onPlay={() => setStateChange(!stateChange)}
        onPause={() => setStateChange(!stateChange)}
        onTimeUpdate={() => setStateChange(!stateChange)}
        onVolumeChange={() => setStateChange(!stateChange)}>
        <source src='/60 Second Cut.mp4' />
        Video unsupported by your browser.
      </video>
      <VideoControls videoStateChange={stateChange} video={video} />
    </div>
  );

  return videoContainer;
};

export default VideoContainer;
