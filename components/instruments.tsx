const noteActionsTemplate = {
    0: "E4", 
    1: "F#4", 
    2: "G4",  
    3: "A4",  
    4: "B4", 
    5: "C5", 
    6: "D5",  
    7: "E5",  
    8: "F#5",
    9: "G5",  
    10: "A5", 
    11: "B5", 
    12: "C6", 
    13: "D6", 
    14: "E6", 
    15: "F#6" 
};

const chordActionsTemplate = {
    0: ["E3", "G3", "B3", "D4"],    
    1: ["F#3", "A3", "C4", "E4"],    
    2: ["G3", "B3", "D4", "F#4"],    
    3: ["A3", "C4", "E4", "G4"],     
    4: ["B3", "D4", "F#4", "A4"],    
    5: ["C4", "E4", "G4", "B4"],     
    6: ["D4", "F#4", "A4", "C5"],    
    7: ["E3", "G3", "B3", "D4", "F#4"],   
    8: ["F#3", "A3", "C4", "E4", "G4"],  
    9: ["G3", "B3", "D4", "F#4", "A4"],  
    10: ["A3", "C4", "E4", "G4", "B4"],  
    11: ["B3", "D4", "F#4", "A4", "C#5"],
    12: ["C4", "E4", "G4", "B4", "D5"],   
    13: ["D4", "F#4", "A4", "C5", "E5"],  
    14: ["E4", "G4", "B4", "D4"],  
    15: ["F#4", "A4", "C4", "E4"] 
};

const drumActionsTemplate = {
    0: "C1" ,
    1: "D1" ,
    2: "E1" ,
    3: "F1" ,
    4: "G1" ,
    5: "A1" ,
    6: "B1" ,
    7: "C2" ,
    8: "D2" ,
    9: "E2" ,
    10: "F2" ,
    11: "G2" ,
    12: "A2" ,
    13: "B2" ,
    14: "C3" ,
    15: "D3" ,
};

const styleWatchTemplate = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]

const instrumentsInit = {

    bass: {
        name: "bass",
        icon: "🎸",
        noteActions: drumActionsTemplate,
        styleWatch: styleWatchTemplate,
    },
    chordSynth: {
        name: "chordSynth",
        icon: "🎼",
        noteActions: chordActionsTemplate,
        styleWatch: styleWatchTemplate,
    },
    drums: {
        name: "drums",
        icon: "🥁",
        noteActions: drumActionsTemplate,
        styleWatch: styleWatchTemplate,
    },
    polySynth: {
        name: "polySynth",
        icon: "🔔",
        noteActions: noteActionsTemplate,
        styleWatch: styleWatchTemplate,
        volume: -16,
    },
    sampler: {
        name: "sampler",
        icon: "📼",
    },
    playableLead:{
        name: "playableLead",
        icon: "🎺",
        noteActions: noteActionsTemplate,
    },

}


export {instrumentsInit}