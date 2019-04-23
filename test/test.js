// Copyleft (c) 2019 Podsystem Ltd (GPLv3)
// Authors : J. Félix Ontañón <felix.ontanon@podgroup.com>

'use strict';

var assert = require('assert');
var sim = require('../src');

describe('MCCMNC', function() {
  describe('#enc_mcc()', function() {
    it('should encode correctly', function() {
      assert.equal(sim.enc_mcc('214'), '12F4');
    });
  });

  describe('#enc_plmn()', function() {
    it('should encode correctly', function() {
      assert.equal(sim.enc_plmn('214', '01'), '12F410');
    });
  });

  describe('#dec_plmn()', function() {
    it('should encode correctly', function() {
      assert.deepEqual(sim.dec_plmn('12F410'), ['214', '01']);
    });
  });
});

describe('LUHN', function() {
  describe('#luhn_calculate()', function() {
    it('should calculate correct checksum', function() {
      assert.equal(sim.luhn_calculate('890126088120589772'), '8901260881205897720');
    });
  });
});

describe('NIBBLING', function() {
  describe('#nibble_iccid()', function() {
    it('should calculate correct nibbled value', function() {
      assert.equal(sim.nibble_iccid('8901260881205897720'), '981062801802857927F0');
    });
  });

  describe('#nibble_imsi()', function() {
    it('should calculate correct nibbled value', function() {
      assert.equal(sim.nibble_imsi('425019600457406'), '084952106900544760');
    });
  });
});