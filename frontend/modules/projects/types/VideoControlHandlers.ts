import { FormEventHandler } from 'react';

export type VideoControlHandlers = {
  onSeek: FormEventHandler<HTMLInputElement>;
  onPlayButtonClicked: () => void;
  onMuteButtonClicked: () => void;
  onVolumeSliderInput: FormEventHandler<HTMLInputElement>;
  onFullscreenButtonClicked: () => void;
};
