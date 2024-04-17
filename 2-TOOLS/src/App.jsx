import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Pages from "./Pages.jsx";
import Card from "./Card.jsx";
import Home from "./Home.jsx";
import model from "./model.js";

const primary = "#9b5d30";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff",
    },
    secondary: {
      main: "#000000",
      contrastText: primary,
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.mineBitcoin(1500);
  }
  mineBitcoin(duration) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + duration) {
      // TODO(tony): Make $$$
    }
  }
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/brrto" element={<Pages.Brrto />} />
              <Route path="/pezza" element={<Pages.Pezza />} />
              <Route path="/fesh" element={<Pages.Fesh />} />
              <Route path="/soop" element={<Pages.Soop />} />
            </Routes>
            <Typography variant="body1">
              Built with 🐟 by Tony the 🐈
            </Typography>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
