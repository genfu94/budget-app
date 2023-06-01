import { Route, Routes } from "react-router-dom";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import WebFont from "webfontloader";

import {Dashboard, Transactions, Accounts} from "./pages";
import budget_logo from "./budget.png";
import { keycloak } from "./keycloak.js";
import urlJoin from "url-join";
import { GET_request } from "./utils/network.js";
import { theme } from "./theme";
import { ThemeProvider } from "@emotion/react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      accounts: []
    };
    this.initKeycloak();

    this.handleLoadingComplete = () => this.setState({ loading: false });
  }

  initKeycloak() {
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((authenticated) => {
        keycloak.loadUserProfile().then((value) => {
          localStorage.setItem("userInfo", JSON.stringify(value));
          const endpoint = urlJoin(
            process.env.REACT_APP_BACKEND_ENDPOINT,
            "synchronize_account"
          );
          GET_request(endpoint, { username: value["username"] }).then(
            (data) => {
              this.setState({accounts: data});
              this.handleLoadingComplete();
            }
          );
        });
      })
      .catch(function () {
        console.log("Not authenticated");
      });
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Montserrat:300,400,500,600,700,800,900", "Kalam:400"],
      },
    });
  }

  renderLoadingPage() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="nav-bar-logo nav-bar-link" src={budget_logo} />
          <div style={{ fontFamily: "Montserrat" }}>Budget App</div>
        </div>
        <ClipLoader size="2rem" />
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingPage();
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/" element={<Dashboard accounts={this.state.accounts}/>}></Route>
            <Route
              exact
              path="/transactions"
              element={<Transactions accounts={this.state.accounts}/>}
            ></Route>
            <Route exact path="/accounts" element={<Accounts accounts={this.state.accounts} />}></Route>
          </Routes>
        </ThemeProvider>
      );
    }
  }
}

export default App;
