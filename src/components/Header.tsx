import React from "react";
import styled from "styled-components";
import { DARK, STARS } from "../constants";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface WrapProps {
  bg: string;
}

const Wrap = styled.div<WrapProps>`
    height: 200px;
    position: relative;
    background: ${({ bg }) => `url(${bg})`} no-repeat;
    background-size: 100%;
    background-position: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
  Filter = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -18px;
    width: 400px;
    height: 36px;
    background: #fff;
    left: calc(50% - 200px);
    border-radius: 3px;
    border: 2px solid ${DARK};
  `,
  Stars = styled.div`
    display: flex;
    flex: 1.1;
    font-size: 25px;
    justify-content: center;
  `,
  NotStars = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
  `,
  BlackStar = styled(AiFillStar)`
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  `,
  WhiteStar = styled(AiOutlineStar)`
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  `,
  PlusMinus = styled.div`
    cursor: pointer;
    padding: 0 3px;
  `;

type Props = {
  bg: string;
  setStars: (a: number) => void;
  setAdults: (a: number) => void;
  setChildrens: (a: number) => void;
  adult: number;
  children: number;
  star: number;
};

const Header = ({
  bg,
  setStars,
  setAdults,
  setChildrens,
  adult,
  children,
  star,
}: Props) => {
  const setStar = (i: number) => {
      if (star !== i + 1) setStars(i + 1);
    },
    adultClick = (plus: boolean) => {
      if (plus) {
        adult < 9 && setAdults(adult + 1);
      } else {
        adult !== 0 && setAdults(adult - 1);
      }
    },
    childrenClick = (plus: boolean) => {
      if (plus) {
        children < 9 && setChildrens(children + 1);
      } else {
        children !== 0 && setChildrens(children - 1);
      }
    };

  return (
    <Wrap bg={bg}>
      <Filter>
        <Stars>
          {STARS.map((el, i) =>
            i + 1 <= star ? (
              <BlackStar key={i} onClick={() => setStar(i)} />
            ) : (
              <WhiteStar key={i} onClick={() => setStar(i)} />
            )
          )}
        </Stars>

        <NotStars>
          Adults:
          <PlusMinus onClick={() => adultClick(true)}>+ </PlusMinus>
          {adult}
          <PlusMinus onClick={() => adultClick(false)}> -</PlusMinus>
        </NotStars>
        <NotStars>
          Children:
          <PlusMinus onClick={() => childrenClick(true)}>+ </PlusMinus>
          {children}
          <PlusMinus onClick={() => childrenClick(false)}> -</PlusMinus>
        </NotStars>
      </Filter>
    </Wrap>
  );
};

export default Header;
