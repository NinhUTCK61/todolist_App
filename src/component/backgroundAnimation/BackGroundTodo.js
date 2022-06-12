import "./BackGroundTodo.css"
import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
export default function BackGroundTodo() {
    const particlesInit = async (main) => {
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
    const particlesLoaded = (container) => {
    };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          "image": "url('https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-013-heavy-rain.png')",
          "repeat": "no-repeat",
          "size": "cover"
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#fff",
          },
          links: {
            color: "#fff",
            distance: 160,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 4,
            straight: true,
          },
          number: {
            density: {
              enable: true,
              area: 600,
            },
            value: 60,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
