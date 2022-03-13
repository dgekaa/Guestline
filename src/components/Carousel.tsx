import React, { useState } from "react";
import styled from "styled-components";

interface ImageProps {
  bg: string;
}

interface InnerProps {
  count: number;
  left: number;
}

const Outer = styled.div`
    overflow: hidden;
    position: relative;
  `,
  Inner = styled.div<InnerProps>`
    display: flex;
    height: 100px;
    width: ${({ count }) => `${count * 120}px`};
    flex-direction: row;
    transition: 0.2s ease transform;
    transform: ${({ left }) => `translateX(${left}px);`};
  `,
  Img = styled.div<ImageProps>`
    width: 120px;
    height: 100px;
    background: ${({ bg }) => `url(${bg})`} no-repeat;
    background-position: center;
    background-size: cover;
  `,
  Left = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease background;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `,
  Right = styled(Left)`
    left: auto;
    right: 0;
  `,
  ArrowL = styled.div`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  `,
  ArrowR = styled(ArrowL)`
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  `;

type Props = {
  images: any[];
};

const Carousel = ({ images }: Props) => {
  const [left, setLeft] = useState<number>(0);

  const toLeft = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setLeft((prev) => (prev !== 0 ? prev + 120 : prev));
    },
    toRight = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setLeft((prev) => {
        return (images.length - 1) * -120 !== prev ? prev - 120 : prev;
      });
    };

  return (
    <Outer>
      <Inner count={images.length} left={left}>
        {images.map((img) => (
          <Img bg={img.url} key={img.url} />
        ))}
      </Inner>

      {images.length > 1 && (
        <>
          <Left onClick={toLeft}>
            <ArrowL />
          </Left>
          <Right onClick={toRight}>
            <ArrowR />
          </Right>
        </>
      )}
    </Outer>
  );
};

export default Carousel;
