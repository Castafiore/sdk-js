import * as chai from "chai";
// @ts-ignore wrong module format of chai-datetime!
import * as chaiDateTime from "chai-datetime";
import * as jwt from "jsonwebtoken";
import * as sinonChai from "sinon-chai";

import SDK from "../src/index";
import { ISDK } from "../src/SDK";

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiDateTime);

describe("Payload", () => {
  let client: ISDK;

  beforeEach(() => {
    client = new SDK(undefined as any);
  });

  it("Returns null when there is no token set", () => {
    expect(client.payload).to.be.null;
  });

  it("Returns the correct payload from the set token", () => {
    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      noTimestamp: true,
    });
    expect(client.payload).to.deep.include({ foo: "bar" });
  });

  it("Converts the optional exp in payload to the correct JS Date", () => {
    // JWT Expires in 1h
    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      expiresIn: "1h",
      noTimestamp: true,
    });

    const date = new Date();
    date.setHours(date.getHours() + 1);

    expect(client.payload.exp).to.equalDate(date);
  });

  it("Reports a loggedIn flag when token, url, project are set and token has not expired", () => {
    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      expiresIn: "-1h",
      noTimestamp: true,
    });
    client.config.url = "https://demo-api.getdirectus.com";
    expect(client.loggedIn).to.equal(false);

    client.config.token = jwt.sign({ foo: "bar" }, "secret-string", {
      expiresIn: "1h",
      noTimestamp: true,
    });
    client.config.localExp = Date.now() + 10e5; // set expiration to future
    expect(client.loggedIn).to.equal(true);
  });
});
