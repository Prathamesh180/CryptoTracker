import React from 'react'
import { Typography } from '@mui/material';
import BannerCorousel from './Corousel';
import styled from '@emotion/styled';

const Banner = styled('div')({
  backgroundImage: "url(./banner2.jpg)",
});

const BannerContent = styled('div')({
  height:400,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 25,
  justifyContent: 'space-around',
});

const BannerTagline = styled('div')({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',

});


export default function MyBanner (){
  return(
    <Banner>
    <BannerContent>
      <BannerTagline>
        <Typography
          variant="h2"
          style={{
            fontWeight: 'bold',
            marginBottom: 15,
            fontFamily: 'Montserrat',
          }}
        >
          Crypto Tracker
        </Typography>
        <Typography
          variant='subtitle2'
          style={{
            color: 'darkgray',
            textTransform: 'capitalize',
            fontFamily: 'Montserrat',
          }}
        >
          Get all the info regarding your favorite Crypto Currency
        </Typography>
      </BannerTagline>
    </BannerContent>
    <BannerCorousel>Corousel</BannerCorousel>
  </Banner>
  )
}
