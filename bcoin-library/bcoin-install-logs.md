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


Then to run address.js and transaction.js

```
$ node address.js
$ node transaction.js
```


