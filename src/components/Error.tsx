import React from "react";
import styled from "styled-components";
import { DARK } from "../constants";

const Wrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  Text = styled.picture`
    color: ${DARK};
    font-size: 30px;
  `;

const Error = () => {
  return (
    <Wrap>
      <Text>Something went wrong =(</Text>
    </Wrap>
  );
};

export default Error;
