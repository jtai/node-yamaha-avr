node-yamaha-avr
===============

Node.js module for controlling Yamaha RX-V-series receiver (HTTP API)

> npm install

> npm test

#### Command line arguments

* 1st argument ip-address
* 2nd argument command
* 3rd argument parameters

- s get status
- p set power (on/off)
- v set volume (min 200, max X)

```
node main.js 192.168.1.40 p on
node main.js 192.168.1.40 p off
node main.js 192.168.1.40 v 320
node main.js 192.168.1.40 s
```
