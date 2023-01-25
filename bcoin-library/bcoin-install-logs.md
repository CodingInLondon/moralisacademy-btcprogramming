# Installing and building against the bcoin library


The commands below worked for my setup (Ubuntu 22.04 on a VM running on top of MacOs)


```
$ git clone https://github.com/bcoin-org/bcoin
$ cd bcoin
```



```
$ npm rebuild
rebuilt dependencies successfully

```


Created a project folder called 'project' and ran npm inside.

```
$ npm init
$ npm install https://github.com/bcoin-org/bcoin

added 1 package, and audited 30 packages in 2m

found 0 vulnerabilities

```


The address.js file outputs this:


```
$ node address.js
[
  <Buffer 02 09 f4 73 13 cf 69 2c ad 7a 0d ab 75 dd ec 66 44 91 15 7a 2d 8d 99 8a 68 09 85 ef 16 24 b2 3b 37>,
  <Buffer 03 7b 13 60 d6 c4 75 d8 e7 44 6e 2f 66 9b e1 78 15 ad 93 87 79 11 59 14 17 0b 0e 32 b8 54 6b c3 60>
]
<Script: OP_2 0x21 0x0209f47313cf692cad7a0dab75ddec664491157a2d8d998a680985ef1624b23b37 0x21 0x037b1360d6c475d8e7446e2f669be17815ad938779115914170b0e32b8546bc360 OP_2 OP_CHECKMULTISIG>
2N4qePEoMPBD4TZGByuj7B6g34kC2t99oM6
```



