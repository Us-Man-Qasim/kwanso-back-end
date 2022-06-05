import Model from "../model/index.mjs";
import CatchAsync from "../util/CatchAsync.mjs";

const createTask = CatchAsync(async (req, res, next) => {
  const { _id, name } = req.body;
  const response = await Model.Task.create({ name, userId: _id });
  res.send({ task: { id: response._id, name: response.name } });
});

async function listTasks(req, res) {
  const { _id } = req.body;
  const response = await Model.Task.find({ userId: _id }).select("name -_id");
  res.send({ tasks: response });
}

export { createTask, listTasks };
