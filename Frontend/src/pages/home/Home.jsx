import { Box, Button, Stack } from "@mui/material";
import "./Home.css";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import { useGetproductsByNameQuery } from '../../Redux/productsApi'
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";


const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery()
  const dispatch = useDispatch()

      if (isLoading) {
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      }


    if (data) {
      return (
        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {data.map((item) => {
            return (
              <Card
              className="card"
              key={item.id}
               sx={{ maxWidth: 280, mb: 6, mx: 2 }}>
                <CardMedia
                  component="img"
                  height="276"
                  image={item.imageLink}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between" }}
                  disableSpacing
                >
                  <Button
                    sx={{ textTransform: "capitalize" , p:1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(item))
                    }}
                  >
                    Add To Cart
                  </Button>
    
                  <Typography variant="body1" color={theme.palette.error.main}>
                    {item.price}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      );
    }
};

export default Home;
