const { instanceToPlain } = require("class-transformer");
const { response } = require("express");

class Snip {
  constructor(
    content,
    title,
    author,
    isdisposable,
    expires,
    createdat,
    expirydate
  ) {
    this.content = content;
    this.title = title;
    this.author = author;
    this.isdisposable = isdisposable;
    this.expires = expires;
    this.createdat = createdat;
    this.expirydate = expirydate;
  }

  static async findById(id) {
    return await fetch(`http://localhost:8080/api/v1/snip/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("AAAAAAAAAAAAA");
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  toJSON() {
    return instanceToPlain(this);
  }
}

module.exports = Snip;
