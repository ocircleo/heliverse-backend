app.get("/test/register", async (req, res) => {
  const length = 5;
  const resultall = [];
  async function pushToDatabase(num) {
    if (num == data.length) return res.send(resultall);
    if (num < data.length) {
      bcrypt.hash(data[num].password, 10, async function (err, hash) {
        const newUser = new userModel({
          ...data[num],
          password: hash,
        });
        const result = await newUser.save();
        console.log(result.email || "pushed");
        resultall.push(result);
        await pushToDatabase(num + 1);
      });
    }
  }
  pushToDatabase(0);
});
app.post("/test/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await userModel.findOne({ email: email });
  bcrypt.compare(password, user.password, function (err, result) {
    if (result == true) {
      res.send({
        status: "found",
        data: user,
      });
    } else {
      res.send({
        status: 404,
        message: "user not found",
      });
    }
  });
});