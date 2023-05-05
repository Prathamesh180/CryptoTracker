import React from 'react'
import {Toolbar,Container,AppBar,Typography,MenuItem,Select, createTheme, ThemeProvider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { CryptoState } from '../CryptoContext';


const Header = () => {
  const Navigate = useNavigate();

  const{ currency, setCurrency} = CryptoState()
  const darkTheme = createTheme({
    palette:{
      primary:{
        main: "#fff",
      },
      mode:"dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography 
              onClick={()=>Navigate("/")} 
              className='header'
              variant='h6'
              >
              Crypto Tracker
            </Typography>
            
              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                }}
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
                >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header