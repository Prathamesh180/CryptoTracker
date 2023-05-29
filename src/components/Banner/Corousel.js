import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import {CryptoState} from '../../CryptoContext';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Corousel = styled('div')({
  Height: "50%",
  display: "flex",
  alignItems: "center",   
});

const BannerCorousel = () => {

  const [trending, setTrending] = useState([]);

const { currency, symbol } = CryptoState();


useEffect(() => {
  const fetchTrendingCoins = async () =>{
    
    const { data } = await axios.get(TrendingCoins( currency ));
    
    setTrending(data);
  };

  
  fetchTrendingCoins();
}, [currency]);

// console.log(trending);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h>0;

  
// const CarouselLink = styled(Link)({ 
//   display: "flex",
//   flexDirecton: "column",
//   alignItems: "center",
//   cursor: "pointer",
//   textTransform: "uppercase",
//   color: "white",
// });

    return(
      <Link style={{
        display: "flex",
        flexDirecton: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }} to={`coins/${coin.id}`}>
        <img 
          src={coin?.image} 
          alt={coin.name} 
          height="80" 
          style={{marginBottom: 10}}
          />
        <span>
          {coin?.symbol} 
          &nbsp;
          <span 
          style={{
            color: profit > 0 ? "rgb(14, 203, 129" : "red",
            fontWeight: 500,
          }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))};
        </span>
      </Link>
    );
  })

  const responsive = {
    0: {
      items : 2,
    },
    512: {
      items : 4,
    },
  };

  return (
    <Corousel>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      />
    </Corousel>
  )
}

export default BannerCorousel;