import React, {useState} from 'react';
import {Switch,Route,NavLink,useRouteMatch} from "react-router-dom";
import {observable, ButtonComponent} from '@chenlevin89/awesome-lib'

import './Operations.css'


export default function Operations() {

    let {path, url} = useRouteMatch();

    const [showAlert, setShowAlert] = useState(false);
    const [withdrawInput, setWithdrawInput] = useState(1000);
    const [depositInput, setDepositInput] = useState(500);

    const increaseClicked = (value) => {
        observable.notify({eventName: 'update_balance', value: Number(value)});
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    }

    return (
        <div>
            {showAlert && <div className="alert-info">Operation complete successfully !!</div>}
            <h1>
                <span>Operations</span>
                <span className="version">V{React.version}</span>
            </h1>
            
            <div className="operations-container">

                <div className="menu-container">
                    <ul>
                        <li>
                            <NavLink exact to={`${url}`} activeClassName="active">Withdraw</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={`${ url !== '/' ? url : ''}/deposit`} activeClassName="active">Deposit</NavLink>
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
                        <Route path={`${ path !== '/' ? path : ''}/deposit`}>
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