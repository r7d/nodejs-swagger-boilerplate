import request from "supertest";
import { expect} from "chai";
import app from "./../../src/app";
import config from "./../../src/config";

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(app).get("/random-url")
            .expect(404, done);
    });
});

describe("GET /ping", () => {
    it("should return 200", (done) => {
        request(app).get("/ping")
            .expect(200)
            .end(function(err, res) {
                expect(res.body).haveOwnProperty("status").to.be.equal("ok");
                expect(res.body).haveOwnProperty("upTime").to.be.not.null;
                expect(res.header).haveOwnProperty(config.correlationId.headerName).to.be.not.null;
                done();
            });
    });
});