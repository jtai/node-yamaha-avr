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
- c get system configuration
- p set power (on/off)
- m set mute (on/off)
- v set volume (min 200, max X)

```
node main.js 192.168.1.40 p on
node main.js 192.168.1.40 p off
node main.js 192.168.1.40 m on
node main.js 192.168.1.40 m off
node main.js 192.168.1.40 v 320
node main.js 192.168.1.40 s
node main.js 192.168.1.40 c
```
