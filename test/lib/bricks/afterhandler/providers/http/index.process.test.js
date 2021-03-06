'use strict';

const appRootPath = require('cta-common').root('cta-app-notificationservice');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-as-promised');
const nodepath = require('path');

const Http = require(nodepath.join(appRootPath,
  '/lib/bricks/afterhandler/providers', 'http'));
const Logger = require('cta-logger');
const DEFAULTCONFIG = {
  name: 'afterhandler',
  module: '../../lib/index',
  properties: {},
  publish: [],
};
const DEFAULTLOGGER = new Logger(null, null, DEFAULTCONFIG.name);
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: DEFAULTCONFIG.name,
  dependencies: {
    logger: DEFAULTLOGGER,
  },
};
const configuration = require('./configuration.testdata.js');

describe('AfterHandler - Http - process', function() {
  let http;
  before(function() {
    http = new Http(DEFAULTCEMENTHELPER, DEFAULTLOGGER, configuration);
  });

  context('when httpHelper process resolves', function() {
    const mockPromise = {};
    before(function() {
      sinon.stub(http.httpHelper, 'process').resolves(mockPromise);
    });
    after(function() {
      http.httpHelper.process.restore();
    });
    it('should resolve with httpHelper process promise', function() {
      const promise = http.process({});
      expect(promise).to.eventually.equal(mockPromise);
    });
  });

  context('when httpHelper process resolves', function() {
    const mockError = new Error('mock process error');
    before(function() {
      sinon.stub(http.httpHelper, 'process').rejects(mockError);
    });
    after(function() {
      http.httpHelper.process.restore();
    });
    it('should resolve with httpHelper process promise', function() {
      const promise = http.process({});
      expect(promise).to.eventually.be.rejectedWith(mockError);
    });
  });
});

