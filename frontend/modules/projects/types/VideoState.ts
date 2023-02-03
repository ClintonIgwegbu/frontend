export type VideoState = {
  isVideoPlaying: boolean;
  isVideoMuted: boolean;
  isVideoFullscreen: boolean;
  videoElapsedSeconds: number;
  videoDurationInSeconds: number;
  videoVolume: number;
};
