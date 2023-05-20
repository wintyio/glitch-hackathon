import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';

import { Contract } from './near-interface';
import { CONTRACT_ADDRESS } from './constants';

import { GamePage } from './Pages/GamePage';
import { RoomPage } from './Pages/RoomPage';
import { MainPage } from './Pages/MainPage';
import { HashRouter, Route, Routes } from 'react-router-dom';

export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const [page, setPage] = useState("main");

  const contract = new Contract({ contractId: CONTRACT_ADDRESS, walletToUse: wallet });

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
  });

  // Get blockchian state once on component load
  /*
  React.useEffect(() => {
    getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }
    , []);
    */

  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { greetingInput } = e.target.elements;

    // use the wallet to send the greeting to the contract
    // wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
    //   .then(async () => { return getGreeting(); })
    //   .then(setValueFromBlockchain)
    //   .finally(() => {
    //     setUiPleaseWait(false);
    //   });
  }

  /*
  function getGreeting() {
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({ method: 'get_greeting', contractId })
  }
  */

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<MainPage isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} contract={contract} />} />
          <Route path='/game' element={<GamePage isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />} />
        </Routes>
        {/* {!isSignedIn && <LoginPage />} */}
        {/* <RoomPage /> */}
        {/* <GamePage isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} /> */}
      </HashRouter>
    </div>
  );
}