import { useEffect, useState } from 'react';
import { CreateOrderRequest, MarkeTon } from '../contract/ton_MarkeTon';
//import { OrderContract, TransferAmount } from '../contract/ton_OrderContract';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, address, toNano } from '@ton/core';

export function useMarkeTonContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | string>();
    const { sender } = useTonConnect();
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
    const ContractAddress = "EQCJaGVydil_H4IN6aaS5SPGHQZd02mwfNmQsZR7IuTjfOuh"; //"EQAH20VpId6rxKCpAO9wZ0zLwpTF6D7SNWPrgup7v640eIjh";

    const marketonContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract =  MarkeTon.fromAddress(Address.parse(ContractAddress));
        return client.open(contract) as OpenedContract<MarkeTon>;
    }, [client]);

    useEffect(() => {
        async function getBalance() {
            if (!marketonContract) return;
            setVal(null);
            const val = await marketonContract.getBalance();
            setVal(val);
            await sleep(5000);
            getBalance();
        }
        getBalance();
    }, [marketonContract]);

    const assetID = "65ac08d0c296200eea9c4d32";
    const orderID = "65c11a6b171661a7b19bb236";

    return {
                
        value: val,
        address: marketonContract?.address.toString(),
        increaseBalance:() => {
            const args = { value: BigInt(1000000000), bounce: true };
            return marketonContract?.send(sender, args, null);
        },

        createOrder: () => {
            const args = { value: BigInt(1000000000), bounce: true };
            const order: CreateOrderRequest = {
                $$type: 'CreateOrderRequest',
                orderID: orderID,
                productID: assetID
            };
            
            return marketonContract?.send(sender, args, order);
        },

        /*withdraw: () => {
            const args = { value: BigInt(100000000), bounce: true };
            const transaction: TransferAmount = {
                $$type: 'TransferAmount',
                receiverAddress: Address.parse('0QABoQBBAmJp60YGVPlSzV9x4td_fY-EpGVDaSxx-TnTvMNz'),
                amount: BigInt(300000000)
            };
            return marketonContract?.send(sender, args, transaction);
        },*/
        
        /*test: async() => {

            const system = await ContractSystem.create();
            let treasure = await system.treasure('name of treasure');
            let contract = system.open(MarkeTon.fromAddress(treasure.address));
            
            // This object would track all transactions in this contract
            let tracker = system.track(contract.address);
            
            // This object would track all logs
            let logger = system.log(contract.address);
            
            //
            // Sending a message
            //
            
            // First we enqueue a messages. NOTE: You can enqueue multiple messages in row
            await contract.send(treasure, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
            await contract.send(treasure, { value: toNano(50) }, { $$type: "CreateOrderRequest", orderID: orderID, productID: assetID});
            await contract.send(treasure, { value: toNano(1) }, { $$type: "TransferOrderBalance", orderID: orderID, productID: assetID, receiverAddress: address("0QABoQBBAmJp60YGVPlSzV9x4td_fY-EpGVDaSxx-TnTvMNz"), amount: BigInt(100000000)});

            // Run system until there are no more messages
            await system.run();

            
            console.log(tracker.collect());
        }
        
        withdraw: () => {
            const args = { value: BigInt(10000000), bounce: true };
            const w: Withdraw = {
                $$type: 'Withdraw',
                amount: BigInt(30000000),
                recieverAddress: Address.parse('0QABoQBBAmJp60YGVPlSzV9x4td_fY-EpGVDaSxx-TnTvMNz')
            };
            return depositContract?.send(sender, args, w);
        },
        update: () => {
            return depositContract?.getUpdate()         
        },
        clean: () => {
            //const args = { value: BigInt(6000000), bounce: true };
            //return depositContract?.send(sender, args, "clean")   
            return depositContract?.sendExternal("testext"); 
        },
        fill: () => {
            const args = { value: BigInt(10000000), bounce: true };
            return depositContract?.send(sender, args, "fill")         
        },
        query: async() => {
            let orders = marketonContract?.getQuery();  
            if(orders){
                const ordersData = await orders;
                Object.entries(ordersData).forEach(([key, order]) => {
                    if (key == "_map") {
                        for (const [key, value] of order) {
                            console.log(`Key: ${key}`);
                            console.log(`$$type: ${value.$$type}`);
                            console.log(`ID: ${value.ID}`);
                        }  
                    }         
                });
            }        
        },*/
        /*
        <div className='Card'>
            <b>Contract Balance</b>
            <div>{value ?? 'Loading...'}</div>
        </div>
        <a
            className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {withdraw()}}>
            Withdraw
        </a>
        <br/>
        <br/>
        <a
            className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {fill()}}>
            Fill
        </a>
        <a
            className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {update()}}>
            Update
        </a>
        <a
            className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {clean()}}>
            Clean
        </a>

        */
    };
}
