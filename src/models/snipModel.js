const { instanceToPlain, plainToInstance } = require("class-transformer");
const { response } = require("express");

class Snip {
  constructor(
    content,
    title,
    isDisposable,
    expiryDate,
    author = null,
    expires = null,
    createdAt = null
  ) {
    this.content = content;
    this.title = title;
    this.author = author;
    this.isDisposable = isDisposable;
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

  async save() {
    return await fetch("http://localhost:8080/api/v1/snip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.toJSON()),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status is: ${response.status}`);
        }

        return response.headers.get("Location");
      })
      .then((data) => {
        const retrievalId = data.split("/").pop();

        return retrievalId;
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
