import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useMarkeTonContract } from './hooks/useMarkeTonContract';
import '@twa-dev/sdk';

function App() {
    const { connected } = useTonConnect();
    const {address, increaseBalance, value, createOrder} = useMarkeTonContract();

    return (
        <div className='App'>
            <div className='Container'>
                <TonConnectButton />

                <div className='Card'>
                    <b>Counter Address</b>
                    <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
                </div>

                <div className='Card'>
                    <b>Contract Balance</b>
                    <div>{value ?? 'Loading...'}</div>
                </div>
                
                <a
                    className={`Button ${connected ? 'Active' : 'Disabled'}`}
                    onClick={() => {increaseBalance()}}>
                    + Parent Balance
                </a>  

                 <a
                    className={`Button ${connected ? 'Active' : 'Disabled'}`}
                    onClick={() => {createOrder()}}>
                    Create Order
                </a>                   
                <br/>
            </div>
        </div>
    );
}

export default App
