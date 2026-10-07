import React, { useState } from 'react';
import styled from 'styled-components';

const MAX_TILT_X = 20; // degrees (up / down)
const MAX_TILT_Y = 10; // degrees (left / right)

const Card = ({
  intro = 'this is only the beginning persian tell',
  hoverText = 'AWESOME',
}) => {
  const [active, setActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Works for mouse, touch and pen (pointer events)
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    setActive(true);
    setTilt({
      x: (0.5 - py) * 2 * MAX_TILT_X,
      y: (px - 0.5) * 2 * MAX_TILT_Y,
    });
  };

  const reset = () => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <StyledWrapper>
      <div
        className="container"
        data-active={active}
        onPointerEnter={handleMove}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onPointerUp={(e) => e.pointerType !== 'mouse' && reset()}
        onPointerCancel={reset}
      >
        <div
          id="card"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <div className="intro">{intro}</div>
          <div className="title">{hoverText}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const gradient = `linear-gradient(
  43deg,
  rgb(65, 88, 208) 0%,
  rgb(200, 80, 192) 46%,
  rgb(255, 204, 112) 100%
)`;

const StyledWrapper = styled.div`
  font-family: inherit; /* same font as the rest of the site */

  .container {
    position: relative;
    width: 190px;
    height: 254px;
    perspective: 800px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: pan-y; /* page can still scroll vertically on mobile */
  }

  #card {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: ${gradient};
    transition: transform 700ms ease-out, filter 300ms;
  }

  /* glow behind the card */
  #card::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: ${gradient};
    filter: blur(2rem);
    opacity: 30%;
    transition: opacity 200ms;
  }

  .intro,
  .title {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
    font-family: inherit;
    font-size: x-large;
    font-weight: bold;
    color: #fff;
  }

  .intro {
    transition: opacity 300ms ease-in-out;
  }

  .title {
    opacity: 0;
    transition: opacity 300ms ease-in-out 100ms;
  }

  .container[data-active='true'] #card {
    transition: transform 125ms ease-in-out, filter 300ms;
    filter: brightness(1.1);
  }

  .container[data-active='true'] #card::before {
    opacity: 80%;
  }

  .container[data-active='true'] .intro {
    opacity: 0;
  }

  .container[data-active='true'] .title {
    opacity: 1;
  }
`;

export default Card;