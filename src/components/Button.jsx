import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// `bg` = background color of the page behind the button.
// The small "gap" pieces on the border use it to cut the outline.
const Button = ({ children = 'Rockets', to = '/rockets', bg = '#000', ...props }) => {
  return (
    <StyledWrapper $bg={bg}>
      <Link className="fancy" to={to} {...props}>
        <span className="top-key" />
        <span className="text">{children}</span>
        <span className="bottom-key-1" />
        <span className="bottom-key-2" />
      </Link>
    </StyledWrapper>
  );
};

// "Pressed" look: white fill, black text, gaps in the border close.
const pressed = css`
  color: #000;
  background: #fff;

  .text {
    color: #000;
    padding-left: 1.5em;
  }

  .top-key {
    left: -2px;
    width: 0;
  }

  .bottom-key-1,
  .bottom-key-2 {
    right: 0;
    width: 0;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .fancy {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0;
    min-width: 196px;
    height: 52px;
    padding: 0 1.6em;
    border: 2px solid #fff;
    border-radius: 0;
    background: transparent;
    color: #fff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    overflow: visible;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out,
      transform 0.15s ease;

    .text {
      display: block;
      padding-left: 2em;
      font-size: 1.125em;
      line-height: 1.33333em;
      text-align: center;
      text-transform: uppercase;
      color: #fff;
      transition: all 0.3s ease-in-out;
    }

    /* gaps cut into the border */
    .top-key,
    .bottom-key-1,
    .bottom-key-2 {
      position: absolute;
      height: 2px;
      background: ${(p) => p.$bg};
      transition: width 0.5s ease-out, left 0.3s ease-out, right 0.3s ease-out;
    }

    .top-key {
      top: -2px;
      left: 0.625rem;
      width: 1.5625rem;
    }

    .bottom-key-1 {
      bottom: -2px;
      right: 1.875rem;
      width: 1.5625rem;
    }

    .bottom-key-2 {
      bottom: -2px;
      right: 0.625rem;
      width: 0.625rem;
    }

    &:active {
      ${pressed}
      transform: scale(0.97);
    }

    @media (hover: hover) {
      &:hover {
        ${pressed}
      }
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 4px;
    }
  }
`;

export default Button;