const yup = require("yup");

const list = async ({ User }, req, res) => {
  const users = await User.find({});
  res.send(users);
};

const findById = async ({ User }, req, res) => {
  const users = await User.findOne({ _id: req.params.id });
  res.send(users);
};

const create = async ({ User }, req, res) => {
  const userSchema = yup.object().shape({
    username: yup.string().required().min(6),
    password: yup.string().required().strict(true),
  });

  if (!(await userSchema.isValid(req.body))) {
    return res.status(400).json({ error: "Error on validate schema" });
  }

  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
};

const update = async ({ User }, req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  user.username = req.body.name;
  user.password = req.body.password;
  user.roles = req.body.roles;
  try {
    await user.save();
    res.statusCode = 204;
    res.send(user);
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
};

module.exports = { list, create, update, findById };
