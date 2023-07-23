const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const server = require("../app.js");

chai.use(chaiHttp);

describe("Testing the person API", () => {
  describe("getting user", () => {
    it("checking for all the users get", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/person")
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("array");
          done();
        });
    });

    it("getting the id specific user", (done) => {
      const id = "64b2b2ce72f888b0a47f59c1";
      chai
        .request(server)
        .get("/person/" + id)
        .end((err, response) => {
          expect(response).to.have.status(200);
        });
      done();
    });
  });

  describe("for not getting users", () => {
    it("should not get all the data of users", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/persons")
        .end((err, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });
  });

  describe("for posting the data", () => {
    // it("should post the data", (done) => {
    //   chai
    //     .request("http://localhost:3000")
    //     .post("/person")
    //     .send({ name: "ravi", email: "ravi@gmail.com", salary: 3000 })
    //     .end((err, response) => {
    //       expect(response).to.have.status(200);
    //       expect(response).to.be.an("object");
    //       done();
    //     });
    // });

    it("should not be posting the data", (done) => {
      chai
        .request(server)
        .post("/person")
        .send({ email: "ravi@gmail.com", salary: 3000 })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an("object");
          done();
        });
    });
  });

  describe("for updating the data using post", () => {
    it("should be updating the specific data", (done) => {
      const id = "64b2b2e672f888b0a47f59c3";
      chai
        .request(server)
        .put("/person/" + id)
        .send({
          name: "sandeep singh",
          email: "sandeepsingh1040@gmail.com",
          salary: 5000,
        })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body[0].name).to.equal("sandeep singh");
        });
      done();
    });
  });

  describe("for deleting of the specific data", () => {
    it("should be deleting the user", (done) => {
      const id = "64b503a9f233b413123e4be2";
      chai
        .request(server)
        .delete("/person/" + id)
        .end((err, response) => {
          expect(response).to.have.status(200);
        });
      done();
    });
  });

  describe("for checking for the specfic value", () => {
    it("should check for the specific value", (done) => {
      const id = "64b2b2ce72f888b0a47f59c1";
      chai
        .request(server)
        .get("/person/" + id)
        .end((Err, response) => {
          expect(response.body[0].name).to.equal("prashant");
          expect(response.body).to.have.key("name");
        });
      done();
    });
  });
});
