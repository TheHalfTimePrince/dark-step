"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import * as Tone from "tone";
import { instrumentsInit } from "@/components/instruments";
import SequencerUi from "./sequencer-ui";
import { SlidersHorizontal, SlidersVertical } from "lucide-react";
const StartAudioContext: any = require("startaudiocontext");
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import LoadingModal from "./ui/loading_modal";
import { Power, PowerOff } from "lucide-react";
import PlayableSynth from "./playable-synth";
import Mixer from "./mixer";
import GranularSamplerDisplay from "./granular-sampler-display";
import PolySynthOptions from "./poly-synth-options";
import UploadSample from "./upload-sample";
import Modal from "./modal";
import { time } from "console";
const steps = 16;
const Sequencer = () => {
  //INITIALISE STATE
  const [activeElements, setActiveElements] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [elementsToCore, setElementsToCore] = useState([]);
  const [instruments, setInstruments] = useState(instrumentsInit);
  const [playing, setPlaying] = useState(false);
  const [samplerSample, setSamplerSample] = useState<null | Blob>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [activeSection, setActiveSection] = useState(0);
  const [visualSection, setVisualSection] = useState(0);
  const [sections, setSections] = useState([0]);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const playRef = useRef<any>(null);
  const [hasStartQuery, setHasStartQuery] = useState(false);

  //////////////////////////////
  /// INITIALISE MIXER STATE ///
  //////////////////////////////

  //MASTER CHANNEL
  const masterVolume = useRef<any>(new Tone.Volume(0));
  const [masterVolumeUi, setMasterVolumeUi] = useState(0);
  const masterEq = useRef<any>();
  // const [masterEqUi, setMasterEqUi] = useState({ low: 0, mid: 0, high: 0 });
  // const initialiseMasterEq = () => {
  //   masterEq.current = new Tone.EQ3({ low: 0, mid: 0, high: 0 });
  // };

  const bassMasterVolume = useRef<any>(new Tone.Volume(0));
  const [bassMasterVolumeUi, setBassMasterVolumeUi] = useState(0);
  const drumMasterVolume = useRef<any>(new Tone.Volume(0));
  const [drumMasterVolumeUi, setDrumMasterVolumeUi] = useState(0);
  const polySynthMasterVolume = useRef<any>(new Tone.Volume(0));
  const [polySynthMasterVolumeUi, setPolySynthMasterVolumeUi] = useState(0);
  const chordSynthMasterVolume = useRef<any>(new Tone.Volume(0));
  const [chordMasterVolumeUi, setChordSynthMasterVolumeUi] = useState(0);
  const granularSynthMasterVolume = useRef<any>(new Tone.Volume(0));
  const [
    granularSynthMasterVolumeUi,
    setGranularSynthMasterVolumeUi,
  ] = useState(0);
  const playableLeadMasterVolume = useRef<any>(new Tone.Volume(0));
  const [playableLeadMasterVolumeUi, setPlayableLeadMasterVolumeUi] = useState(
    0
  );

  //LOAD
  //SAMPLES
  const [isLoading, setIsLoading] = useState(true);
  const [isEightOhEightDrumsLoading, setIsEightOhEightDrumsLoading] = useState(
    true
  );
  const [isLiveDrumsLoading, setIsLiveDrumsLoading] = useState(true);
  const [isBassLoading, setIsBassLoading] = useState(true);
  useEffect(() => {
    if (!isEightOhEightDrumsLoading && !isLiveDrumsLoading && !isBassLoading) {
      setHasStartQuery(true);
      setIsLoading(false);
    }
  }, [isEightOhEightDrumsLoading, isLiveDrumsLoading, isBassLoading]);

  //INIT
  //BASS
  const bassRef = useRef<any>(null);
  useEffect(() => {
    bassRef.current = new Tone.Sampler({
      urls: {
        C1: "E2.wav",
        D1: "F2.wav",
        E1: "G2.wav",
        F1: "A3.wav",
        G1: "B3.wav",
        A1: "C3.wav",
        B1: "D3.wav",
        C2: "E3.wav",
        D2: "E2-Long.wav",
        E2: "F2-Long.wav",
        F2: "G2-Long.wav",
        G2: "A3-Long.wav",
        A2: "B3-Long.wav",
        B2: "C3-Long.wav",
        C3: "D3-Long.wav",
        D3: "E3-Long.wav",
      },
      baseUrl: "/audio/bass/",
      onload: () => {
        setIsBassLoading(false);
      },
    });
    bassRef.current.chain(
      bassMasterVolume.current,
      masterVolume.current,
      Tone.Destination
    );
    return () => {
      if (bassRef.current) {
        bassRef.current.dispose();
      }
    };
  }, []);

  //INIT DRUM STATE
  const [currentInstrument, setCurrentInstrument] = useState("drums");
  const [kit, setKit] = useState("808");
  //INIT
  //808
  //DRUMS
  const eightOhEightDrums = useRef<any>(null);
  useEffect(() => {
    eightOhEightDrums.current = new Tone.Sampler({
      urls: {
        C1: "Kick Short.wav",
        D1: "Snare Bright.wav",
        E1: "Clap.wav",
        F1: "Snare Low.wav",
        G1: "Hihat.wav",
        A1: "Open Hat Short.wav",
        B1: "Open Hat Long.wav",
        C2: "Rimshot.wav",
        D2: "Maracas.wav",
        E2: "Cowbell.wav",
        F2: "Cymbal.wav",
        G2: "Claves.wav",
        A2: "Conga High.wav",
        B2: "Conga Mid.wav",
        C3: "Conga Low.wav",
        D3: "Tom Mid.wav",
      },
      baseUrl: "/audio/808-drums/",
      onload: () => {
        setIsEightOhEightDrumsLoading(false);
      },
    });

    eightOhEightDrums.current.chain(
      masterVolume.current,
      drumMasterVolume.current,
      Tone.Destination
    );
    return () => {
      if (eightOhEightDrums.current) {
        eightOhEightDrums.current.dispose();
      }
    };
  }, []);

  //INIT
  //LIVE
  //DRUMS
  const liveDrumsRef = useRef<any>(null);
  useEffect(() => {
    liveDrumsRef.current = new Tone.Sampler({
      urls: {
        C1: "Kick 1.wav",
        D1: "Kick 2.wav",
        E1: "Snare 1.wav",
        F1: "Snare 2.wav",
        G1: "Snare 3.wav",
        A1: "Snare 4.wav",
        B1: "Hi Hat 1.wav",
        C2: "Hi Hat 2.wav",
        D2: "Open Hi Hat 1.wav",
        E2: "Open Hi Hat 2.wav",
        F2: "Clap 1.wav",
        G2: "Crash 1.wav",
        A2: "Tamb 1.wav",
        B2: "Bongo 1.wav",
        C3: "Crash 2.wav",
        D3: "Tom 1.wav",
      },
      baseUrl: "/audio/live-drums/",
      onload: () => {
        setIsLiveDrumsLoading(false);
      },
    });

    liveDrumsRef.current.chain(
      masterVolume.current,
      drumMasterVolume.current,
      Tone.Destination
    );
    return () => {
      if (liveDrumsRef.current) {
        liveDrumsRef.current.dispose();
      }
    };
  }, []);

  //playableSynthStateInit
  const playableSynthLowpassFilter = useRef<any>(null);
  const playableSynthVolumeRef = useRef<any>(null);
  const playableSynthRef = useRef<any>(null);
  const playableSynthReverbRef = useRef<any>(null);
  const playableSynthWobbleRef = useRef<any>(null);
  const playableSynthDelayRef = useRef<any>(null);
  //playableSynthInit
  const initPlayableSynth = () => {
    playableSynthLowpassFilter.current = new Tone.Filter({
      type: "lowpass",
      frequency: 1500,
    });

    playableSynthRef.current = new Tone.MonoSynth({
      oscillator: {
        type: "sawtooth",
      },
      envelope: {
        attack: 0,
        decay: 0.1,
        sustain: 0.9,
        release: 1.2,
      },
      portamento: 0.1,
      volume: 0,
    });
    playableSynthReverbRef.current = new Tone.Reverb({ decay: 4, wet: 0.7 });
    playableSynthDelayRef.current = new Tone.FeedbackDelay({
      delayTime: "4n",
      feedback: 0.3,
      wet: 0.3,
    });
    playableSynthVolumeRef.current = new Tone.Volume(0);
    playableSynthWobbleRef.current = new Tone.Chorus(4, 2.5, 0.5).start();
    playableSynthRef.current.chain(
      playableSynthWobbleRef.current,
      playableSynthDelayRef.current,
      playableSynthReverbRef.current,
      playableSynthLowpassFilter.current,
      playableSynthVolumeRef.current,
      playableLeadMasterVolume.current,
      masterVolume.current,
      Tone.Destination
    );
  };

  //bellSynthStateInit
  const [isPolySynthSettingsOpen, setIsPolySynthSettingsOpen] = useState(false);
  const polySynthRef = useRef<any>(null);
  const polySynthFreeverbRef = useRef<any>(null);
  const polySynthPingPongDelayRef = useRef<any>(null);
  const polySynthVolumeRef = useRef<any>(instruments.polySynth.volume);
  const polySynthOptionsRef = useRef<any>(null);
  const polySynthAnalyserRef = useRef<any>(null);
  const [polySynthOscillatorType, setPolySynthOscillatorType] = useState(
    "sine"
  );
  const [polySynthADSR, setPolySynthADSR] = useState([0.005, 0.1, 0.9, 1.2]);
  //bellSynthInit
  const initBellSynth = () => {
    polySynthVolumeRef.current = new Tone.Volume();
    polySynthPingPongDelayRef.current = new Tone.PingPongDelay("4n", 0.5);
    polySynthPingPongDelayRef.current.wet.value = 0.7;
    polySynthVolumeRef.current.volume.value = -18;
    polySynthFreeverbRef.current = new Tone.Freeverb({
      roomSize: 0.97,
      wet: 0.8,
    });
    polySynthOptionsRef.current = {
      oscillator: {
        type: polySynthOscillatorType,
        phase: 0,
        detune: 0,
      },
      envelope: {
        attack: polySynthADSR[0],
        decay: polySynthADSR[1],
        sustain: polySynthADSR[2],
        release: polySynthADSR[3],
      },
      volume: -18,
      portamento: 0.05,
    };

    polySynthRef.current = new Tone.PolySynth(
      Tone.Synth,
      polySynthOptionsRef.current
    );
    polySynthAnalyserRef.current = new Tone.Analyser("waveform", 1024);
    masterVolume.current.connect(polySynthAnalyserRef.current);

    polySynthRef.current.chain(
      polySynthPingPongDelayRef.current,
      polySynthFreeverbRef.current,
      polySynthVolumeRef.current,
      polySynthMasterVolume.current,
      masterVolume.current,
      Tone.Destination
    );
  };

  //chordSynthStateInit
  const chordSynthRef = useRef<any>(null);
  const chordSynthVolumeRef = useRef<any>(null);
  //chordSynthInit
  const chordSynthInit = () => {
    chordSynthVolumeRef.current = new Tone.Volume();
    chordSynthVolumeRef.current.volume.value = -8;

    chordSynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 1,
        decay: 1,
        sustain: 1,
        release: 2,
      },
      volume: 0,
    });
    chordSynthRef.current.chain(
      chordSynthVolumeRef.current,
      chordSynthMasterVolume.current,
      masterVolume.current,
      Tone.Destination
    );
  };

  //bellSynthAnalyserInit
  // const canvasRef = useRef<any>(null);
  // let animationFrameId: any;
  // const bellSynthAnalyserInit = () => {
  //   const canvas = canvasRef.current;
  //   const canvasContext = canvas.getContext("2d");
  //   const WIDTH = canvas.width;
  //   const HEIGHT = canvas.height;
  //   const draw = () => {
  //     animationFrameId = requestAnimationFrame(draw);
  //     const dataArray = polySynthAnalyserRef.current.getValue();
  //     canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
  //     canvasContext.lineWidth = 2;
  //     canvasContext.strokeStyle = "#EABE6C";
  //     canvasContext.beginPath();
  //     const sliceWidth = (WIDTH * 1) / dataArray.length;
  //     let x = 0;
  //     for (let i = 0; i < dataArray.length; i++) {
  //       const v = dataArray[i] / 3 + 0.5;
  //       const y = v * HEIGHT;

  //       if (i === 0) {
  //         canvasContext.moveTo(x, y);
  //       } else {
  //         canvasContext.lineTo(x, y);
  //       }

  //       x += sliceWidth;
  //     }
  //     canvasContext.lineTo(WIDTH, HEIGHT / 2);
  //     canvasContext.stroke();
  //   };
  //   draw();
  // };

  //initSequencerState
  const sequencerCore = useRef<any>(null);
  //sequencerInit
  const initSequencer = () => {
    sequencerCore.current = new Tone.Part((time, value: any) => {
      switch (value.instrument) {
        case "polySynth":
          polySynthRef.current.triggerAttackRelease(value.note, "8n", time);
          break;
        case "chordSynth":
          chordSynthRef.current.triggerAttackRelease(value.note, "8n", time);
          break;
        case "bass":
          bassRef.current.triggerAttackRelease(value.note, "8n", time);
          break;
        case "drums":
          switch (kit) {
            case "808":
              eightOhEightDrums.current.triggerAttackRelease(
                value.note,
                "8n",
                time
              );
              break;
            case "Live":
              liveDrumsRef.current.triggerAttackRelease(value.note, "8n", time);
              break;
            default:
              console.log(kit, "Drum kit not found");
          }
          break;
        default:
          console.error("Instrument not found");
      }
    }, []);
    sequencerCore.current.loop = true;

    //SET SEQUENCER LENGTH TO
    //MATCH THE CURRENT ACTIVE SECTIONS
    if (sections.length > 1) {
      sequencerCore.current.loopEnd = sections.length.toString() + "m";
    }
    if (elementsToCore.length > 0) {
      elementsToCore.forEach((element) => {
        sequencerCore.current.add(element);
      });
    }
  };

  //CODE
  //ON
  //LOAD
  useEffect(() => {
    //TOGGLE
    //AUDIO
    //PLAYBACK
    let wasPlaying = playing;
    if (wasPlaying) {
      togglePlayback();
    }
    //INIT
    //AUDIO
    //CONTEXT
    var context = new AudioContext();
    StartAudioContext(context, playRef.current).then(function () {});
    //INITIALISE
    //MIXER
    //EFFECTS
    // initialiseMasterEq();
    //SETUP
    //SYNTHS
    initPlayableSynth();
    initBellSynth();
    chordSynthInit();

    //SETUP
    //BELL
    //SYNTH
    //ANALYSER
    // bellSynthAnalyserInit();
    //INIT
    //TONE
    //TRANSPORT
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.timeSignature = 4;
    Tone.Transport.scheduleRepeat((time) => {
      if (Tone.Transport.seconds === 0) {
        setActiveStep(0);
      } else {
        setActiveStep((prevStep) => (prevStep + 1) % steps);
      }
    }, "16n");
    //INIT
    //SEQUENCER
    initSequencer();
    //UNMOUNT
    return () => {
      // cancelAnimationFrame(animationFrameId);
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [kit]);

  //UPDATE BELL SYNTH OSCILATOR
  useEffect(() => {
    if (polySynthRef.current) {
      polySynthRef.current.set({
        oscillator: { type: polySynthOscillatorType },
      });
    }
  }, [polySynthOscillatorType]);

  //UPDATE BELL SYNTH ADSR
  useEffect(() => {
    if (polySynthRef.current) {
      polySynthRef.current.set({
        envelope: {
          attack: polySynthADSR[0],
          decay: polySynthADSR[1],
          sustain: polySynthADSR[2],
          release: polySynthADSR[3],
        },
      });
    }
  }, [polySynthADSR]);

  // //UPDATE BELL SYNTH VOLUME
  // const [watchPolySynthVolume, setWatchPolySynthVolume] = useState(
  //   instruments.polySynth.volume
  // );

  //TOGGLE PLAYBACK
  const togglePlayback = () => {
    setPlaying(!playing);
    if (!playing) {
      Tone.Transport.start();
      sequencerCore.current.start(0);
    } else {
      Tone.Transport.stop();
      setActiveStep(0);
      setActiveSection(0);
    }
  };

  //CHANGE TEMPO
  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);

  //ENSURE USE EFFECT HOOK DOESN'T RUN ON FIRST RENDER
  const [isMounted, setIsMounted] = useState(false);

  //HELPER FUNCTION TO UPDATE SEQUENCER
  const updateActiveElements = () => {
    setElementsToCore([]);
    sequencerCore.current.loopEnd = sections.length.toString() + "m";
    sequencerCore.current.clear();
    let tempElementsToCore: any = [];

    sections.forEach((section) => {
      if (activeElements[section].length > 0) {
        activeElements[section].forEach((element: any) => {
          const elementToPush = {
            ...element,
            time: sections.indexOf(section).toString() + element.time,
          };
          console.log("elementToPush", elementToPush);
          tempElementsToCore.push(elementToPush);
          sequencerCore.current.add(elementToPush);
        });
      }
    });
    setElementsToCore(tempElementsToCore);
    sequencerCore.current.stop(0);
    Tone.Transport.stop();
    setActiveStep(0);
    setActiveSection(0);
    Tone.Transport.start();
    sequencerCore.current.start(0);
  };
  //UPDATE SEQUENCER WHEN SECTIONS CHANGE
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {
      updateActiveElements();
    }
  }, [sections]);

  //TEXT ANIMATION FOR GRANULAR SYNTH
  const [visualizationText, setVisualizationText] = useState<any>([]);
  function generateStringsWithRandomColors(length: number, count: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const results = [];

    for (let j = 0; j < count; j++) {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;

      const spanElement = (
        <span key={j} style={{ color: randomColor }}>
          {result}
        </span>
      );

      results.push(spanElement);
    }

    return results;
  }
  //INITIALSE GRANULAR SYNTH
  const granularSynthRef = useRef<any>(null);
  const granularSynthAnalyserRef = useRef<any>(null);
  useEffect(() => {
    if (samplerSample !== null) {
      setIsLoading(true);
      const blobUrl = URL.createObjectURL(samplerSample);

      granularSynthRef.current = new Tone.GrainPlayer({
        url: blobUrl,
        grainSize: 0.2,
        overlap: 0.1,
        playbackRate: 1,
        reverse: true,
        detune: 0,
        random: 0,
        drift: 0,
        onload: () => {
          console.log("Sample loaded");
        },
      } as any);
      setIsLoading(false);
      granularSynthAnalyserRef.current = new Tone.Analyser("waveform", 64);
      granularSynthRef.current.chain(
        granularSynthAnalyserRef.current,
        granularSynthMasterVolume.current,
        masterVolume.current,
        Tone.Destination
      );

      granularSynthRef.current.loop = true;
      granularSynthRef.current.start();
      setIsGrainPlaying(true);

      return () => {
        URL.revokeObjectURL(blobUrl);
        setIsGrainPlaying(false);
        if (granularSynthRef.current) {
          granularSynthRef.current.stop();
          granularSynthRef.current.dispose();
        }
      };
    }
  }, [samplerSample]);
  //UPDATE GRAIN SIZE
  const [grainSize, setGrainSize] = useState(0);
  useEffect(() => {
    if (granularSynthRef.current && "grainSize" in granularSynthRef.current) {
      const numericGrainSize = Math.max(Math.floor(grainSize), 1);
      if (!isNaN(numericGrainSize)) {
        granularSynthRef.current.grainSize = numericGrainSize;
      } else {
        console.error("grainSize is NaN after Math.floor:", grainSize);
      }
    }
  }, [grainSize]);

  //UPDATE GRANULAR SYNTH PLAYBACK
  const [isGrainPlaying, setIsGrainPlaying] = useState<boolean>(false);
  const toggleGrain = () => {
    if (isGrainPlaying === false) {
      granularSynthRef.current.start();
      return;
    }
    if (isGrainPlaying === true) {
      granularSynthRef.current.stop();
    }
  };

  //UPDATE GRANULAR SYNTH SAMPLE
  const removeGrain = () => {
    if (samplerSample !== null) {
      setSamplerSample(null);
      setIsGrainPlaying(false);
    }
  };

  //UPDATE GRANULAR SYNTH VISUALIZATION
  useEffect(() => {
    let interval: any;
    if (isGrainPlaying) {
      interval = setInterval(() => {
        const results = generateStringsWithRandomColors(1, 1000);
        setVisualizationText(results);
      }, 24);
    } else if (!isGrainPlaying && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGrainPlaying]);

  //UPDATE GRANULAR SYNTH OVERLAP
  const [overlapState, setOverlapState] = useState(0.1);
  useEffect(() => {
    if (granularSynthRef.current && "overlap" in granularSynthRef.current) {
      granularSynthRef.current.overlap = overlapState;
    }
  }, [overlapState]);

  //UPDATE GRANULAR SYNTH PLAYBACK RATE
  const [playbackRateState, setPlaybackRateState] = useState(1);
  useEffect(() => {
    if (
      granularSynthRef.current &&
      "playbackRate" in granularSynthRef.current
    ) {
      granularSynthRef.current.playbackRate = Math.max(
        playbackRateState,
        0.001
      );
    }
  }, [playbackRateState]);

  //UPDATE GRANULAR SYNTH RANDOM
  const [randomState, setRandomState] = useState(0);
  useEffect(() => {
    if (granularSynthRef.current && "random" in granularSynthRef.current) {
      granularSynthRef.current.random = randomState;
    }
  }, [randomState]);

  //UPDATE GRANULAR SYNTH DRIFT
  const [driftState, setDriftState] = useState(0);
  useEffect(() => {
    if (granularSynthRef.current && "drift" in granularSynthRef.current) {
      granularSynthRef.current.random = driftState;
    }
  }, [driftState]);

  //UPDATE GRANULAR SYNTH DETUNE
  const [detuneState, setDetuneState] = useState(0);
  useEffect(() => {
    if (granularSynthRef.current && "detune" in granularSynthRef.current) {
      granularSynthRef.current.random = Math.floor(detuneState);
    }
  }, [detuneState]);

  //UPDATE GRANULAR SYNTH REVERSE
  const [reverseGrain, setReverseGrain] = useState(true);
  useEffect(() => {
    if (granularSynthRef.current && "reverse" in granularSynthRef.current) {
      granularSynthRef.current.reverse = reverseGrain;
    }
  }, [reverseGrain]);

  //////////////////////////////
  /// MIXER UPDATE FUNCTIONS ///
  //////////////////////////////

  //UPDATE MASTER VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      masterVolume.current.volume.value = masterVolumeUi;
    }
  }, [masterVolumeUi]);
  //UPDATE BASS VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      bassMasterVolume.current.volume.value = bassMasterVolumeUi;
    }
  }, [bassMasterVolumeUi]);
  //UPDATE DRUM VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      drumMasterVolume.current.volume.value = drumMasterVolumeUi;
    }
  }, [drumMasterVolumeUi]);
  //UPDATE POLYSYNTH VOLUMEF
  useEffect(() => {
    if (masterVolume.current) {
      polySynthMasterVolume.current.volume.value = polySynthMasterVolumeUi;
    }
  }, [polySynthMasterVolumeUi]);
  //UPDATE CHORDSYNTH VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      chordSynthMasterVolume.current.volume.value = chordMasterVolumeUi;
    }
  }, [chordMasterVolumeUi]);
  //UPDATE GRANULARSYNTH VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      granularSynthMasterVolume.current.volume.value = granularSynthMasterVolumeUi;
    }
  }, [granularSynthMasterVolumeUi]);
  //UPDATE PLAYABLESYNTH VOLUME
  useEffect(() => {
    if (masterVolume.current) {
      playableLeadMasterVolume.current.volume.value = playableLeadMasterVolumeUi;
    }
  }, [playableLeadMasterVolumeUi]);

  // //UPDATE MASTER EQ
  // useEffect(() => {
  //   if (masterEq.current) {
  //     masterEq.current.low.value = masterEqUi.low;
  //     masterEq.current.mid.value = masterEqUi.mid;
  //     masterEq.current.high.value = masterEqUi.high;
  //   }
  // }, [masterEqUi]);

  return (
    <>
      <div className="w-full md:min-h-[953px] h-screen flex flex-col justify-center items-center bgGradient">
        {/* <div className='w-full h-[100px]'></div> */}
        <div className="flex flex-col text-tertiary  items-center max-w-full   z-[2]">
          <div className="flex flex-col w-full justify-center items-center pb-4">
            <h1 className="text-2xl md:text-4xl text-white/60 pb-4">
              <span className="text-white/20">D</span>&nbsp;&nbsp;{" "}
              <span className="text-white/40">A</span>&nbsp;&nbsp;{" "}
              <span className="text-white/60">R</span>&nbsp;&nbsp;{" "}
              <span className="text-secondary">K</span>&nbsp;&nbsp;{" "}
              <span className="text-white/80">S</span>&nbsp;&nbsp;{" "}
              <span className="text-white/60">T</span>&nbsp;&nbsp;{" "}
              <span className="text-white/40">E</span>&nbsp;&nbsp;{" "}
              <span className="text-white/20">P</span>&nbsp;&nbsp;
            </h1>
            {isMixerOpen === false && (
              <div className="flex max-w-full md:space-x-4 justify-between">
                <div
                  className="flex-col items-center justify-center p-2 hover:cursor-pointer"
                  onClick={togglePlayback}
                >
                  {playing && (
                    <Power
                      size={40}
                      strokeWidth={1}
                      className="text-quarternary  "
                    />
                  )}
                  {!playing && (
                    <PowerOff
                      size={40}
                      strokeWidth={1}
                      className="text-lightShade "
                    />
                  )}
                </div>
                {Object.entries(instruments).map(([key, value]) => {
                  return (
                    <div
                      className={`flex text-3xl flex-col p-2 items-center border-2 rounded-lg hover:cursor-pointer ${
                        currentInstrument === key
                          ? "border-secondary"
                          : "border-transparent"
                      }`}
                      onClick={() => {
                        setCurrentInstrument(key);
                      }}
                    >
                      <div>{value.icon}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="w-full hidden lg:flex justify-end "></div>
            <div className="w-full flex flex-col justify-end">
              {(currentInstrument === "drums" ||
                (currentInstrument === "polySynth" &&
                  isPolySynthSettingsOpen === false) ||
                currentInstrument === "chordSynth" ||
                currentInstrument === "piano" ||
                currentInstrument === "bass") &&
                isMixerOpen === false && (
                  <SequencerUi
                    steps={steps}
                    activeStep={activeStep}
                    instruments={instruments}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    visualSection={visualSection}
                    setVisualSection={setVisualSection}
                    playing={playing}
                    currentInstrument={currentInstrument}
                    sequencerCore={sequencerCore}
                    setElementsToCore={setElementsToCore}
                    setInstruments={setInstruments}
                    sections={sections}
                    setSections={setSections}
                    elementsToCore={elementsToCore}
                    activeElements={activeElements}
                    setActiveElements={setActiveElements}
                    updateActiveElements={updateActiveElements}
                  />
                )}
              {isMixerOpen === true && (
                <>
                  <Mixer
                    instruments={instruments}
                    masterVolumeUi={masterVolumeUi}
                    setMasterVolumeUi={setMasterVolumeUi}
                    bassMasterVolumeUi={bassMasterVolumeUi}
                    setBassMasterVolumeUi={setBassMasterVolumeUi}
                    drumMasterVolumeUi={drumMasterVolumeUi}
                    setDrumMasterVolumeUi={setDrumMasterVolumeUi}
                    polySynthMasterVolumeUi={polySynthMasterVolumeUi}
                    setPolySynthMasterVolumeUi={setPolySynthMasterVolumeUi}
                    chordMasterVolumeUi={chordMasterVolumeUi}
                    setChordSynthMasterVolumeUi={setChordSynthMasterVolumeUi}
                    granularSynthMasterVolumeUi={granularSynthMasterVolumeUi}
                    setGranularSynthMasterVolumeUi={
                      setGranularSynthMasterVolumeUi
                    }
                    playableLeadMasterVolumeUi={playableLeadMasterVolumeUi}
                    setPlayableLeadMasterVolumeUi={
                      setPlayableLeadMasterVolumeUi
                    }
                    // masterEqUi={masterEqUi}
                    // setMasterEqUi={setMasterEqUi}
                  />
                </>
              )}
              {instruments[currentInstrument as keyof typeof instruments]
                .name === "polySynth" &&
                isPolySynthSettingsOpen === true &&
                isMixerOpen === false && (
                  <>
                    <PolySynthOptions
                      polySynthOscillatorType={polySynthOscillatorType}
                      setPolySynthOscillatorType={setPolySynthOscillatorType}
                      polySynthADSR={polySynthADSR}
                      setPolySynthADSR={setPolySynthADSR}
                    />
                  </>
                )}
              {currentInstrument === "playableLead" &&
                isMixerOpen === false && (
                  <PlayableSynth
                    playableSynthRef={playableSynthRef}
                    reverbRef={playableSynthReverbRef}
                    lowpassFilter={playableSynthLowpassFilter}
                    wobbleRef={playableSynthWobbleRef}
                    delayRef={playableSynthDelayRef}
                  />
                )}
              {currentInstrument === "sampler" &&
                samplerSample === null &&
                isMixerOpen === false && (
                  <UploadSample
                    samplerSample={samplerSample}
                    setSamplerSample={setSamplerSample}
                  />
                )}
              {currentInstrument === "sampler" &&
                samplerSample !== null &&
                isMixerOpen === false && (
                  <GranularSamplerDisplay
                    visualizationText={visualizationText}
                    setGrainSize={setGrainSize}
                    setOverlapState={setOverlapState}
                    setPlaybackRateState={setPlaybackRateState}
                    setRandomState={setRandomState}
                    setDriftState={setDriftState}
                    setDetuneState={setDetuneState}
                    toggleGrain={toggleGrain}
                    removeGrain={removeGrain}
                    reverseGrain={reverseGrain}
                    setReverseGrain={setReverseGrain}
                  />
                )}
              <div className="w-full flex justify-center ">
                <div className="flex w-full md:w-auto justify-center space-x-4 md:bg-black rounded-none md:rounded-xl mt-2 p-2 md:p-4">
                  <div className="h-full  flex flex-col justify-center items-center">
                    <div
                      className="p-2  cursor-pointer"
                      onClick={() => {
                        setIsMixerOpen(!isMixerOpen);
                      }}
                    >
                      <SlidersVertical size={42} className="text-secondary" />
                    </div>
                  </div>
                  <Slider
                    min={20}
                    step={1}
                    max={180}
                    value={[tempo]}
                    className="w-full md:w-64 py-4 SliderPrimitive:bg-red-400"
                    onValueChange={(value) => {
                      setTempo(value[0]);
                    }}
                  />
                  {currentInstrument === "drums" && (
                    <div className="h-full flex flex-col justify-center items-center">
                      <Switch
                        checked={kit === "Live"}
                        onCheckedChange={
                          kit === "808"
                            ? () => setKit("Live")
                            : () => setKit("808")
                        }
                      />
                    </div>
                  )}
                  {currentInstrument === "polySynth" && (
                    <div className="h-full flex flex-col justify-center items-center">
                      <div
                        className="p-2  cursor-pointer"
                        onClick={() => {
                          setIsPolySynthSettingsOpen(!isPolySynthSettingsOpen);
                        }}
                      >
                        <SlidersHorizontal
                          size={42}
                          className="text-secondary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {instruments[currentInstrument as keyof typeof instruments].name ===
              "drums" && <></>}
          </div>
        </div>
        <Modal
          isOpen={hasStartQuery}
          onExit={() => {
            setKit("Live");
            setHasStartQuery(false);
          }}
        >
          <>
            <div
              className="flex-col items-center justify-center p-2 hover:cursor-pointer"
              onClick={togglePlayback}
            >
              {playing && (
                <Power
                  size={40}
                  strokeWidth={1}
                  className="text-quarternary  "
                />
              )}
              {!playing && (
                <PowerOff
                  size={40}
                  strokeWidth={1}
                  className="text-lightShade "
                />
              )}
            </div>
          </>
        </Modal>

        <LoadingModal isLoading={isLoading} />
        {/* <canvas             
          ref={canvasRef}
          className="w-full h-16 md:h-[120px] fixed bottom-[0px] z-[0]"
        /> */}
      </div>
    </>
  );
};

export default Sequencer;





