# Dark Step: Interactive Web-Based Multi-Instrument Step Sequencer

Dark Step is a powerful and intuitive web-based step sequencer built with Next.js and Tone.js. It offers a unique and engaging way to create music directly in your browser, featuring multiple instruments and a visually appealing interface.

## Features

- Multi-instrument support: Drums, Bass, Chord Synth, Poly Synth, Sampler, and Playable Lead
- 16-step sequencer with 8 sections for complex patterns
- Real-time audio processing using Tone.js
- Interactive UI with visual feedback
- Mixer with individual volume controls for each instrument
- Tempo control
- Playable synth with touch and mouse support
- Granular synthesis capabilities
- MIDI support (Piano)

## Technology Stack

- Next.js for the frontend framework
- Tone.js for audio synthesis and sequencing
- React for UI components
- TypeScript for type-safe code
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select an instrument using the icons at the top of the interface.
2. Click on the grid to add or remove notes in the sequencer.
3. Use the play button to start or stop the sequence.
4. Adjust the tempo using the slider at the bottom.
5. Switch between sections using the horizontal blocks below the main grid.
6. Use the mixer to adjust volumes for individual instruments and the master output.
7. Experiment with the playable synth by clicking and dragging on its interface.

## Components

- Sequencer: The main component that orchestrates the entire application
- SequencerUI: Handles the visual representation and interaction with the step sequencer
- PlayableSynth: An interactive synthesizer controlled by mouse or touch input
- Mixer: Allows for volume control of individual instruments and master output
- GranularSamplerDisplay: Interface for uploading and manipulating audio samples

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by Ziggy Baker - [ziggybaker.com](https://ziggybaker.com)
