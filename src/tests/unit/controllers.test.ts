import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';	
import repos from '../mocks/repo.mock.json';
import users from '../mocks/users.mock.json';
import userDetail from '../mocks/userDetails.mock.json';
import Service from '../../services';
import controllers from '../../controllers';

describe('Controllers', () => {
  afterEach(sinon.restore)
  const req = {} as Request;
	const res = {} as Response;
  describe('1 - GetUsers', () => {
    before(() => {
      sinon.stub(Service, 'getUsers').resolves({status: 200, data: users, nextPage: null});
      req.query = {since: '0', per_page: '5'};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    after(() => {
      sinon.restore();
    });
    it('should return users', async () => {
      await controllers.getUsers(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ users, nextPage: null })).to.be.true;
    });
  });

  describe('2 - GetUser with valid username', () => {
    before(() => {
      sinon.stub(Service, 'getUser').resolves({status: 200, data: userDetail});
      req.params = {username: 'cassius'};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    after(() => {
      sinon.restore();
    });
    it('should return user details', async () => {
      await controllers.getUser(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userDetail )).to.be.true;
    });
  });
  describe('2 - GetUser with invalid username', () => {
    before(() => {
      sinon.stub(Service, 'getUser').resolves({status: 404, data: {message:'Not found'}});
      req.params = {username:"invalidUser"};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    after(() => {
      sinon.restore();
    });
    it('should return not fount status and mensage', async () => {
      await controllers.getUser(req, res);
      expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({message:'Not found'})).to.be.true;
    });
  });

  describe('3 - GetUserRepos with valid username', () => {
    before(() => {
      sinon.stub(Service, 'getUserRepos').resolves({status: 200, data: repos});
      req.params = {username: 'cassiusbessa'};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
    after(() => {
      sinon.restore();
    });
    it('should return user repos', async () => {
      await controllers.getUserRepos(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(repos)).to.be.true;
    });
  });

});
