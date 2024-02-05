import "@stdlib/deploy";

// Order Types
message CreateOrderRequest {
  productID: String;
  orderID: String;
}

message CreateOrderResponse {
  address: Address;
}

contract MarkeTon with Deployable {

  init() {}

  receive() {
    dump("funds received");
  }

  receive(msg: CreateOrderRequest) {
    let init: StateInit = initOf OrderContract(msg.productID, msg.orderID);
    let address: Address = contractAddress(init);
    send(SendParameters{
        to: address,
        body: null,
        value: 0,
        mode: SendIgnoreErrors + SendRemainingValue,
        code: init.code,
        data: init.data
    });
  }

  /*receive(msg: TransferOrderBalance) {
    let init: StateInit = initOf OrderContract(msg.productID, msg.orderID);
    let address: Address = contractAddress(init);
    send(SendParameters{
        to: address,
        body: TransferBalance{receiverAddress: msg.receiverAddress, platformWithdrawAddress: msg.receiverAddress, amount: msg.amount}.toCell(),
        value: 0,
        mode: SendIgnoreErrors + SendRemainingValue
    });
  }*/

  get fun balance(): String {
    return myBalance().toCoinsString();
  }

  get fun orderAddress(productID: String, orderID: String): Address {
    return contractAddress(initOf OrderContract(productID, orderID));
  }
}

//////////////////////////////////////////////////////////////////////

message TransferAmount{
  receiverAddress: Address;
  amount: Int;
}

contract OrderContract with Deployable{

    productID: String;
    orderID: String;

    init(productID: String, orderID: String) {
      self.productID = productID;
      self.orderID = orderID;
    }

    receive() {
      dump("funds received");
    }
    
    get fun balance(): String {
      return myBalance().toCoinsString();
    }

    receive(msg: TransferAmount){    
      /*send(SendParameters{
          to: address("0QABoQBBAmJp60YGVPlSzV9x4td_fY-EpGVDaSxx-TnTvMNz"),
          value: 0,
          bounce: true,
          mode: SendRemainingBalance
      });
      self.reply(msg.amount.toCoinsString().asComment());*/

      /*send(SendParameters{
        to: msg.platformWithdrawAddress,
        value: myBalance() - msg.amount,
        bounce: true,
        mode: SendRemainingValue + SendIgnoreErrors
      });*/

      send(SendParameters {
        to: msg.receiverAddress,
        value: msg.amount,
        bounce: true,
        mode: SendRemainingValue + SendIgnoreErrors
      }); 

      self.reply("success".asComment());
    }
}