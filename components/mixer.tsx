import { useState, useEffect } from "react";
import { SliderVertical } from "./ui/slider-vertical";
import { Slider } from "./ui/slider";
import Knob from "simple-react-flex-knob";

const Mixer = ({
  instruments,
  masterVolumeUi,
	setMasterVolumeUi,
	// masterEqUi,
	// setMasterEqUi,
	bassMasterVolumeUi,
	setBassMasterVolumeUi,
	drumMasterVolumeUi,
	setDrumMasterVolumeUi,
	polySynthMasterVolumeUi,
	setPolySynthMasterVolumeUi,
	chordMasterVolumeUi,
	setChordSynthMasterVolumeUi,
	granularSynthMasterVolumeUi,
	setGranularSynthMasterVolumeUi,
	playableLeadMasterVolumeUi,
	setPlayableLeadMasterVolumeUi,

}: {
  instruments: any;
  masterVolumeUi: any;
	setMasterVolumeUi: any;
	// masterEqUi: any;
	// setMasterEqUi: any;
	bassMasterVolumeUi: any;
	setBassMasterVolumeUi: any;
	drumMasterVolumeUi: any;
	setDrumMasterVolumeUi: any;
	polySynthMasterVolumeUi: any;
	setPolySynthMasterVolumeUi: any;
	chordMasterVolumeUi: any;
	setChordSynthMasterVolumeUi: any;
	granularSynthMasterVolumeUi: any;
	setGranularSynthMasterVolumeUi: any;
	playableLeadMasterVolumeUi: any;
	setPlayableLeadMasterVolumeUi: any;
}) => {
  return (
    <>
      <div className="flex flex-col min-w-full md:min-w-0">
        <div className="flex  justify-center">
          <div className="flex flex-col">
					<div className="text-3xl flex justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.bass.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[bassMasterVolumeUi]}
								onValueChange={(value: any) => {
									setBassMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full text-3xl flex justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.chordSynth.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[chordMasterVolumeUi]}
								onValueChange={(value: any) => {
									setChordSynthMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full text-3xl flex overflow-auto justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.drums.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[drumMasterVolumeUi]}
								onValueChange={(value: any) => {
									setDrumMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full text-3xl flex justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.polySynth.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[polySynthMasterVolumeUi]}
								onValueChange={(value: any) => {
									setPolySynthMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full text-3xl flex justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.sampler.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[granularSynthMasterVolumeUi]}
								onValueChange={(value: any) => {
									setGranularSynthMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full text-3xl flex justify-center items-center">
              <div className="py-4 flex flex-col relative">
                <div className="p-2 flex items-center  justify-center">
                  {instruments.playableLead.icon}
                </div>
                <SliderVertical
                min={-60}
                step={1}
                max={16}
                value={[playableLeadMasterVolumeUi]}
								onValueChange={(value: any) => {
									setPlayableLeadMasterVolumeUi(value[0]);
								}}
                  className="h-64 z-[10]"
                  orientation="vertical"
                />
              </div>
              {/* <div className="flex flex-col h-full justify-end pb-2">
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
                <div className="p-1">
                  <Knob
                    diameter={"2rem"}
                    color="#9E2B25"
                    pointerColor="#F6F1D1"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full flex-col text-3xl flex justify-center items-center">
            <div className="pt-4 flex items-center justify-center w-full relative">
              <div className="p-2 flex items-center  justify-center">
                {"🔊"}
              </div>
              <Slider
                min={-60}
                step={1}
                max={16}
                value={[masterVolumeUi]}
								onValueChange={(value: any) => {
									setMasterVolumeUi(value[0]);
								}}
                className="w-full h-4 z-[10]"
              />
            </div>
            {/* <div className="flex w-full h-full items-start justify-end pb-2">
              <div className="p-1">
                <Knob
                  diameter={"2rem"}
                  color="#F6F1D1"
                  pointerColor="#9E2B25"
									action={(midi: number, value: number) => setMasterEqUi({...masterEqUi, low: value * 10})}
                />
              </div>
              <div className="p-1">
                <Knob
                  diameter={"2rem"}
                  color="#F6F1D1"
                  pointerColor="#9E2B25"
									action={(midi: number, value: number) => setMasterEqUi({...masterEqUi, mid: value * 10})}
                />
              </div>
              <div className="p-1">
                <Knob
                  diameter={"2rem"}
                  color="#F6F1D1"
                  pointerColor="#9E2B25"
									action={(midi: number, value: number) => setMasterEqUi({...masterEqUi, high: value * 10})}
                />
              </div>
              <div className="p-1">
                <Knob
                  diameter={"2rem"}
                  color="#F6F1D1"
                  pointerColor="#9E2B25"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mixer;
