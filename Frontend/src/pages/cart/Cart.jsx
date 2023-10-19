import "./Cart.css";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  styled,
  IconButton,
  Badge, Typography, Divider, Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));
const Cart = () => {
  return (
    <Box>
      <Paper dir="rtl" className="item-container">
        <div className="img-title-parent">
          <img src="####" alt="" />
          <p className="product-name">T-shirt</p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "#1976d2", ml: "10px" }} onClick={() => {}}>
            <Add />
          </IconButton>

          <StyledBadge badgeContent={1} color="secondary" />

          <IconButton sx={{ color: "#1976d2", mr: "10px" }} onClick={() => {}}>
            <Remove />
          </IconButton>
        </div>

        <div className="price">$100</div>

        <Button sx={{display : {xs : "none" , md:"inline-flex"}}} variant="text" color="error">
          delete
        </Button>

        <IconButton sx={{color:"#ef5350" , display : {xs : "inline-flex" , md:"none"}}} onClick={() => {
        }}>
          <Delete/>
          
        </IconButton>
      </Paper> 

      <Paper sx={{width: "200px" , mx:"auto"}}>
        <Typography align="center" variant="h6" p={2}>
          Cart Summary
        </Typography>
        <Divider/>

        <Stack direction={"row"} sx={{justifyContent:"space-between", p:1.2}}>
            <Typography variant="body1">Suntotal</Typography>
            <Typography variant="body1">$100</Typography>
        </Stack>
        <Divider/>
        <Button fullWidth color="primary" variant="contained">
            checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
