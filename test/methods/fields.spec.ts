// tslint:disable: no-unused-expression
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import SDK from '../../src/index';

const expect = chai.expect;
chai.use(sinonChai);

describe('Fields', () => {
  let client;

  beforeEach(() => {
    client = new SDK({
      url: 'https://demo-api.getdirectus.com',
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client, 'get').resolves(responseJSON);
    sinon.stub(client, 'put').resolves(responseJSON);
    sinon.stub(client, 'patch').resolves(responseJSON);
    sinon.stub(client, 'post').resolves(responseJSON);
    sinon.stub(client, 'delete').resolves(responseJSON);
  });

  afterEach(() => {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe('#getAllFields()', () => {
    it('Defaults to an empty object if no parameters are passed', () => {
      client.getAllFields();
      expect(client.get).to.have.been.calledWith('/fields', {});
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getAllFields('params')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getAllFields({ limit: 50 });
      expect(client.get).to.have.been.calledWith('/fields', {
        limit: 50,
      });
    });
  });

  describe('#getFields()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getFields).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', () => {
      expect(() => client.getFields('projects', 'params')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getFields('projects', { limit: 50 });
      expect(client.get).to.have.been.calledWith('/fields/projects', {
        limit: 50,
      });
    });
  });

  describe('#getField()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.getField).to.throw();
    });

    it('Errors on missing `fieldName` parameter', () => {
      expect(() => client.getField('projects')).to.throw();
    });

    it('Calls get() for the right endpoint', () => {
      client.getField('projects', 'title', { fields: 'interface' });
      expect(client.get).to.have.been.calledWith('/fields/projects/title', {
        fields: 'interface',
      });
    });
  });

  describe('#createField()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.createField).to.throw();
    });

    it('Errors on missing `fieldInfo` parameter', () => {
      expect(() => client.createField('collection')).to.throw();
    });

    it('Calls post() for the right endpoint', () => {
      client.createField('members', {
        field: 'first_name',
        interface: 'text-input',
      });
      expect(client.post).to.have.been.calledWith('/fields/members', {
        field: 'first_name',
        interface: 'text-input',
      });
    });
  });

  describe('#updateField()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(client.updateField).to.throw();
    });

    it('Errors on missing `fieldName` parameter', () => {
      expect(() => client.updateField('collection')).to.throw();
    });

    it('Errors on missing `fieldInfo` parameter', () => {
      expect(() => client.updateField('members', 'first_name')).to.throw();
    });

    it('Calls patch() for the right endpoint', () => {
      client.updateField('members', 'first_name', {
        field: 'first_name',
        interface: 'text-input',
      });
      expect(client.patch).to.have.been.calledWith('/fields/members/first_name', {
        field: 'first_name',
        interface: 'text-input',
      });
    });
  });

  describe('#updateFields', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(() => client.updateFields()).to.throw();
    });

    it("Errors if fieldsInfoOrFieldNames isn't an array", () => {
      expect(() => client.updateFields('projects', 'updates'));
    });

    it('Errors if fieldInfo has been passed in a wrong format', () => {
      expect(() => client.updateFields('projects', ['first_name', 'last_name'], 'update')).to.throw();
    });

    it('Calls patch() multiple fields same value', () => {
      client.updateFields('members', ['first_name', 'last_name'], {
        default_value: '',
      });

      expect(client.patch).to.have.been.calledWith('/fields/members/first_name,last_name', {
        default_value: '',
      });
    });

    it('Calls patch() multiple fields multiple values', () => {
      client.updateFields('members', [
        {
          field: 'id',
          sort: 1,
        },
        {
          field: 'first_name',
          sort: 2,
        },
      ]);

      expect(client.patch).to.have.been.calledWith('/fields/members', [
        {
          field: 'id',
          sort: 1,
        },
        {
          field: 'first_name',
          sort: 2,
        },
      ]);
    });
  });

  describe('#deleteField()', () => {
    it('Errors on missing `collection` parameter', () => {
      expect(() => client.deleteField()).to.throw();
    });

    it('Errors on missing `fieldName` parameter', () => {
      expect(() => client.deleteField('test')).to.throw();
    });

    it('Calls delete() for the right endpoint', () => {
      client.deleteField('test', 'field');
      expect(client.delete).to.have.been.calledWith('/fields/test/field');
    });
  });
});
