import { Badge, Box, Button, IconButton, Stack } from "@mui/material";
import "./Home.css";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduts, selectedProdutsID } = useSelector(
    (state) => state.carttt
  );

  const productQuantity = (itemApi) => {
    const myproduct = selectedProduts.find((item) => {
      return item.id === itemApi.id;
    });
    return myproduct.quantity;
  };

  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
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
              sx={{ maxWidth: 280, mb: 6, mx: 2 }}
            >
              <CardMedia
                component="img"
                height="276"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`/products/${item.id}`)
                }}
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
                {selectedProdutsID.includes(item.id) ? (
                  <div
                    dir="rtl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      color="primary"
                      sx={{ ml: "10px" }}
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>

                    <StyledBadge
                      badgeContent={productQuantity(item)}
                      color="primary"
                    />

                    <IconButton
                      color="primary"
                      sx={{ mr: "10px" }}
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                  >
                    Add To Cart
                  </Button>
                )}

                <Typography variant="body1" color={theme.palette.error.main}>
                  ${item.price}
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
