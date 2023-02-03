import { FormEventHandler } from 'react';

type VideoControlHandlers = {
  onSeek: FormEventHandler<HTMLInputElement>;
  onPlayButtonClicked: () => void;
  onMuteButtonClicked: () => void;
  onVolumeSliderInput: FormEventHandler<HTMLInputElement>;
  onFullscreenButtonClicked: () => void;
};
