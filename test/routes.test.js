const assert = require('assert');
const sinon = require('sinon');
const routes = require('../routes');
const express = require('express');
const app = express();

describe('routes', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            session: {}
        };
        res = {
            send: sinon.stub(),
            redirect: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should call myEmitter.emit with "index" on GET /', () => {
        routes(app);
        app.get('/', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'index', res, req);
        });
    });

    it('should call myEmitter.emit with "signUp" on GET /signUp', () => {
        routes(app);
        app.get('/signUp', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'signUp', res);
        });
    });

    it('should call myEmitter.emit with "board" on GET /board when sessionValue is set', () => {
        req.session.sessionValue = 'someValue';
        routes(app);
        app.get('/board', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'board', res);
        });
    });

    it('should call myEmitter.emit with "redirect" on GET /board when sessionValue is not set', () => {
        routes(app);
        app.get('/board', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'redirect', res);
        });
    });

    it('should call myEmitter.emit with "summary" on GET /summary when sessionValue is set', () => {
        req.session.sessionValue = 'someValue';
        routes(app);
        app.get('/summary', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'summary', req, res);
        });
    });

    it('should call myEmitter.emit with "redirect" on GET /summary when sessionValue is not set', () => {
        routes(app);
        app.get('/summary', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'redirect', res);
        });
    });

    it('should call myEmitter.emit with "contacts" on GET /contacts when sessionValue is set', () => {
        req.session.sessionValue = 'someValue';
        routes(app);
        app.get('/contacts', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'contacts', res);
        });
    });

    it('should call myEmitter.emit with "redirect" on GET /contacts when sessionValue is not set', () => {
        routes(app);
        app.get('/contacts', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'redirect', res);
        });
    });

    it('should call myEmitter.emit with "userLogin" on POST /logintry', () => {
        routes(app);
        app.post('/logintry', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'userLogin', req, res);
        });
    });

    it('should call myEmitter.emit with "userSignUp" on POST /newUser when passwords match', () => {
        req.body.username = 'someUsername';
        req.body.password = 'somePassword';
        req.body.confirmPassword = 'somePassword';
        routes(app);
        app.post('/newUser', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'userSignUp', req, res);
        });
    });

    it('should call myEmitter.emit with "failedSignUp" on POST /newUser when passwords do not match', () => {
        req.body.username = 'someUsername';
        req.body.password = 'somePassword';
        req.body.confirmPassword = 'differentPassword';
        routes(app);
        app.post('/newUser', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'failedSignUp', req.body.username, res);
        });
    });

    it('should call myEmitter.emit with "newData" on POST /newDataFromClient when sessionValue is set', () => {
        req.session.sessionValue = 'someValue';
        routes(app);
        app.post('/newDataFromClient', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'newData', req, res);
        });
    });

    it('should call myEmitter.emit with "redirect" on POST /newDataFromClient when sessionValue is not set', () => {
        routes(app);
        app.post('/newDataFromClient', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'redirect', res);
        });
    });

    it('should call myEmitter.emit with "userLogout" on GET /logout', () => {
        routes(app);
        app.get('/logout', (req, res) => {
            sinon.assert.calledWith(myEmitter.emit, 'userLogout', req, res);
        });
    });
});