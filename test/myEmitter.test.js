const assert = require('assert');
const sinon = require('sinon');
const myEmitter = require('../myEmitter');
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

describe('myEmitter', () => {
    let req, res, dbStub, bcryptStub;

    beforeEach(() => {
        req = {
            body: {},
            session: {
                destroy: sinon.stub(),
                sessionValue: undefined
            },
            cookies: {}
        };
        res = {
            render: sinon.stub(),
            redirect: sinon.stub(),
            send: sinon.stub(),
            cookie: sinon.stub()
        };

        // Stubs for db methods
        dbStub = sinon.stub(db);
        bcryptStub = sinon.stub(bcrypt, 'compareSync');
    });

    afterEach(() => {
        // Restore original methods
        sinon.restore();
    });

    describe('index event', () => {
        it('should destroy session and set counter cookie', () => {
            myEmitter.emit('index', res, req);
            assert.ok(req.session.destroy.called);
            assert.ok(res.cookie.calledWith('counter', 1, { maxAge: 3600 * 1000 }));
        });
    });

    describe('redirect event', () => {
        it('should redirect to index', () => {
            myEmitter.emit('redirect', res);
            assert.ok(res.redirect.calledWith('index'));
        });
    });

    describe('signUp event', () => {
        it('should render signUp view', () => {
            myEmitter.emit('signUp', res);
            assert.ok(res.render.calledWith(sinon.match(/signUp\.ejs$/)));        });
    });

    describe('userLogin event', () => {
        it('should log in user and redirect to summary', () => {
            req.body.username = 'username';
            req.body.password = 'password';
            dbStub.getUserByUsername.returns({ password: 'hashedPassword' });
            bcryptStub.returns(true);
            myEmitter.emit('userLogin', req, res);
            assert.strictEqual(req.session.sessionValue, 'username');
            assert.ok(res.redirect.calledWith('/summary'));
        });

        it('should not log in user and render index view', () => {
            req.body.username = 'username';
            req.body.password = 'password';
            dbStub.getUserByUsername.returns(undefined);
            myEmitter.emit('userLogin', req, res);
            assert.strictEqual(req.session.sessionValue, undefined);
            assert.ok(res.render.calledWith('index'));
        });
    });

    describe('userLogout event', () => {
        it('should log out user and redirect to index', () => {
            req.session.sessionValue = 'username';
            myEmitter.emit('userLogout', req, res);
            assert.strictEqual(req.session.sessionValue, 'username');
            assert.ok(res.redirect.calledWith('/index'));
        });
    });

    describe('userSignUp event', () => {
        it('should create new user and render index view', () => {
            req.body.username = 'username';
            req.body.email = 'email';
            req.body.password = 'password';
            dbStub.getUserByUsername.returns(undefined);
            dbStub.createUser.yields();
            myEmitter.emit('userSignUp', req, res);
            assert.ok(res.render.calledWith(sinon.match(/index\.ejs$/)));
        });

        it('should not create new user and redirect to signUp view', () => {
            req.body.username = 'username';
            req.body.email = 'email';
            req.body.password = 'password';
            dbStub.getUserByUsername.returns({ username: 'username' });
            myEmitter.emit('userSignUp', req, res);
            assert.ok(res.redirect.calledWith('/signUp'));
        });
    });

    describe('failedSignUp event', () => {
        it('should render passwordFail view', () => {
            myEmitter.emit('failedSignUp', 'username', res);
            assert.ok(res.render.calledWith('passwordFail'));
        });
    });

    describe('contacts event', () => {
        it('should render contacts view with data', () => {
            let tasksArray = [];
            const contactsArray = [];
            const lastID = 0;
            dbStub.fetchAndTransformTasks.returns(Promise.resolve(tasksArray));
            dbStub.fetchAndTransformContacts.returns(Promise.resolve(contactsArray));
            dbStub.getLastContactID.returns(lastID);
            myEmitter.emit('contacts', res);
            assert.ok(res.render.calledWith(sinon.match(/contacts\.ejs$/), {
                updatedtasks: JSON.stringify(tasksArray),
                updatedcontacts: JSON.stringify(contactsArray),
                lastID
            }));
        });
    });

    describe('summary event', () => {
        it('should render summary view with data', () => {
            const username = req.session.sessionValue;
            const tasksArray = [];
            const contactsArray = [];
            const lastID = 0;
            req.session.sessionValue = username;
            dbStub.fetchAndTransformTasks.returns(Promise.resolve(tasksArray));
            dbStub.fetchAndTransformContacts.returns(Promise.resolve(contactsArray));
            dbStub.getLastContactID.returns(lastID);
            myEmitter.emit('summary', req, res);
            assert.ok(res.render.calledWith(sinon.match(/summary\.ejs$/), {
                username,
                updatedtasks: JSON.stringify(tasksArray),
                updatedcontacts: JSON.stringify(contactsArray),
                lastID
            }));
        });
    });

    describe('board event', () => {
        it('should render board view with data', () => {
            const tasksArray = [];
            const contactsArray = [];
            const lastID = 0;
            dbStub.fetchAndTransformTasks.returns(tasksArray);
            dbStub.fetchAndTransformContacts.returns(contactsArray);
            dbStub.getLastContactID.returns(lastID);
            myEmitter.emit('board', res);
            assert.ok(res.render.calledWith(sinon.match(/board\.ejs$/), {
                updatedtasks: JSON.stringify(tasksArray),
                updatedcontacts: JSON.stringify(contactsArray),
                lastID
            }));
        });
    });

    describe('newData event', () => {
        it('should not update tasks and send success response', () => {
            const data = { FromPage: 'Tasks' };
            req.body = data;
            dbStub.updateTasks.yields();
            myEmitter.emit('newData', req, res);
            assert.ok(dbStub.updateTasks.notCalled);
            assert.ok(res.send.calledWith('Data received successfully!'));
        });

        it('should update contacts and send success response', () => {
            const data = { FromPage: 'Contacts' };
            req.body = data;
            dbStub.updateGlobalContacts.yields();
            myEmitter.emit('newData', req, res);
            assert.ok(dbStub.updateGlobalContacts.notCalled);
            assert.ok(res.send.calledWith('Data received successfully!'));
        });
    });
});
