# Creating transactions with bitcoin-cli


I've installed Bitcoin Core 23.1 with snap under Ubuntu. The executables can be found in folder: 
`/snap/bitcoin-core/current/bin`

This is where I ran all commands from.




- [Creating transactions with bitcoin-cli](#creating-transactions-with-bitcoin-cli)
  - [Wallet init](#wallet-init)
  - [Create a new transaction](#create-a-new-transaction)
  - [Signatures](#signatures)
  - [Sending a transaction](#sending-a-transaction)




## Wallet init

Create a wallet:


```
$ ./bitcoin-cli -regtest createwallet "mywallet"
{
  "name": "mywallet",
  "warning": ""
}
```

How many UTXO do I have?

```
$ ./bitcoin-cli -regtest listunspent
[
]
```

Get a new address:

```
$ ./bitcoin-cli -regtest getnewaddress
bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm
```

Mine some bitcoin to this address:

```
$ ./bitcoin-cli -regtest generatetoaddress 10 bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm
[
  "5e941c1ab5feac21d4a1da214a0ba15534b136037a379d4438b686f3bf47514d",
  "76febc61011c0a4a69170aa201ff50e863f347a44ca7c340a70c9087a8c6767d",
  "5a3e80793e96ddc09fc22b37ed3d5beb8128db25f591a7635682b8fd00b61c13",
  "38c9a555d227ad2866cc2b36a755b89dab6c7fdaf707781ab13a87ee447ef347",
  "0e12506fe288fcf79249301ff1c962b994639c912972028cc06c9b1d40fcf254",
  "1456d065009a76fd598422c6debf49dce03cb574dac8df3de1d6ea2ba89e5638",
  "334bf23d0e1ab47401314c051c0b4b4698a8fc784dd344d8ac9e7041b5bd05b5",
  "401bd4b688b58806bac6bd141b20c6873bba847f83748ead39452b7383447043",
  "2c1f98b0ef55c97d955042177fa49918138902027e7614602b90565df33950ef",
  "3c85259056d43f7c15797a320aa8f89342b48280af76f3117af67eac566929c8"
]

$ ./bitcoin-cli -regtest listunspent
[
]
```

UTXO list is still empty.

Generate 90 more bitcoins:

```
$ ./bitcoin-cli -regtest generatetoaddress 90 bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm

parallels@ubuntu-linux-22-04-desktop:/snap/bitcoin-core/current/bin$ ./bitcoin-cli -regtest listunspent
[
]
```

Still empty.

The UTXO become spendable only after 100 blocks:

```
$ ./bitcoin-cli -regtest generatetoaddress 1 bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm
[
  "47667a8ad991ca523d43f4bb8bb64a794a1ad6b08245e27729ea56a4e23224e0"
]

```

Now we have some spendable UTXO:

```
$ ./bitcoin-cli -regtest listunspent
[
  {
    "txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255",
    "vout": 0,
    "address": "bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm",
    "label": "",
    "scriptPubKey": "0014eac07e7a0e1b7cc9698dcc1d92aa75f8b2ecf092",
    "amount": 50.00000000,
    "confirmations": 101,
    "spendable": true,
    "solvable": true,
    "desc": "wpkh([1de92c56/84'/1'/0'/0/0]036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a)#t8g8qumy",
    "safe": true
  }
]
```

## Create a new transaction


Generate a new address:

```
$ ./bitcoin-cli -regtest getnewaddress
bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw
```

From the following JSON...


```
'
[
    {
        "txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255",
        "vout": 0
    }
]
'


'
{
    "bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw": 49
}
'
```

...removed all the carriage returns 
`'[{"txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255","vout": 0}]' '{"bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw": 49}'`

...and create a raw transaction.

```
./bitcoin-cli -regtest createrawtransaction '[{"txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255","vout": 0}]' '{"bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw": 49}'
020000000155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c00000000
```

Decode the transaction to confirm it worked:

```
$ ./bitcoin-cli -regtest decoderawtransaction 020000000155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c00000000
{
  "txid": "74f8eb90b27b354aee1656385984fdb5d91bcc0b1d421567376d051b5782fc4d",
  "hash": "74f8eb90b27b354aee1656385984fdb5d91bcc0b1d421567376d051b5782fc4d",
  "version": 2,
  "size": 82,
  "vsize": 82,
  "weight": 328,
  "locktime": 0,
  "vin": [
    {
      "txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255",
      "vout": 0,
      "scriptSig": {
        "asm": "",
        "hex": ""
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 49.00000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "0 6e6dcf986680b9a93cf7f9860e5092133261ad7c",
        "desc": "addr(bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw)#ds9h3fh5",
        "hex": "00146e6dcf986680b9a93cf7f9860e5092133261ad7c",
        "address": "bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw",
        "type": "witness_v0_keyhash"
      }
    }
  ]
}
```

## Signatures


Add a signature to the transaction

```
$ ./bitcoin-cli -regtest signrawtransactionwithwallet 020000000155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c00000000
{
  "hex": "0200000000010155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c0247304402202a649fd5fd7c332ae9ca75d0b5b6c9f3bdc63a434cc8c569152a6c9fa10c7d6502204787d2e903d1988d757a42b4bfb9ef8314cfa6d971d9c5b3d97669932ee2d1940121036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a00000000",
  "complete": true
}



$ ./bitcoin-cli -regtest decoderawtransaction 0200000000010155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c0247304402202a649fd5fd7c332ae9ca75d0b5b6c9f3bdc63a434cc8c569152a6c9fa10c7d6502204787d2e903d1988d757a42b4bfb9ef8314cfa6d971d9c5b3d97669932ee2d1940121036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a00000000
{
  "txid": "74f8eb90b27b354aee1656385984fdb5d91bcc0b1d421567376d051b5782fc4d",
  "hash": "ad19e3d0f89f9c37b66ccc0982bf9e9d1c1869aa3b72d14d4f635299a4a417f8",
  "version": 2,
  "size": 191,
  "vsize": 110,
  "weight": 437,
  "locktime": 0,
  "vin": [
    {
      "txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255",
      "vout": 0,
      "scriptSig": {
        "asm": "",
        "hex": ""
      },
      "txinwitness": [
        "304402202a649fd5fd7c332ae9ca75d0b5b6c9f3bdc63a434cc8c569152a6c9fa10c7d6502204787d2e903d1988d757a42b4bfb9ef8314cfa6d971d9c5b3d97669932ee2d19401",
        "036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a"
      ],
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 49.00000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "0 6e6dcf986680b9a93cf7f9860e5092133261ad7c",
        "desc": "addr(bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw)#ds9h3fh5",
        "hex": "00146e6dcf986680b9a93cf7f9860e5092133261ad7c",
        "address": "bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw",
        "type": "witness_v0_keyhash"
      }
    }
  ]
}

```


## Sending a transaction

```
$ ./bitcoin-cli -regtest sendrawtransaction 0200000000010155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0100111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7c0247304402202a649fd5fd7c332ae9ca75d0b5b6c9f3bdc63a434cc8c569152a6c9fa10c7d6502204787d2e903d1988d757a42b4bfb9ef8314cfa6d971d9c5b3d97669932ee2d1940121036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a00000000
error code: -25
error message:
Fee exceeds maximum configured by user (e.g. -maxtxfee, maxfeerate)
```

1 BTC as fee is way too generous

```
$ ./bitcoin-cli -regtest getrawchangeaddress
bcrt1qk6pnfsund3qtsczwr5ghqw75xqvvr3u4sx89mf
```

Create a new transaction that sends 0.9999 to this change address

```
$ ./bitcoin-cli -regtest createrawtransaction '[{"txid": "c8e1ec9aa09e3786993c79af1413a68d32cca7e8d48ad26242a216ad98c9d255","vout": 0}]' '{"bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw": 49, "bcrt1qk6pnfsund3qtsczwr5ghqw75xqvvr3u4sx89mf": 0.9999}'
020000000155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0200111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7cf0b9f50500000000160014b68334c3936c40b8604e1d11703bd43018c1c79500000000
```

Sign the transaction


```
$ ./bitcoin-cli -regtest signrawtransactionwithwallet 020000000155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0200111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7cf0b9f50500000000160014b68334c3936c40b8604e1d11703bd43018c1c79500000000
{
  "hex": "0200000000010155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0200111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7cf0b9f50500000000160014b68334c3936c40b8604e1d11703bd43018c1c7950247304402203b20b61675ba2eed625767793a0b8a02a82ec793a37a19caca93c4674ddcd259022026f567443a7cffcb9656712931cc34717e8a104d450c260fcf41275e28d711d90121036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a00000000",
  "complete": true
}
```

send the transaction

```
$ ./bitcoin-cli -regtest sendrawtransaction 0200000000010155d2c998ad16a24262d28ad4e8a7cc328da61314af793c9986379ea09aece1c80000000000ffffffff0200111024010000001600146e6dcf986680b9a93cf7f9860e5092133261ad7cf0b9f50500000000160014b68334c3936c40b8604e1d11703bd43018c1c7950247304402203b20b61675ba2eed625767793a0b8a02a82ec793a37a19caca93c4674ddcd259022026f567443a7cffcb9656712931cc34717e8a104d450c260fcf41275e28d711d90121036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a00000000
f080646bcf97904b059c3f95cdb16d76bb8bb03e029519a473d3a14a21f78ea6
```


Generate one block to confirm the transaction

```
$ ./bitcoin-cli -regtest -generate 1
{
  "address": "bcrt1q2cjveqtt0f6394acmmcyxzrkayepm2z94jjque",
  "blocks": [
    "2eeab756284facc53b2af319bdbe176fced36dc46abe39b25f8dcc66b6b44fbd"
  ]
}
```


Let's check the UTXO list

```
$ ./bitcoin-cli -regtest listunspent
[
  {
    "txid": "4ec9a50149d52ab6d00a64a1fc1a9f4ddd69c6e337e9a3241c9bb6aa3f114e41",
    "vout": 0,
    "address": "bcrt1qatq8u7swrd7vj6vdeswe92n4lzeweuyjaw0sfm",
    "label": "",
    "scriptPubKey": "0014eac07e7a0e1b7cc9698dcc1d92aa75f8b2ecf092",
    "amount": 50.00000000,
    "confirmations": 101,
    "spendable": true,
    "solvable": true,
    "desc": "wpkh([1de92c56/84'/1'/0'/0/0]036c59ef2016e0b39e018d7606f5a4020b64052855272618fade7c09772088ea7a)#t8g8qumy",
    "safe": true
  },
  {
    "txid": "f080646bcf97904b059c3f95cdb16d76bb8bb03e029519a473d3a14a21f78ea6",
    "vout": 0,
    "address": "bcrt1qdekulxrxszu6j08hlxrqu5yjzvexrttuxwm9vw",
    "label": "",
    "scriptPubKey": "00146e6dcf986680b9a93cf7f9860e5092133261ad7c",
    "amount": 49.00000000,
    "confirmations": 1,
    "spendable": true,
    "solvable": true,
    "desc": "wpkh([1de92c56/84'/1'/0'/0/1]02368a7fe0204ecab9268fe5b20cdb94937bb9eb19ebf464275d7d2c814b75efcd)#rl96y3dl",
    "safe": true
  },
  {
    "txid": "f080646bcf97904b059c3f95cdb16d76bb8bb03e029519a473d3a14a21f78ea6",
    "vout": 1,
    "address": "bcrt1qk6pnfsund3qtsczwr5ghqw75xqvvr3u4sx89mf",
    "scriptPubKey": "0014b68334c3936c40b8604e1d11703bd43018c1c795",
    "amount": 0.99990000,
    "confirmations": 1,
    "spendable": true,
    "solvable": true,
    "desc": "wpkh([1de92c56/84'/1'/0'/1/0]03f562451a150b9c15a25db67df7a0b3d2a5393a356eadbbaec6ff7ba93be9a12f)#wggd4zmv",
    "safe": true
  }
]
```


Why are those transactions still as UTXOs when we've just spent them? Because all those experiments were done within the same wallet.

