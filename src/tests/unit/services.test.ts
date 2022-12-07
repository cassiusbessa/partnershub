import sinon from 'sinon';
import { expect } from 'chai';
import repos from '../mocks/repo.mock.json';
import users from '../mocks/users.mock.json';
import userDetail from '../mocks/userDetails.mock.json';
import Service from '../../services';

describe('Services', () => {
  afterEach(sinon.restore);
  describe('1 - getUsers', () => {
    beforeEach(() => {
			sinon.stub(Service, <any>'request').resolves({ status: 200, data: users });
		});
    it('should return users', async () => {
      const { status, data } = await Service.getUsers();
      expect(status).to.equal(200);
      expect(data).to.deep.equal(users);
    });
  });
});