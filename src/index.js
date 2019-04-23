// Copyleft (c) 2019 Podsystem Ltd (GPLv3)
// Authors : J. Félix Ontañón <felix.ontanon@podgroup.com>

'use strict';

module.exports = {
    enc_mcc: enc_mcc,
    enc_plmn: enc_plmn,
    dec_plmn: dec_plmn,
    luhn_calculate: luhn_calculate,
    nibble_iccid: nibble_iccid,
    nibble_imsi: nibble_imsi
};

// Auxilar functions for left and right padding strings

function lpad (s,n,c) {var i; var a = s.split(''); for (i = 0; i < n - s.length; i++) {a.unshift (c)}; return a.join('')}
function rpad (s,n,c) {var i; var a = s.split(''); for (i = 0; i < n - s.length; i++) {a.push (c)}; return a.join('')}

// PLMN encoding decoding
// Converts MCC MNC pair to a nibbled PLMN according to 3GPP TS 24.008 standard and viceversa (see section 10.5.1.13)
// http://www.etsi.org/deliver/etsi_ts/124000_124099/124008/08.06.00_60/ts_124008v080600p.pdf

function enc_mcc(mcc) {
  var mcc = rpad(mcc.toString(), 4, 'F').split('');
  return mcc[1] + mcc[0] + mcc[3] + mcc[2];
}

function enc_plmn (mcc, mnc) {
  mcc = rpad(mcc.toString(), 3, 'F').split('');

  if (mnc.toString().length == 1) { mnc = '0' + mnc.toString() }
  mnc = rpad(mnc.toString(), 3, 'F').split('');
  
  return mcc[1] + mcc[0] + mnc[2] + mcc[2] + mnc[1] + mnc[0];
}

function dec_plmn (plmn) {
  if (plmn.length < 6) {
    return "Error: plmn size lower than 6";
  } else {
    var mcc = plmn[1] + plmn[0] + plmn[3];
    var mnc = plmn[5] + plmn[4] + plmn[2];

    mcc = mcc.toUpperCase().replace('F','');
    mnc = mnc.toUpperCase().replace('F','');

    var mccmnc = new Array();
    mccmnc[0] = mcc;
    mccmnc[1] = mnc;
    return mccmnc;
  }
}

/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 * From: https://simplycalc.com/luhn-source.php
 */

/* luhn_checksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhn_checksum(code) {
    var len = code.length
    var parity = len % 2
    var sum = 0
    for (var i = len-1; i >= 0; i--) {
        var d = parseInt(code.charAt(i))
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d
    }
    return sum % 10
};

/* luhn_caclulate
 * Return a full code (including check digit), from the specified partial code (without check digit).
 */
function luhn_calculate(partcode) {
    var checksum = luhn_checksum(partcode + "0")
    checksum == 0 ? 0 : 10 - checksum;
    return partcode + checksum;
};

// ICCID nibbling
function nibble_iccid(iccid) {
    return rpad(iccid,20,'F').match(/.{1,2}/g).map(x => x[1] + x[0]).reduce((x, y) => x + y)
}

// IMSI nibbling
function nibble_imsi(imsi) {
    return ('809' + imsi).match(/.{1,2}/g).map(x => x[1] + x[0]).reduce((x, y) => x + y)
}