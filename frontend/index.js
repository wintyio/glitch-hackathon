// React
import { createRoot } from 'react-dom/client';
import App from './App';

// NEAR
import { Wallet } from './near-wallet';
import { CONTRACT_ADDRESS } from './constants';
import { Provider } from 'react-redux';
import store from './store/store';
import axios from 'axios';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()

  root.render(
    <Provider store={store}>
      <App isSignedIn={isSignedIn} contractId={CONTRACT_ADDRESS} wallet={wallet} />
    </Provider>
  );
}