import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SearchBar from "material-ui-search-bar";
import "./App.css";
import "./App.scss";


export default function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({ data: [] });
  const [searchTerm,setSearchTerm] =useState('')

 
  useEffect(() => {
    fetch("https://api.twitch.tv/helix/games/top", {
      headers: {
        Authorization: "Bearer bj2a0xrrcwvseied3tlmkflrtxqjot",
        "Client-Id": "2wrl84v2rg1ve7kraqb9j0m672wmmz",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    
    return (
      <>
      <SearchBar
       onChange={(event)=>{
        setSearchTerm(event);
      }}
       onRequestSearch={() => console.log('onRequestSearch')}
       style={{
         margin: '0 auto',
         maxWidth: 800
       }}
       className="Search"
     />
        <ul className='ContenedorList'>
          {items.data.filter((item)=>{
            console.log(item.name)
            if(searchTerm==""){
              return item
              console.log(item)
            }
            if(item.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return item
              console.log(item)
            }
          }).map((item,key) => (
            <Card className="CardJuego" sx={{ display: "flex" , flexDirection:  'column' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={item.box_art_url.split("-{")[0] + ".jpg"}
                alt="Live from space album cover"
                className="Imagen"
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardContent sx={{ flex: "1 0 auto" }} className="ContenedorData">
                  <Typography component="div" variant="h5" className="title">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    className="id"
                  >
                    {item.id}
                  </Typography>
                </CardContent>
              </Box>
              
            </Card>
          ))}
        </ul>
      </>
    );
  }
}
