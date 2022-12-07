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
    const response = { status: 200, data: users, nextPage: null };
    before(() => {
      sinon.stub(Service, 'getUsers').resolves({status: 200, data: users, nextPage: null});
      req.query = {since: '0', per_page: '5'};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    after(() => {
      sinon.restore();
    });
    });
    it('should return users', async () => {
      await controllers.getUsers(req, res);
      expect((res.status as sinon.SinonStub).calledWith(response.status)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ users, nextPage: null })).to.be.true;
    });
  });
});
