import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NAV_ITEMS, PROJECT_NAME } from "../../constants/headerConstants";

const Header = () => {
  return (
    <Box sx={{ display: "flex", height: "100px" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {PROJECT_NAME}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {NAV_ITEMS.map((item) => (
              <Button key={item} size="large" sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
