import { Fragment } from "react";
import Knob from "simple-react-flex-knob";
import { Play, X, RefreshCcw } from "lucide-react";

const GranularSamplerDisplay = ({
    visualizationText,
    setGrainSize,
    setOverlapState,
    setPlaybackRateState,
    setRandomState,
    setDriftState,
    setDetuneState,
    toggleGrain,
    removeGrain,
    reverseGrain,
    setReverseGrain,
}:{
  visualizationText: any;
  setGrainSize: any;
  setOverlapState: any;
  setPlaybackRateState: any;
  setRandomState: any;
  setDriftState: any;
  setDetuneState: any;
  toggleGrain: any;
  removeGrain: any;
  reverseGrain: any;
  setReverseGrain: any;
}) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
    <div className="flex flex-col w-[90%] md:w-full h-[90%] aspect-square md:max-w-[38rem]  p-4 rounded-lg bg-secondary/20 ">
      <div className="flex flex-wrap w-full h-1/2 rounded-t-lg border border-quarternary bg-lightShade/20 text-wrap overflow-hidden">
        {visualizationText.map((spanElement: any, index: number) => (
          <Fragment key={index}>{spanElement}</Fragment>
        ))}
      </div>
      <div className="flex flex-wrap h-1/2 w-full">
        <div className="p-3">
          <div className=" w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) => setGrainSize(val * 10)}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) => setOverlapState(val)}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) =>
                setPlaybackRateState(val * 10)
              }
            />
          </div>
        </div>
        <div className="p-3">
          <div className="w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) => setRandomState(val)}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) => setDriftState(val)}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="w-8 md:w-16 cursor-pointer">
            <Knob
              diameter="100%"
              color="#F6F1D1"
              pointerColor="#EABE6C"
              action={(midi: number, val: number) => setDetuneState(val * 100)}
            />
          </div>
        </div>
        <div className="p-3">
          <div className="cursor-pointer" onClick={toggleGrain}>
            <Play className="text-lightShade w-16" />
          </div>
        </div>
        <div className="p-3">
          <div className="cursor-pointer" onClick={removeGrain}>
            <X className="text-lightShade w-16" />
          </div>
        </div>
        <div className="p-3">
          <div
            className="cursor-pointer"
            onClick={() => {
              setReverseGrain(!reverseGrain);
            }}
          >
            <RefreshCcw className="text-lightShade w-16" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default GranularSamplerDisplay;
