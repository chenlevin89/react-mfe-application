import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import './Mfe.css'
import {observable, ButtonComponent} from '@chenlevin89/awesome-lib'

export default function Mfe() {

    let {path, url} = useRouteMatch();

    const [showAlert, setShowAlert] = useState(false);
    const [withdrawInput, setWithdrawInput] = useState(0);
    const [depositInput, setDepositInput] = useState(0);

    const increaseClicked = (value) => {
        observable.notify({eventName: 'update_balance', value: Number(value)});
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    }

    return (
        <div>
            {showAlert && <div className="alert-info">Operation complete successfully.</div>}
            <h1>Operations</h1>
            <div className="operations-container">

                <div className="menu-container">
                    <ul>
                        <li>
                            <NavLink exact to={`${url}`} activeClassName="active">Withdraw</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={`${url}/deposit`} activeClassName="active">Deposit</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="content-container">
                    <Switch>
                        <Route exact path={`${path}`}>
                            <div>
                                <h1>Withdraw</h1>
                                <input autoFocus type="number" value={withdrawInput} onInput={e => setWithdrawInput(e.target.value)} />
                                <ButtonComponent text="Apply" click={e => increaseClicked(-1 * withdrawInput)} />
                            </div>
                        </Route>
                        <Route path={`${path}/deposit`}>
                            <div>
                                <h1>Deposit</h1>
                                <input autoFocus type="number" value={depositInput} onInput={e => setDepositInput(e.target.value)} />
                                <ButtonComponent text="Apply" click={e => increaseClicked(depositInput)} />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}