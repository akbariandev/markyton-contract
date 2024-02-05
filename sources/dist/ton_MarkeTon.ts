import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type CreateOrderRequest = {
    $$type: 'CreateOrderRequest';
    productID: string;
    orderID: string;
}

export function storeCreateOrderRequest(src: CreateOrderRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2744249579, 32);
        b_0.storeStringRefTail(src.productID);
        b_0.storeStringRefTail(src.orderID);
    };
}

export function loadCreateOrderRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2744249579) { throw Error('Invalid prefix'); }
    let _productID = sc_0.loadStringRefTail();
    let _orderID = sc_0.loadStringRefTail();
    return { $$type: 'CreateOrderRequest' as const, productID: _productID, orderID: _orderID };
}

function loadTupleCreateOrderRequest(source: TupleReader) {
    let _productID = source.readString();
    let _orderID = source.readString();
    return { $$type: 'CreateOrderRequest' as const, productID: _productID, orderID: _orderID };
}

function storeTupleCreateOrderRequest(source: CreateOrderRequest) {
    let builder = new TupleBuilder();
    builder.writeString(source.productID);
    builder.writeString(source.orderID);
    return builder.build();
}

function dictValueParserCreateOrderRequest(): DictionaryValue<CreateOrderRequest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateOrderRequest(src)).endCell());
        },
        parse: (src) => {
            return loadCreateOrderRequest(src.loadRef().beginParse());
        }
    }
}

export type CreateOrderResponse = {
    $$type: 'CreateOrderResponse';
    address: Address;
}

export function storeCreateOrderResponse(src: CreateOrderResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1240105896, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadCreateOrderResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1240105896) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'CreateOrderResponse' as const, address: _address };
}

function loadTupleCreateOrderResponse(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'CreateOrderResponse' as const, address: _address };
}

function storeTupleCreateOrderResponse(source: CreateOrderResponse) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserCreateOrderResponse(): DictionaryValue<CreateOrderResponse> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateOrderResponse(src)).endCell());
        },
        parse: (src) => {
            return loadCreateOrderResponse(src.loadRef().beginParse());
        }
    }
}

export type TransferAmount = {
    $$type: 'TransferAmount';
    receiverAddress: Address;
    amount: bigint;
}

export function storeTransferAmount(src: TransferAmount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3679069739, 32);
        b_0.storeAddress(src.receiverAddress);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadTransferAmount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3679069739) { throw Error('Invalid prefix'); }
    let _receiverAddress = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'TransferAmount' as const, receiverAddress: _receiverAddress, amount: _amount };
}

function loadTupleTransferAmount(source: TupleReader) {
    let _receiverAddress = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'TransferAmount' as const, receiverAddress: _receiverAddress, amount: _amount };
}

function storeTupleTransferAmount(source: TransferAmount) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiverAddress);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTransferAmount(): DictionaryValue<TransferAmount> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferAmount(src)).endCell());
        },
        parse: (src) => {
            return loadTransferAmount(src.loadRef().beginParse());
        }
    }
}

 type MarkeTon_init_args = {
    $$type: 'MarkeTon_init_args';
}

function initMarkeTon_init_args(src: MarkeTon_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MarkeTon_init() {
    const __code = Cell.fromBase64('te6ccgECFwEABA0AART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UEQQCAVgJCgLgAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwjhVbi+ZnVuZHMgcmVjZWl2ZWSP4UMH/gIIIQo5Hs67rjAoIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAUGAtow0x8BghCjkezruvLggdQB0AHUAdASbBL4Q1nbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAJtcFqAQgJ/BkVV2zx/EAcBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8BwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAIAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgCwwCAUgVFgIBIA0OALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJACEbN1ds8Wds8MYBEPAg+xsDbPNs8MYBESAYz4Q1nbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEAB2AtD0BDBtAYFtqgGAEPQPb6Hy4IcBgW2qIgKAEPQXyAHI9ADJAcxwAcoAQAPIWM8WyVjMyFjPFskBzMkBNO1E0NQB+GPSADCRbeD4KNcLCoMJuvLgids8EwEO+CdvEHnbPBQAAm0A2iDBASHCTbHy0IbIIsEAmIAtAcsHAqMC3n9wbwAEjhsEeqkMIMAAUjCws5twM6YwFG+MBKQEA5Ew4gTkAbOXAoAub4wCpN6OEAN6qQymMBNvjAOkIsAAEDTmMyKlA5pTEm+BAcsHAqUC5GwhydAAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtY1kzN1ZqdTJ6ZXF1UUdkWkFIZHBQRXczTWdXRVFOTHZ3UzJ6cEgyZzU0YTKCA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMarkeTon_init_args({ $$type: 'MarkeTon_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MarkeTon_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const MarkeTon_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateOrderRequest","header":2744249579,"fields":[{"name":"productID","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderID","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CreateOrderResponse","header":1240105896,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TransferAmount","header":3679069739,"fields":[{"name":"receiverAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const MarkeTon_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"orderAddress","arguments":[{"name":"productID","type":{"kind":"simple","type":"string","optional":false}},{"name":"orderID","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const MarkeTon_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateOrderRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class MarkeTon implements Contract {
    
    static async init() {
        return await MarkeTon_init();
    }
    
    static async fromInit() {
        const init = await MarkeTon_init();
        const address = contractAddress(0, init);
        return new MarkeTon(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MarkeTon(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MarkeTon_types,
        getters: MarkeTon_getters,
        receivers: MarkeTon_receivers,
        errors: MarkeTon_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | CreateOrderRequest | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateOrderRequest') {
            body = beginCell().store(storeCreateOrderRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getOrderAddress(provider: ContractProvider, productID: string, orderID: string) {
        let builder = new TupleBuilder();
        builder.writeString(productID);
        builder.writeString(orderID);
        let source = (await provider.get('orderAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}