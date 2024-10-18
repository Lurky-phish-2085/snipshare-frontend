const { instanceToPlain, plainToInstance } = require("class-transformer");
const { response } = require("express");

class Snip {
  constructor(
    content,
    title,
    author,
    isdisposable,
    expires,
    createdAt,
    expiryDate
  ) {
    this.content = content;
    this.title = title;
    this.author = author;
    this.isdisposable = isdisposable;
    this.expires = expires;
    this.createdAt = createdAt;
    this.expiryDate = expiryDate;
  }

  static async findById(id) {
    const retrievedSnip = await fetch(
      `http://localhost:8080/api/v1/snip/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: is ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(e);
      });

    return plainToInstance(Snip, retrievedSnip);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}

module.exports = Snip;
