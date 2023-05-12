const yup = require("yup");
const socketClient = require("../socket/client");

const list = async ({ Count }, req, res) => {
  const counts = await Count.find({});
  res.status(200).send(counts);
};

const create = async ({ Count }, req, res) => {
  const getFormatedDate = (currentDate) => {
    return currentDate.split("/").reverse().join("-");
  };

  // console.log(req.body);

  const countSchema = yup.object().shape({
    date: yup
      .date()
      .max(getFormatedDate(new Date().toLocaleDateString()))
      .required("Campo obrigatório"),
    description: yup.string().required().min(6),
    value: yup.string().required(),
    category: yup.lazy((val) =>
      Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
    ),
    user_id: yup.string().required(),
  });

  if (!(await countSchema.isValid(req.body))) {
    return res.status(400).json({ error: "Error on validate schema" });
  }

  const count = new Count(req.body);

  try {
    await count.save();
    res.statusCode = 201;
    res.send(count);
    socketClient.emit("newCount", req.body.user_id);
  } catch (e) {
    res.statusCode = 500;
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
};

module.exports = { list, create };
