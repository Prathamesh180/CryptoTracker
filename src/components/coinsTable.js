import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import {CryptoState} from '../CryptoContext'
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Corousel';
// import styled from '@emotion/styled';

const CoinsTable = () => {
    const [Coins, setCoins] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [search, setsearch] = useState('');
    const navigate = useNavigate();
    const { currency, symbol } = CryptoState();
    const [Page, setPage] = useState(1);

    console.log(Coins);
    useEffect(() => {

      const fetchCoins = async () =>{
          setLoading(true);
          const { data } = await axios.get(CoinList(currency));
  
          setCoins(data);
          setLoading(false);
      }
  
      fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
      palette:{
        primary:{
          main: "#fff",
        },
        mode:"dark",
      }
    });

    const handleSearch = () => {
      return Coins.filter(
        (coin) => 
        coin.name.toLowerCase().includes(search) || coin.name.toLowerCase().includes(search)
      );
    };

    // const styledPagination = styled(Pagination)({
    //   "& .MuiPaginationItem-root":{
    //     color: "gold",
    //   }});

    // const useStyles =  makeStyles(() => ({

    // }))

    // const classes = useStyles();

      return (
        <ThemeProvider theme={darkTheme}>
          <Container style={{textAlign: 'center'}}>
            <Typography
            variant='h4'
            style={{margin:18, fontFamily:'Monteserrat'}}>
              Cryptocurrency Prices by Market Cap.
            </Typography>

            <TextField label="Search For a Crypto Currency.." 
            variant='outlined' style={{marginBottom: 20, width: "100%"}} 
            onChange={(e) => setsearch(e.target.value)}/>
            <TableContainer>
                {
                  Loading ? (
                    <LinearProgress style={{backgroundColor: "gold"}}/> 
                  ):(
                    <Table>
                      <TableHead style={{backgroundColor: "#EEBC1D"}}>
                        <TableRow>
                          {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                            <TableCell style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}  //added center in "" after Coin? for temprary
                            >
                              {head}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>{ handleSearch().slice((Page-1)*10, (Page-1)*10 + 10).map((row) => {
                        const profit = row.price_change_percentage_24h > 0;

                        return(
                          <TableRow
                          onClick = {()=> navigate(`/coins/${row.id}`)}
                          // className={classes.row}
                          key = {row.name}
                          >
                            <TableCell 
                            component='th' scope='row'    
                            style={{display: 'flex', gap: 15,}}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{marginBottom:10}}
                                />
                                <div
                                style={{display: "flex", flexDirection: "column"}}
                                >
                                  <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                  >
                                    {row.symbol}
                                  </span>
                                  <span style={{color: "darkgrey"}}>{row.name}</span>
                                </div>
                            </TableCell>
                            <TableCell
                            align='right'>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight : 500,
                            }}
                            >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>
                            <TableCell align='right'>
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                              {/* adding million to compensate removed 6 zeroes. */}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      </TableBody>z
                    </Table>
                  )
                }
            </TableContainer>
            <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
            />
          </Container>
        </ThemeProvider>
      )
  };

export default CoinsTable