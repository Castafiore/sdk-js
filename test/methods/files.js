const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const SDK = require('../../src/index');

describe('Items', function () {
  let client;

  beforeEach(function () {
    client = new SDK({
      url: 'https://demo-api.getdirectus.com'
    });

    const responseJSON = {
      data: {
        data: {}
      }
    };

    sinon.stub(client, 'request').resolves(responseJSON);
    sinon.stub(client, 'get').resolves(responseJSON);
    sinon.stub(client, 'put').resolves(responseJSON);
    sinon.stub(client, 'patch').resolves(responseJSON);
    sinon.stub(client, 'post').resolves(responseJSON);
    sinon.stub(client, 'delete').resolves(responseJSON);
  });

  afterEach(function () {
    client.request.restore();
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe('#uploadFiles()', function () {
    it('Errors on missing `fileslist` parameter', function () {
      expect(client.uploadFiles).to.throw();
    });

    // fails on stable
    it.skip('Calls post() for the right endpoint', function () {
      client.uploadFiles(["fileA", "fileB"]);
      expect(client.request).to.have.been.calledWith('POST', '/files', {}, ["fileA", "fileB"], false, {
        "Content-Type": "multipart/form-data"
      });
    });

    // fails on stable
    it.skip('Calls post() with overwritten headers', function () {
      client.uploadFiles(["fileA", "fileB"], () => { }, {
        "Content-Type": "multipart/form-data; boundary=--------------------------693343438674222528347432"
      });
      expect(client.request).to.have.been.calledWith('POST', '/files', {}, ["fileA", "fileB"], false, {
        "Content-Type": "multipart/form-data; boundary=--------------------------693343438674222528347432"
      });
    });
  });
});
