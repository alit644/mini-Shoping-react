import { Box, Button, Stack } from "@mui/material";
import "./Home.css";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

let dateFormApi = [{}, {}, {}];

const Home = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{ flexWrap: "wrap", justifyContent: "center" }}
    >
      {dateFormApi.map(() => {
        return (
          <Card sx={{ maxWidth: 280, mb: 6, mx: 2 }}>
            <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect
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
              >
                Add To Cart
              </Button>

              <Typography variant="body1" color={theme.palette.error.main}>
                $126
              </Typography>
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Home;
