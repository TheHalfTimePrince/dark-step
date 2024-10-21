
const defaultAdsr = {attack: 0.1, decay: 0.1, sustain: 0.1, release: 0.1};

const noteActionsTemplate = {
    0: "E4" , // E
    1: "G4" , // G
    2: "A4" , // A
    3: "B4" , // B
    4: "D5" , // D
    5: "E5" , // E (an octave higher)
    6: "G5" , // G (an octave higher)
    7: "A5" , // A (an octave higher)
    8: "B5" , // B (an octave higher)
    9: "D6" , // D (an octave higher)
    10: "E6" , // E (two octaves higher)
    11: "G6" , // G (two octaves higher)
    12: "A6" , // A (two octaves higher)
    13: "B6" , // B (two octaves higher)
    14: "D7" , // D (two octaves higher)
    15: "E7"   // E (three octaves higher)
};

const chordActionsTemplate = {
    0: ["E3", "G3", "B3", "D4"],     // E minor 7th (E - G - B - D)
    1: ["F#3", "A3", "C4", "E4"],    // F# minor 7th (F# - A - C - E)
    2: ["G3", "B3", "D4", "F#4"],    // G major 7th (G - B - D - F#)
    3: ["A3", "C4", "E4", "G4"],     // A minor 7th (A - C - E - G)
    4: ["B3", "D4", "F#4", "A4"],    // B minor 7th (B - D - F# - A)
    5: ["C4", "E4", "G4", "B4"],     // C major 7th (C - E - G - B)
    6: ["D4", "F#4", "A4", "C5"],    // D dominant 7th (D - F# - A - C)
    7: ["E3", "G3", "B3", "D4", "F#4"],   // E minor 9th (E - G - B - D - F#)
    8: ["F#3", "A3", "C4", "E4", "G4"],  // F# minor 9th (F# - A - C - E - G)
    9: ["G3", "B3", "D4", "F#4", "A4"],  // G major 9th (G - B - D - F# - A)
    10: ["A3", "C4", "E4", "G4", "B4"],  // A minor 9th (A - C - E - G - B)
    11: ["B3", "D4", "F#4", "A4", "C#5"], // B minor 9th (B - D - F# - A - C#)
    12: ["C4", "E4", "G4", "B4", "D5"],   // C major 9th (C - E - G - B - D)
    13: ["D4", "F#4", "A4", "C5", "E5"],  // D dominant 9th (D - F# - A - C - E)
    14: ["E3", "G3", "B3", "D4"],   // E minor 7th (E - G - B - D) - an octave higher
    15: ["F#3", "A3", "C4", "E4"]  // F# minor 7th (F# - A - C - E) - an octave higher
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

const instrumentsInit = {
    drums: {
        name: "drums",
        icon: "🥁",
        noteActions: drumActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
    bass: {
        name: "bass",
        icon: "🎸",
        noteActions: noteActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
    chordSynth: {
        name: "chordSynth",
        icon: "🎻",
        noteActions: chordActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
    polySynth: {
        name: "polySynth",
        icon: "🪕",
        noteActions: noteActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: -16,
        pan: 0,
    },
    sampler: {
        name: "sampler",
        icon: "🎼",
        noteActions: noteActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
    playableLead:{
        name: "playableLead",
        icon: "🎺",
        noteActions: noteActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
    midiPiano: {
        name: "midiPiano",
        icon: "🎹",
        noteActions: noteActionsTemplate,
        styleWatch: [],
        adsr: defaultAdsr,
        volume: 0,
        pan: 0,
    },
}


export {instrumentsInit}