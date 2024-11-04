const login = (req, res) => {
  const { username, password } = req.body;

  fetch(`http://localhost:8080/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("AAAAAAAA");
      }

      const token = response.headers.get("Authorization").split(" ").pop();

      res.cookie("jwt", token, {
        httpOnly: true,
      });

      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

const register = (req, res) => {
  const { username, password } = req.body;

  fetch(`http://localhost:8080/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Response status is ${response.status}, and ${JSON.stringify(
            response.json()
          )}`
        );
      }

      return true;
    })
    .then(async (successful) => {
      if (successful) {
        // TODO: Should redirect the user to the dashboard
        // and has a cookie to be authenticated as a account user (the dashboard view changes)
        const token = await fetch(`http://localhost:8080/api/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("AAAAAAAA");
            }

            return response.headers.get("Authorization").split(" ").pop();
          })
          .catch((error) => {
            console.error("Error: ", error);
          });

        res.cookie("jwt", token, {
          httpOnly: true,
        });

        res.redirect("/");
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      // TODO: If Error, display a message in the register view about what happened wrong.
    });
};

module.exports = {
  login,
  register,
};
