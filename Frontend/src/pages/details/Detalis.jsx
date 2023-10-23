import React, { useRef, useState } from "react";
import "./detalis.css";
import { useGetoneproductsByNameQuery } from "Redux/productsApi";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
} from "@mui/material";
import DetailsThumb from "./DetailsThumb";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Detalis = () => {
  const dispatch = useDispatch();

  const id = useParams();
  const [index, setindex] = useState(0);
  const { data, error, isLoading } = useGetoneproductsByNameQuery(id.id);
  const myRef = useRef(null);
  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

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
      <div className="app details-page">
        {
          <div className="details">
            <div className="big-img">
              <img src={data.imageLink[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>

              <p>{data.description}</p>

              <DetailsThumb
                images={data.imageLink}
                tab={handleTab}
                myRef={myRef}
              />

              {selectedProdutsID.includes(data.id) ? (
                <div style={{ display: "flex", alignItems: "center" , marginTop:"50px"}}>
                  <IconButton
                    color="primary"
                    sx={{ mr: "10px" }}
                    onClick={() => {
                      dispatch(decreaseQuantity(data));
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <StyledBadge
                    badgeContent={productQuantity(data)}
                    color="primary"
                  />

                  <IconButton
                    color="primary"
                    sx={{ ml: "10px" }}
                    onClick={() => {
                      dispatch(increaseQuantity(data));
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </div>
              ) : (
                <Button
                  sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 , marginTop:"50px"}}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCart(data));
                  }}
                >
                  Add To Cart
                </Button>
              )}
            </div>
          </div>
        }
      </div>
    );
  }
};

export default Detalis;
