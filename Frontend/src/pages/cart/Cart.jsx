import "./Cart.css";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity} from "../../Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));
const Cart = () => {
  // @ts-ignore
  const { selectedProduts } = useSelector((state) => state.carttt);
  const dispatch = useDispatch()
  let totalPrice = 0
  return (
    <Box>
      {selectedProduts.map((item) => {
        
        totalPrice += item.price * item.quantity
        return (
          <Paper key={item.id} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img src={item.imageLink[0]} alt="" />
              <p className="product-name">{item.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  dispatch(increaseQuantity(item))
                }}
              >
                <Add />
              </IconButton>

              <StyledBadge badgeContent={item.quantity} color="secondary" />

              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(item))
                }}
                
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">${item.price * item.quantity}</div>

            <Button
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="text"
              color="error"
              onClick={() => {
                dispatch(deleteProduct(item))
              }}
            >
              delete
            </Button>

            <IconButton 
              sx={{
                color: "#ef5350",
                display: { xs: "inline-flex", md: "none" },
              }}
              onClick={() => {
                dispatch(deleteProduct(item))
              }}
            >
              <Delete />
            </IconButton>
          </Paper>
        );
      })}

      <Paper sx={{ width: "200px", mx: "auto" }}>
        <Typography align="center" variant="h6" p={2}>
          Cart Summary
        </Typography>
        <Divider />

        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", p: 1.2 }}
        >
          <Typography variant="body1">Suntotal</Typography>
          <Typography variant="body1">${totalPrice}</Typography>
        </Stack>
        <Divider />
        <Button fullWidth color="primary" variant="contained">
          checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
