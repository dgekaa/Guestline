import React, { useEffect, useState } from "react";
import { DARK, HOVER, STARS } from "../constants";
import QUERY from "../query";
import styled, { keyframes } from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from "./Loader";
import Header from "./Header";
import Error from "./Error";
import Carousel from "./Carousel";
import { rand } from "../functions";

const show = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

interface TopBlockProps {
  opened: boolean;
}

const HotelListStyles = styled.div`
    max-width: 1000px;
    margin: 0 auto;
  `,
  Hotel = styled.div`
    margin: 10px;
    overflow: hidden;
    &:first-child {
      margin-top: 30px;
    }
  `,
  TopBlock = styled.div<TopBlockProps>`
    display: flex;
    flex: 1;
    border: 2px solid ${DARK};
    padding: 10px;
    transition: 0.2s ease all;
    border-radius: ${({ opened }) => (opened ? "3px 3px 0 0" : "3px")};
    cursor: pointer;
    &:hover {
      border: 2px solid ${HOVER};
      color: ${HOVER};
    }
  `,
  Galery = styled.div`
    width: 120px;
    height: 100px;
    background: rgba(0, 0, 0, 0.1);
  `,
  HotelDesc = styled.div`
    padding: 0 10px;
    display: flex;
    flex: 2;
    flex-direction: column;
  `,
  Name = styled.p`
    font-weight: 500;
    margin-bottom: 5px;
  `,
  HotelStars = styled.div`
    display: flex;
    width: 100px;
    font-size: 20px;
  `,
  Rooms = styled.div`
    border: 2px solid ${DARK};
    border-top: none;
    border-radius: 0 0 3px 3px;
  `,
  Room = styled.div`
    display: flex;
    animation: ${show} 0.2s ease;
    padding: 10px;
    border-bottom: 2px solid ${DARK};
    &:last-child {
      border-bottom: none;
    }
  `,
  RoomLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 125px;
    padding-right: 10px;
  `,
  RoomName = styled(Name)``,
  RoomDesc = styled.div`
    display: flex;
    flex: 1;
    font-weight: 500;
  `,
  NotFound = styled.div`
    padding: 10px;
  `;

const Hotels = () => {
  const [hotels, setHotels] = useState<any[]>([]),
    [filteredHotels, setFilteredHotels] = useState<any[]>([]),
    [rooms, setRooms] = useState<any>({}),
    [load, setLoad] = useState<boolean>(false),
    [err, setErr] = useState<boolean>(false),
    [bg, setBg] = useState<string>(""),
    [adult, setAdult] = useState<number>(0),
    [children, setChildren] = useState<number>(0),
    [star, setStar] = useState<number>(1);

  const fetchHotels = () => {
      setLoad(true);
      QUERY("/hotels?collection-id=OBMNG")
        .then((res) => {
          if (res.error) {
            setErr(true);
          } else {
            setHotels(res);
            setFilteredHotels(res);
          }
          setLoad(false);
        })
        .catch(() => {
          setLoad(false);
          setErr(true);
        });
    },
    hotelClick = (id: string, index: number, opened: boolean) => {
      if (opened) {
        setRooms({});
      } else {
        setLoad(true);
        QUERY(`/roomRates/OBMNG/${id}`)
          .then((res) => {
            if (res.error) {
              setErr(true);
            } else {
              const rooms: any[] = [];

              res.rooms.forEach((room: any) => {
                const { maxAdults, maxChildren } = room.occupancy;
                if (maxAdults >= adult && maxChildren >= children) {
                  rooms.push(room);
                }
              });

              setRooms({ id: index, rooms: rooms });
            }
            setLoad(false);
          })
          .catch(() => {
            setLoad(false);
            setErr(true);
          });
      }
    },
    setStars = (star: number) => {
      setRooms({});
      setStar(star);
      const newHotels: any[] = [];

      hotels.forEach((hotel) => {
        hotel.starRating >= star && newHotels.push(hotel);
      });

      setFilteredHotels(newHotels);
    },
    setAdults = (adult: number) => {
      setRooms({});
      setAdult(adult);
    },
    setChildrens = (children: number) => {
      setRooms({});
      setChildren(children);
    };

  useEffect(() => {
    if (filteredHotels.length)
      setBg(filteredHotels[rand(0, filteredHotels.length - 1)].images[0].url);
  }, [filteredHotels]);

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      {!err && (
        <Header
          bg={bg}
          setStars={setStars}
          setAdults={setAdults}
          setChildrens={setChildrens}
          adult={adult}
          children={children}
          star={star}
        />
      )}

      <HotelListStyles>
        {filteredHotels.map(
          ({ id, images, name, address1, address2, starRating }, index) => (
            <Hotel key={name}>
              <TopBlock
                onClick={() => hotelClick(id, index, rooms.id === index)}
                opened={rooms.id === index}
              >
                <Galery onClick={(e) => e.stopPropagation()}>
                  {images.length && <Carousel images={images} />}
                </Galery>
                <HotelDesc>
                  <Name>{name}</Name>
                  <p>{address1}</p>
                  <p>{address2}</p>
                </HotelDesc>

                <HotelStars>
                  {STARS.map((el, i) =>
                    i < starRating ? (
                      <AiFillStar key={i} />
                    ) : (
                      <AiOutlineStar key={i} />
                    )
                  )}
                </HotelStars>
              </TopBlock>

              {!!rooms.rooms && rooms.id === index && (
                <Rooms>
                  {rooms.rooms.length ? (
                    rooms.rooms.map(
                      ({
                        name,
                        longDescription,
                        occupancy: { maxAdults, maxChildren },
                      }: any) => (
                        <Room key={name}>
                          <RoomLeft>
                            <RoomName>{name}</RoomName>
                            <p>Adults: {maxAdults}</p>
                            <p>Children: {maxChildren}</p>
                          </RoomLeft>
                          <RoomDesc>
                            <p>{longDescription}</p>
                          </RoomDesc>
                        </Room>
                      )
                    )
                  ) : (
                    <NotFound>No rooms found for your request =(</NotFound>
                  )}
                </Rooms>
              )}
            </Hotel>
          )
        )}

        {load && <Loader />}
        {err && <Error />}
      </HotelListStyles>
    </div>
  );
};

export default Hotels;
