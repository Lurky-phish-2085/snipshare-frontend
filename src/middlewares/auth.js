function auth() {
  return async (req, res, next) => {
    const { jwt } = req.cookies;

    await fetch(`http://localhost:8080/api/v1/auth/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const message = await response.json();
          throw new Error(JSON.stringify(message));
        }

        const token = response.headers.get("Authorization").split(" ").pop();

        return {
          token,
          user: await response.json(),
        };
      })
      .then((data) => {
        const { token, user } = data;

        req.authUser = user;
        res.cookie("jwt", token, {
          httpOnly: true,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        next();
      });
  };
}

module.exports = auth;
