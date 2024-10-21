// import React, { useEffect, useRef, useState } from 'react';

// const ADSRCanvas = ({ adsr, setAdsr, width = 600, height = 150 }) => {
//   const canvasRef = useRef(null);
//   const [draggingPoint, setDraggingPoint] = useState(null);

//   const pointRadius = 5; // Radius of the draggable points
//   // ADSR point positions (these will be calculated based on ADSR values)
//   const points = useRef([
//     { x: 0, y: height }, // Placeholder for 'Attack', recalculated in `updatePoints()`
//     { x: 0, y: 0 }, // Placeholder for 'Decay', recalculated in `updatePoints()`
//     { x: 0, y: 0 }, // Placeholder for 'Sustain', recalculated in `updatePoints()`
//     { x: 0, y: height }  // Placeholder for 'Release', recalculated in `updatePoints()`
//   ]);

//   useEffect(() => {
//     // Subscribe to mouse events
//     const handleMouseMove = (e) => {
//       if (draggingPoint !== null) {
//         const canvas = canvasRef.current;
//         const rect = canvas.getBoundingClientRect();

//         const newX = e.clientX - rect.left;
//         const newY = e.clientY - rect.top;

//         // Basic boundary checks
//         const clampedX = Math.min(Math.max(newX, 0), width);
//         const clampedY = Math.min(Math.max(newY, 0), height);

//         // Attack - maps x position to time
//         if (draggingPoint === 0) {
//           const attackTime = clampedX / width; // Assuming the width represents 1 second
//           setAdsr([attackTime, adsr[1], adsr[2], adsr[3]]);
//         }
//         // Other points would need similar handling, customized based on how they map to ADSR parameters

//         updatePoints(); // Recalculate the point positions based on updated ADSR
//         drawEnvelope(); // Redraw the envelope with new point positions
//       }
//     };

//     const handleMouseUp = () => {
//       setDraggingPoint(null);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   });

//   useEffect(() => {
//     updatePoints();
//     drawEnvelope();
//   }, [adsr, width, height]);

//   const updatePoints = () => {
//     // Convert ADSR values to canvas coordinates and store in `points.current`
//     // This is a simplified calculation and should be adapted based on your ADSR range and canvas size
//     points.current[0] = { x: adsr[0] * width, y: 0 }; // Attack
//     // Calculate and update positions for Decay, Sustain, Release similarly...
//   };

//   const drawEnvelope = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, width, height);

//     // Draw the envelope
//     ctx.beginPath();
//     ctx.moveTo(0, height); // Start at the bottom left
//     points.current.forEach((point) => {
//       ctx.lineTo(point.x, point.y);
//     });
//     ctx.stroke();

//     // Draw the draggable points
//     points.current.forEach((point, index) => {
//       ctx.beginPath();
//       ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
//       ctx.fill();

//       // Make the first point clickable for the demonstration
//       if (index === 0) {
//         ctx.canvas.addEventListener('mousedown', (e) => {
//           const rect = canvas.getBoundingClientRect();
//           const x = e.clientX - rect.left;
//           const y = e.clientY - rect.top;
//           // Check if the click is within the point's radius
//           if (Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2) < pointRadius) {
//             setDraggingPoint(index);
//           }
//         });
//       }
//     });
//   };

//   return <canvas ref={canvasRef} width={width} height={height} style={{ width: '100%', cursor: draggingPoint !== null ? 'grabbing' : 'default' }} />;
// };

// export default ADSRCanvas;