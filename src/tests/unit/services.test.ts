import sinon from 'sinon';
import { expect } from 'chai';
import repos from '../mocks/repo.mock.json';
import users from '../mocks/users.mock.json';
import userDetail from '../mocks/userDetails.mock.json';
import Service from '../../services';

describe('Services', () => {
  afterEach(sinon.restore);
  describe('1 - GetUser', () => {
    beforeEach(() => {
			sinon.stub(Service, <any>'request').resolves({ status: 200, data: users });
		});
    it('should return users', async () => {
      const { status, data } = await Service.getUsers();
      expect(status).to.equal(200);
      expect(data).to.deep.equal(users);
    });
  });
  describe('2 - GetUserDetails with valid username', () => {
    beforeEach(() => {
      sinon.stub(Service, <any>'request').resolves({ status: 200, data: userDetail });
    });
    it('should return user details', async () => {
      const { status, data } = await Service.getUser('cassiusbessa');
      expect(status).to.equal(200);
      expect(data).to.deep.equal(userDetail);
    });
  });
  describe('2 - GetUserDetails with invalid username', () => {
    beforeEach(() => {
      sinon.stub(Service, <any>'request').resolves({ status: 404, data: {message:'Not found'} });
    });
    it('should return user details', async () => {
      const { status, data } = await Service.getUser('cassiusbessa');
      expect(status).to.equal(404);
      expect(data).to.deep.equal( { message:'Not found' });
    });
  }); 
});