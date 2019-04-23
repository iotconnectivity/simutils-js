# SIMUtils-js

SIM card checksum and encoding utils for nibbling, mcc, mnc, etc.

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Support](#support)
- [Contributing](#contributing)

## Usage

```javascript
> var sim = require('../src');
undefined
> sim
{ luhn_calculate: [Function: luhn_calculate],
  enc_mcc: [Function: enc_mcc],
  enc_plmn: [Function: enc_plmn],
  dec_plmn: [Function: dec_plmn],
  nibble_iccid: [Function: nibble_iccid],
  nibble_imsi: [Function: nibble_imsi] }
> sim.enc_mcc('214')
'12F4'
> sim.dec_plmn('12F410')
[ '214', '01' ]
> sim.nibble_iccid('8901260881205897720')
'981062801802857927F0'
> sim.nibble_imsi('425019600457406')
'084952106900544760'
```

## Installation

From npmjs repository

```
$ npm install 
```

From source code

```
$ npm install ./simutils-js
```

## Support

Please [open an issue](https://github.com/PodgroupConnectivity/simutils-js/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and open a pull request.