import React from "react"
import Bonus from "./components/Bonus"
import BonusForm from "./components/BonusForm"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
    return (
        <Router>
            <div className="BonusApp">
                <Switch>
                    <Route exact path="/">
                        <div className="card">
                            <div className="card-body">
                                <BonusForm />
                            </div>
                        </div>
                    </Route>
                    <Route path="/daftarbonus">
                        <div className="container-fluid">
                            <Bonus />
                        </div>
                    </Route>
                </Switch>
            </div>
            <footer className="bg-light text-center fixed-bottom">
                <div className="container p-4">Sponsored by <a href="https://ovo805.com" target="_new">Ovobos</a></div>
            </footer>
        </Router>
    );
}

export default App;
