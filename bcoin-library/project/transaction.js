const fs = require("fs");
const assert = require("assert");
const bcoin = require("bcoin");
const Coin = bcoin.Coin;

const KeyRing = bcoin.wallet.WalletKey;
const Script = bcoin.Script;
const network = "regtest";
const compressed = true;

const MTX = bcoin.MTX;
const Amount = bcoin.Amount;


async function multiSign(){

    console.log("Multisig creation");

    const secret1 = fs.readFileSync("./key1.wif").toString();
    const secret2 = fs.readFileSync("./key2.wif").toString();

    key1 = KeyRing.fromSecret(secret1, network);
    key2 = KeyRing.fromSecret(secret2, network);
    const key3 = KeyRing.generate(compressed, network);
    const receiverAddress = key3.getAddress().toBase58();

    console.log("\nReceiver address: ");
    console.log(receiverAddress);

    const m = 2;
    const n = 2;
    const pubkeys = [key1.publicKey, key2.publicKey];

    console.log("\nPublic keys: ");
    console.log(pubkeys);
    
    const redeemScript = Script.fromMultisig(m, n, pubkeys);
    console.log("\nRedeem script: " + redeemScript);
    const multisigAddress = redeemScript.getAddress().toBase58(network);
    console.log("\n Multisig address: " + multisigAddress);

    const scripthash = redeemScript.hash160();
    console.log("\nRedeem script hash: ");
    console.log(scripthash);

    const outputScript = Script.fromScripthash(scripthash);
    console.log("\noutput script: " + outputScript);
    

    // Fund the multisig address
    const cb = new MTX();
    cb.addInput({
        prevout: new bcoin.Outpoint(),
        script: new bcoin.Script()
    });
    cb.addOutput({
        address: multisigAddress,
        value: 50000
    });

    console.log("\nFund the multisig address with this transaction: ");
    console.log(cb);


    // Spend from the multisig address
    const spendTrx = new MTX();

    const coins = [];
    const coin = Coin.fromTX(cb, 0, -1);
    coins.push(coin);

    spendTrx.addOutput({
        address: receiverAddress,
        value: 10000
    });

    await spendTrx.fund(coins, {
        rate: 10000,
        changeAddress: multisigAddress
    });


    key1.script = redeemScript;
    key2.script = redeemScript;

    spendTrx.scriptInput(0, coin, key1);
    spendTrx.sign(key1);
    spendTrx.sign(key2);

    console.log("\nSpend from the multisigaddress with this transaction: ");
    console.log(spendTrx);
    console.log(spendTrx.verify());

}



multiSign().catch( (err)=>{
    console.log(err.stack);
    process.exit(1);
})