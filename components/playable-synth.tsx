import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";

const noteActionsTemplate = {
  "0": "E4",
  "1": "F#4",
  "2": "G4",
  "3": "A4",
  "4": "B4",
  "5": "C5",
  "6": "D5",
  "7": "E5",
  "8": "F#5",
  "9": "G5",
  "10": "A5",
  "11": "B5",
  "12": "C6",
  "13": "D6",
  "14": "E6",
  "15": "F#6",
};

const calculateNote = (x: number, width: number) => {
  const keys = Object.keys(noteActionsTemplate);
  const index = Math.floor((x / width) * keys.length);
  return noteActionsTemplate[
    index.toString() as keyof typeof noteActionsTemplate
  ];
};

const PlayableSynth = ({
  playableSynthRef,
  lowpassFilter,
  reverbRef,
  delayRef,
  wobbleRef,
}: {
  playableSynthRef: any;
  lowpassFilter: any;
  reverbRef: any;
  delayRef: any;
  wobbleRef: any;
}) => {
  const playableDivRef = useRef<any>(null);

  const note = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const currentStartTime = useRef<any>(null);
  const [ripples, setRipples] = useState<any>([]);
  const [trails, setTrails] = useState<any>([]);

  function mapYPositionToFilterFrequency(y: number, height: number) {
    const minFreq = 270;
    const maxFreq = 10000;
    return ((height - y) / height) * (maxFreq - minFreq) + minFreq;
  }

  const addRipple = (x:any, y:any) => {
    const rippleId = Date.now();
    setRipples((currentRipples: any) => [
      ...currentRipples,
      { id: rippleId, x, y },
    ]);

    setTimeout(() => {
      setRipples((ripples: any) =>
        ripples.filter((r: any) => r.id !== rippleId)
      );
    }, 1500);
  };

  const addTrail = (x:any, y:any) => {
    const trailId = Date.now();
    setTrails((currentTrails: any) => [
      ...currentTrails,
      { id: trailId, x, y },
    ]);

    setTimeout(() => {
      setTrails((trails: any) =>
        trails.filter((r: any) => r.id !== trailId)
      );
    }, 1500);
  };

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    if (playableDivRef.current !== null) {
      const filterFrequency = mapYPositionToFilterFrequency(
        e.nativeEvent.offsetY,
        playableDivRef.current.offsetHeight
      );
      note.current = calculateNote(
        e.nativeEvent.offsetX,
        playableDivRef.current.offsetWidth
      );

      lowpassFilter.current.frequency.linearRampToValueAtTime(
        filterFrequency,
        Tone.now() + 0.2
      );
    }
    if (Tone.now() >= 0) {
      playableSynthRef.current.triggerAttack(note.current, Tone.now());
    }
    currentStartTime.current = Tone.now();

    reverbRef.current.wet.value = 0.7;
    delayRef.current.wet.value = 0.7;
    wobbleRef.current.wet.value = 0.5;
    intervalRef.current = setInterval(() => {
      const durationHeld = Tone.now() - currentStartTime.current;
      reverbRef.current.wet.value = Math.min(1, 0.7 + durationHeld / 40);
      delayRef.current.wet.value = Math.min(1, 0.7 + durationHeld / 40);
      wobbleRef.current.wet.value = Math.min(1, 0.5 + durationHeld / 40);
      wobbleRef.current.depth = Math.min(1, 0.5 + durationHeld / 40);
    }, 50);

    const rect = playableDivRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addRipple(x, y);
  };

  const handleMouseUp = () => {
    playableSynthRef.current.triggerRelease();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseMove = (e:any) => {
    const filterFrequency = mapYPositionToFilterFrequency(
      e.nativeEvent.offsetY,
      playableDivRef.current.offsetHeight
    );
    lowpassFilter.current.frequency.linearRampToValueAtTime(
      filterFrequency,
      Tone.now() + 0.2
    );
    if (e.buttons !== 1) return;

    const newNote = calculateNote(
      e.nativeEvent.offsetX,
      playableDivRef.current.offsetWidth
    );

    if (note.current !== newNote) {
      note.current = newNote;
      if (Tone.now() >= 0) {
        playableSynthRef.current.setNote(note.current);
      }
    }
    const rect = playableDivRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addTrail(x, y);
  };

  const handleTouchStart = (e: any) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (playableDivRef.current !== null) {
      const filterFrequency = mapYPositionToFilterFrequency(
        touch.clientY - playableDivRef.current.getBoundingClientRect().top,
        playableDivRef.current.offsetHeight
      );
      note.current = calculateNote(
        touch.clientX - playableDivRef.current.getBoundingClientRect().left,
        playableDivRef.current.offsetWidth
      );

      lowpassFilter.current.frequency.linearRampToValueAtTime(
        filterFrequency,
        Tone.now() + 0.2
      );
    }
    if (Tone.now() >= 0) {
      playableSynthRef.current.triggerAttack(note.current, Tone.now());
    }
    currentStartTime.current = Tone.now();

    reverbRef.current.wet.value = 0.7;
    delayRef.current.wet.value = 0.7;
    wobbleRef.current.wet.value = 0.5;
    intervalRef.current = setInterval(() => {
      const durationHeld = Tone.now() - currentStartTime.current;
      reverbRef.current.wet.value = Math.min(1, 0.7 + durationHeld / 40);
      delayRef.current.wet.value = Math.min(1, 0.7 + durationHeld / 40);
      wobbleRef.current.wet.value = Math.min(1, 0.5 + durationHeld / 40);
      wobbleRef.current.depth = Math.min(1, 0.5 + durationHeld / 40);
    }, 50);

    const rect = playableDivRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    addRipple(x, y);
  };

  const handleTouchEnd = () => {
    playableSynthRef.current.triggerRelease();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleTouchMove = (e: any) => {
    e.preventDefault();
    const touch = e.touches[0];
    const filterFrequency = mapYPositionToFilterFrequency(
      touch.clientY - playableDivRef.current.getBoundingClientRect().top,
      playableDivRef.current.offsetHeight
    );
    lowpassFilter.current.frequency.linearRampToValueAtTime(
      filterFrequency,
      Tone.now() + 0.2
    );

    const newNote = calculateNote(
      touch.clientX - playableDivRef.current.getBoundingClientRect().left,
      playableDivRef.current.offsetWidth
    );

    if (note.current !== newNote) {
      note.current = newNote;
      if (Tone.now() >= 0) {
        playableSynthRef.current.setNote(note.current);
      }
    }
    const rect = playableDivRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    addTrail(x, y);
  };

  return (
    <div className="flex w-full justify-center relative space-x-1">
      <div
        ref={playableDivRef}
        className="w-full mx-2 md:mx-0 md:w-[40rem] aspect-square rounded-lg border border-quarternary bg-secondary/20 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {ripples.map(({ id, x, y }: { id: any; x: number; y: number }) => (
          <div
            key={id}
            className="fade bg-quarternary w-8 h-8 rounded-full absolute "
            style={{ left: x - 15, top: y - 14 }}
          ></div>
        ))}
        {trails.map(({ id, x, y }: { id: any; x: number; y: number }) => (
          <div
            key={id}
            className="burst bg-quarternary w-2 h-2 rounded-full absolute "
            style={{ left: x , top: y }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PlayableSynth;
