import { AppBar, Toolbar, Typography } from '@mui/material';

export default function MainNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          UFC Labs
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
