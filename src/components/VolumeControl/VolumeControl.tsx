import { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';

import { usePlayer } from '../../contexts/PlayerContext';

import './VolumeControl.scss';

const VolumeControl = () => {
  const { volume, setVolume } = usePlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  useEffect(() => {
    if (volume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 0.7);
      setIsMuted(false);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 0.33) return '🔈';
    if (volume < 0.66) return '🔉';
    return '🔊';
  };

  return (
    <div className="volume-control">
      <button 
        className="volume-control__button" 
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      <Slider.Root
        className="volume-control__slider"
        value={[volume]}
        onValueChange={handleVolumeChange}
        max={1}
        step={0.01}
        aria-label="Volume"
      >
        <Slider.Track className="volume-control__track">
          <Slider.Range className="volume-control__range" />
        </Slider.Track>
        <Slider.Thumb className="volume-control__thumb" />
      </Slider.Root>
    </div>
  );
};

export default VolumeControl;