const { instanceToPlain, plainToInstance } = require("class-transformer");

class Snip {
  constructor(
    content,
    title,
    isDisposable,
    expiryDate,
    author = null,
    expires = null,
    createdAt = null,
    retrievalId = null
  ) {
    this.content = content;
    this.title = title;
    this.author = author;
    this.isDisposable = isDisposable;
    this.expires = expires;
    this.createdAt = createdAt;
    this.expiryDate = expiryDate;
    this.retrievalId = retrievalId;
  }

  static async findById(id, options = { metadataOnly: false }) {
    let endpoint = `http://localhost:8080/api/v1/snip/${id}?`;

    if (options != null) {
      const { metadataOnly } = options;
      endpoint += `metadataOnly=${metadataOnly}`;
    }

    const retrievedSnip = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
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

  static async findByAuthor(author) {
    const endpoint = `http://localhost:8080/api/v1/snip/author/${author}`;

    const retrievedSnips = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: is ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        return data.snips;
      })
      .catch((e) => {
        console.error(e);
      });

    return plainToInstance(Snip, retrievedSnips);
  }

  static async deleteById(id, token) {
    let endpoint = `http://localhost:8080/api/v1/snip/${id}?`;

    const deletedSnip = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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

    return plainToInstance(Snip, deletedSnip);
  }

  async save(token = null) {
    const headers = !token
      ? {
          "Content-Type": "application/json",
        }
      : {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

    return await fetch("http://localhost:8080/api/v1/snip", {
      method: "POST",
      headers,
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
