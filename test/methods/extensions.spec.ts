import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import SDK from "../../src/";
import { ISDK } from "../../dist/types/src/SDK";

const expect = chai.expect;
chai.use(sinonChai);

describe("Extensions", () => {
  let client: SDK;

  beforeEach(() => {
    client = new SDK({
      url: "https://demo-api.getdirectus.com",
    });

    const responseJSON = {
      data: {
        data: {},
      },
    };

    sinon.stub(client.api, "request").resolves(responseJSON);
  });

  afterEach(() => {
    (client.api.request as any).restore();
  });

  describe("#getInterfaces()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getInterfaces();
      expect(client.api.request).to.have.been.calledWith("get", "/interfaces", {}, {}, true);
    });
  });

  describe("#getLayouts()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getLayouts();
      expect(client.api.request).to.have.been.calledWith("get", "/layouts", {}, {}, true);
    });
  });

  describe("#getPages()", () => {
    it("Calls request() for the right endpoint", () => {
      client.getPages();
      expect(client.api.request).to.have.been.calledWith("get", "/pages", {}, {}, true);
    });
  });
});
