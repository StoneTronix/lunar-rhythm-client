import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar: React.FC = () => {
  const { progress, currentTrack, setProgress } = usePlayer();
  if (!currentTrack) return;
  const duration = currentTrack.duration;

  const handleChange = (value: number[]) => {
    if (!currentTrack || !value.length) return;
    const newTime = value[0];
    setProgress(newTime);
    const sound = (window as any).Howler?._howls?.find((h: any) => h._src.includes(currentTrack.id));
    if (sound) {
      sound.seek(newTime);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="progress-bar">
      <span>{formatTime(progress)}</span>      
      <Slider.Root
        className="SliderRoot"
        value={[progress]}
        max={duration}
        step={1}
        onValueChange={handleChange}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Time" />
      </Slider.Root>      
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
