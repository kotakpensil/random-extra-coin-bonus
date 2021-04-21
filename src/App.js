import React from "react"
import Bonus from "./components/Bonus"
import BonusForm from "./components/BonusForm"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify"
import { Container, Jumbotron } from "react-bootstrap"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="BonusApp">
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Jumbotron>
              <BonusForm />
            </Jumbotron>
          </Route>
          <Route path="/daftarbonus">
            <Container>
              <Bonus />
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
