import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';

import { Contract } from './near-interface';
import { CONTRACT_ADDRESS } from './constants';

import { MainPage } from './Pages/MainPage';

export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  const contract = new Contract({ contractId: CONTRACT_ADDRESS, walletToUse: wallet });

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

    contract.donate(1);

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
      <MainPage isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />
    </div>
  );
}