'use client'
import {useState, useEffect} from "react"
import Knob from 'simple-react-flex-knob';
const GranularSampler = ({samplerRef}: {samplerRef:any}) => {
    const [grainSize, setGrainSize] = useState(0)
    useEffect(() => {
        if(grainSize !== null){
        samplerRef.current.grainSize = 5
        }
    }, [grainSize])
    return (
            <div className='flex flex-col w-full aspect-square p-4 rounded-lg bg-secondary/20 '>
              <div className='flex flex-wrap w-full h-1/2 rounded-t-lg bg-secondary'>
              <Knob
                diameter="20vw"
                color="lightblue"
                pointerColor="white"
                action={(midi:number, val:number) => setGrainSize(val * 10)}
              />
              </div>
            </div>
    );
};

export default GranularSampler;