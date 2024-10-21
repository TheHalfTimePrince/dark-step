"use client";
import { useEffect, useState } from "react";
import { Copy, Trash } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
const SequencerUi = ({
  steps,
  activeStep,
  instruments,
  activeSection,
  setActiveSection,
  visualSection,
  setVisualSection,
  playing,
  currentInstrument,
  sequencerCore,
  setElementsToCore,
  setInstruments,
  sections,
  setSections,
  elementsToCore,
  activeElements,
  setActiveElements,
  updateActiveElements,
}: {
  steps: number;
  activeStep: number;
  instruments: any;
  activeSection: number;
  setActiveSection: any;
  visualSection: number;
  setVisualSection: any;
  playing: boolean;
  currentInstrument: string;
  sequencerCore: any;
  setElementsToCore: any;
  setInstruments: any;
  sections: number[];
  setSections: any;
  elementsToCore: any;
  activeElements: any;
  setActiveElements: any;
  updateActiveElements: any;
}) => {
  const stepToTimeMap: Record<string, string> = {
    "0": ":0:0",
    "1": ":0:1",
    "2": ":0:2",
    "3": ":0:3",
    "4": ":1:0",
    "5": ":1:1",
    "6": ":1:2",
    "7": ":1:3",
    "8": ":2:0",
    "9": ":2:1",
    "10": ":2:2",
    "11": ":2:3",
    "12": ":3:0",
    "13": ":3:1",
    "14": ":3:2",
    "15": ":3:3",
  };

  //GET SEQUENCER SQUARE STYLING
  function getDynamicClass(index: number, innerIndex: number) {
    const isStepSelected = instruments[currentInstrument].styleWatch[
      visualSection
    ].some(
      (item: any) => item.index === index && item.innerIndex === innerIndex
    );
    switch (true) {
      case isStepSelected:
        return "md:scale-[60%] bg-secondary";
      case !playing && index === 0:
        return "bg-lightShade/80";

      default:
        return "bg-secondary/20";
    }
  }

  //CLICK/UNCLICK SEQUENCER SQUARES
  //UPDATE THE SEQUENCER CORE
  function changeSelection(index: number, innerIndex: number) {
    const instrument = instruments[currentInstrument];
    const element = {
      time: stepToTimeMap[index.toString()],
      note: instrument.noteActions[innerIndex],
      instrument: instrument.name,
    };

    const wowIndex = activeElements[visualSection].findIndex(
      (el: any) =>
        el.time === element.time &&
        el.note === element.note &&
        el.instrument === element.instrument
    );
    //REMOVE A NOTE TO THE SEQUENCER CORE
    if (wowIndex !== -1) {
      const newActiveElements = activeElements;
      newActiveElements[visualSection] = newActiveElements[
        visualSection
      ].filter((_: any, idx: number) => idx !== wowIndex);
      setActiveElements(newActiveElements);

      const sectionCurrentlyEditing = sections.indexOf(visualSection);
      const adjustedElement = {
        time: sectionCurrentlyEditing.toString() + element.time,
        note: element.note,
        instrument: element.instrument,
      };
      const originalElement = elementsToCore.find(
        (el: any) =>
          el.time === adjustedElement.time &&
          el.note === adjustedElement.note &&
          el.instrument === adjustedElement.instrument
      );

      if (originalElement) {
        sequencerCore.current.remove(originalElement);
      }
      setElementsToCore([
        ...elementsToCore.filter((el: any) => el !== originalElement),
      ]);
      setInstruments((prevState: any) => {
        let newStyleWatch = prevState[
          currentInstrument
        ].styleWatch.map((item: any, idx: number) =>
          idx === visualSection
            ? item.filter(
                (i: any) => i.index !== index || i.innerIndex !== innerIndex
              )
            : item
        );

        return {
          ...prevState,
          [currentInstrument]: {
            ...prevState[currentInstrument],
            styleWatch: newStyleWatch,
          },
        };
      });
    } else {
      //ADD A NOTE TO THE SEQUENCER CORE
      const sectionCurrentlyEditing = sections.indexOf(visualSection);
      const newActiveElement = [...activeElements[visualSection], element];
      const newActiveElements = activeElements;
      newActiveElements[visualSection] = newActiveElement;
      setActiveElements(newActiveElements);

      const adjustedElement = {
        time: sectionCurrentlyEditing.toString() + element.time,
        note: element.note,
        instrument: element.instrument,
      };
      setElementsToCore([...elementsToCore, adjustedElement]);
      sequencerCore.current.add(adjustedElement);

      setInstruments((prevState: any) => ({
        ...prevState,
        [currentInstrument]: {
          ...prevState[currentInstrument],
          styleWatch: prevState[currentInstrument].styleWatch.map(
            (item: any, idx: number) =>
              idx === visualSection
                ? [
                    ...item,
                    {
                      index: index,
                      innerIndex: innerIndex,
                    },
                  ]
                : item
          ),
        },
      }));
    }
  }

  //UPDATE THE VISUALIZATION OF THE SEQUENCER
  //MANAGE THE ANIMATION OF THE SEQUENCER SQUARES
  //MANAGE THE ANIMATION OF THE SEQUENCER SECTIONS
  useEffect(() => {
    //UPDATE THE VISUALIZATION OF THE SEQUENCER
    if (activeStep === 15) {
      const prevSection = activeSection;
      const nextSection =
        sections.indexOf(prevSection) === sections.length - 1
          ? 0
          : sections[sections.indexOf(prevSection) + 1];

      setActiveSection(nextSection);
    }
    //MANAGE THE ANIMATION OF THE SEQUENCER SQUARES
    const showTime = visualSection === activeSection;
    if (showTime) {
      for (let i: number = 0; i < 16; i++) {
        const isStepSelected = instruments[currentInstrument].styleWatch[
          visualSection
        ].some(
          (item: any) => item.index === activeStep && item.innerIndex === i
        );
        let element = document.getElementById(
          (activeStep + i * steps).toString() + "-burst"
        );
        if (!element) {
          console.error("element not found");
          continue;
        }
        if (isStepSelected) {
          element.classList.remove("fade");
          element.classList.remove("burst");
          element.classList.remove("rounded-lg");
          element.classList.add("rounded-full");
          void element.offsetWidth;
          element.classList.add("burst");
        } else {
          element.classList.remove("fade");
          element.classList.remove("rounded-full");
          element.classList.add("rounded-lg");
          void element.offsetWidth;
          element.classList.add("fade");
        }
      }
    }
    //MANAGE THE ANIMATION OF THE SEQUENCER SECTIONS
    const element = document.getElementById(
      activeSection.toString() +
        "-" +
        Math.floor(activeStep / 2).toString() +
        "-window"
    );
    if (element !== null) {
      if (showTime) {
        element.classList.remove("window-fade");
        element.classList.remove("window-burst");
        element.classList.remove("md:rounded-lg");
        element.classList.add("md:rounded-full");
        void element.offsetWidth;
        element.classList.add("window-burst");
      } else {
        element.classList.remove("window-fade");
        element.classList.remove("window-burst");
        element.classList.remove("md:rounded-lg");
        element.classList.add("md:rounded-full");
        void element.offsetWidth;
        element.classList.add("window-fade");
      }
    }
  }, [activeStep]);

  //COPY A SECTION
  function copySection(index: number) {
    if (visualSection === index) {
      return;
    }
    if (visualSection !== index) {
      const newActiveElements = activeElements;
      newActiveElements[visualSection] = newActiveElements[visualSection].filter((item:any) => item.instrument !== currentInstrument);
      newActiveElements[visualSection] = newActiveElements[visualSection].concat(activeElements[index].filter((item:any) => item.instrument === currentInstrument));
      setActiveElements(newActiveElements);
      updateActiveElements();


      setInstruments((prevState: any) => {
        const newStyleWatch = [...prevState[currentInstrument].styleWatch];
        newStyleWatch[visualSection] = [...newStyleWatch[index]];
      
        return {
          ...prevState,
          [currentInstrument]: {
            ...prevState[currentInstrument],
            styleWatch: newStyleWatch,
          },
        };
      });

    }
  }

  //TRASH A SECTION
  function trashSection(index:number){
    const newActiveElements = activeElements;
    newActiveElements[index] = newActiveElements[index].filter((item:any) => item.instrument !== currentInstrument);
    setActiveElements(newActiveElements);
    updateActiveElements();

    setInstruments((prevState: any) => {
      const newStyleWatch = [...prevState[currentInstrument].styleWatch];
      newStyleWatch[index] = [];
    
      return {
        ...prevState,
        [currentInstrument]: {
          ...prevState[currentInstrument],
          styleWatch: newStyleWatch,
        },
      };
    });

  }



  return (
    <>
      <div className="w-full  flex flex-col items-center justify-center">
        <div className=" flex px-[1px] md:px-0 w-full max-w-screen items-center justify-center space-x-0 md:space-x-1">
          {Array.from({ length: steps }).map((_, index) => {
            return (
              <div key={index} className={`w-[6.25%] md:w-8  flex flex-col space-y-0 md:space-y-1`}>
                {Array.from({ length: steps }).map((_, innerIndex) => {
                  return (
                    <div
                      key={index + innerIndex * steps}
                      className={`w-full md:w-8 aspect-square text-xs border border-secondary md:border-none rounded-none md:rounded-lg  flex justify-center items-center   cursor-crosshair  relative ${getDynamicClass(
                        index,
                        innerIndex
                      )}`}
                      onClick={() => {
                        changeSelection(index, innerIndex);
                      }}
                    >
                      <div
                        key={index + (innerIndex * steps).toString() + "-burst"}
                        id={(index + innerIndex * steps).toString() + "-burst"}
                        className="w-full h-full rounded-none md:rounded-lg  absolute top-0 left-0 pointer-events-none"
                      ></div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-8 pt-4 md:px-4">
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <div className="flex w-full flex-col items-center justify-center px-none md:px-4">
                <div
                  key={index}
                  className={` w-full aspect-square grid grid-cols-8 grid-rows-1 cursor-crosshair  rounded-none md:rounded-lg ${
                    visualSection === index
                      ? "bg-lightShade/80"
                      : sections.includes(index)
                      ? "bg-secondary"
                      : "bg-secondary/20"
                  }
                  ${
                    index >= 1 && index <= 7 ?
                    "border-r-[1px] border-y-[1px] border-secondary md:border-none"
                    : index === 0 ? "border-[1px] border-secondary md:border-none" : ""
                  }`
                }
                  onClick={() => {
                    if (visualSection === index && sections.includes(index)) {
                      if (visualSection === 0) {
                        return;
                      } else {
                        let filteredSections = sections.filter(
                          (section) => section !== index
                        );
                        setSections(filteredSections);
                        setVisualSection(sections[filteredSections.length - 1]);
                      }
                    } else if (!sections.includes(index)) {
                      const newSections = [...sections, index].sort(
                        (a, b) => a - b
                      );
                      setSections(newSections);
                      setVisualSection(index);
                    } else if (
                      sections.includes(index) &&
                      visualSection !== index
                    ) {
                      setVisualSection(index);
                    }
                  }}
                >
                  {Array.from({ length: 8 }).map((_, innerIndex) => {
                    return (
                      <>
                        <div
                          id={
                            index.toString() +
                            "-" +
                            innerIndex.toString() +
                            "-window"
                          }
                          className={`w-full h-full ${
                            innerIndex === 0
                              ? "md:rounded-r-lg"
                              : innerIndex === 7
                              ? "md:rounded-l-lg"
                              : "rounded-none md:rounded-none"
                          }`}
                        ></div>
                      </>
                    );
                  })}
                </div>
                <div className="flex flex-col md:flex-row items-center rounded-none md:rounded-lg  justify-center py-2 px-2">
                  <Copy
                    className={`w-5 text-secondary/20 ${index === visualSection ? "hover:text-secondary/20 cursor-not-allowed" : "hover:text-quarternary cursor-pointer"}  mx-1`}
                    onClick={() => {
                      copySection(index);
                    }}
                  />
                  <Trash
                    className="w-5 mt-1 md:mt-0 text-secondary/20 hover:text-quarternary cursor-pointer mx-1"
                    onClick={() => {
                      trashSection(index);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SequencerUi;
