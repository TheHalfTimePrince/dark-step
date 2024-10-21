import { Slider } from "@/components/ui/slider";
const PolySynthOptions = ({
  polySynthOscillatorType,
  setPolySynthOscillatorType,
  polySynthADSR,
  setPolySynthADSR,
}: {
  polySynthOscillatorType: any;
  setPolySynthOscillatorType: any;
  polySynthADSR: any;
  setPolySynthADSR: any;
}) => {
  const oscillatorTypes = [
    "sine",
    "square",
    "triangle",
    "sawtooth",
    "fmsine",
    "fmsquare",
    "fmtriangle",
    "fmsawtooth",
    "amsine",
    "amtriangle",
    "amsawtooth",
    "fatsquare",
    "fattriangle",
    "fatsawtooth",
    "pulse",
    "pwm",
  ];
  const oscillatorIcons = {
    sine: "sine-1",
    square: "square-1",
    triangle: "triangle-1",
    sawtooth: "saw-1",
    fmsine: "sine-2",
    fmsquare: "square-2",
    fmtriangle: "triangle-2",
    fmsawtooth: "saw-1",
    amsine: "sine-1",
    amtriangle: "triangle-3",
    amsawtooth: "saw-1",
    fatsquare: "square-1",
    fattriangle: "sine-2",
    fatsawtooth: "saw-1",
    pulse: "pulse-1",
    pwm: "square-1",
  };
  return (
    <>
      <div className={`flex flex-col max-w-[32rem]`}>
        <div className="flex flex-wrap ">
          {oscillatorTypes.map((oscillatorType) => {
            return (
              <div
                className={`flex flex-col items-center hover:cursor-pointer  p-2`}
                onClick={() => setPolySynthOscillatorType(oscillatorType)}
              >
                <div
                  className={`w-16 h-16 flex justify-center items-center  rounded-lg border-2  ${
                    polySynthOscillatorType === oscillatorType
                      ? "border-quarternary"
                      : "border-secondary"
                  }`}
                >
                  <img
                    src={`/${
                      oscillatorIcons[
                        oscillatorType as keyof typeof oscillatorIcons
                      ]
                    }.png`}
                    className="w-12 h-12"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-2 gap-4 grid-rows-2 py-4 ">
          <div className="w-full flex flex-col items-center min-h-12 ">
            <Slider
              min={0}
              step={1}
              max={1000}
              className="w-full"
              value={[polySynthADSR[0] * 1000]}
              onValueChange={(value: any) => {
                setPolySynthADSR([
                  value[0] / 1000,
                  polySynthADSR[1],
                  polySynthADSR[2],
                  polySynthADSR[3],
                ]);
                // polySynthOptionsRef.current.envelope.attack =
                //   value[0] / 1000;
              }}
            />
          </div>
          <div className="w-full flex flex-col items-center min-h-12">
            <Slider
              min={0}
              step={1}
              max={1000}
              className="w-full"
              value={[polySynthADSR[1] * 1000]}
              onValueChange={(value: any) => {
                setPolySynthADSR([
                  polySynthADSR[0],
                  value[0] / 1000,
                  polySynthADSR[2],
                  polySynthADSR[3],
                ]);
                // polySynthOptionsRef.current.envelope.decay =
                //   value[0] / 1000;
              }}
            />
          </div>
          <div className="w-full flex flex-col items-center min-h-12">
            <Slider
              min={0}
              step={1}
              max={1000}
              className="w-full"
              value={[polySynthADSR[2] * 1000]}
              onValueChange={(value: any) => {
                setPolySynthADSR([
                  polySynthADSR[0],
                  polySynthADSR[1],
                  value[0] / 1000,
                  polySynthADSR[3],
                ]);
                // polySynthOptionsRef.current.envelope.sustain =
                //   value[0] / 1000;
              }}
            />
          </div>
          <div className="w-full flex flex-col items-center min-h-12">
            <Slider
              min={0}
              step={1}
              max={10000}
              value={[polySynthADSR[3] * 1000]}
              className="w-full"
              onValueChange={(value: any) => {
                setPolySynthADSR([
                  polySynthADSR[0],
                  polySynthADSR[1],
                  polySynthADSR[2],
                  value[0] / 1000,
                ]);
                // polySynthOptionsRef.current.envelope.release =
                //   value[0] / 1000;
              }}
            />
          </div>
        </div>
        {/* <div className=" mt-8 flex flex-col pr-16 items-center w-full h-4">
                  <Slider
                    min={0}
                    step={1}
                    max={60}
                    value={[watchPolySynthVolume + 60]}
                    onValueChange={(value:any) => {
                      setWatchPolySynthVolume(value[0] - 60);
                      polySynthVolumeRef.current.volume.value = value[0] - 60;
                    }}
                  />
                </div> */}
      </div>
    </>
  );
};

export default PolySynthOptions;
