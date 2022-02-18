import User from "../auth/user.js";
import SaveList from "./saveListModel.js";

// get list through user token
export const getSaveList = async (req, res) => {
  const { userId, type } = req.body;
  // check if id exists
  const saveList = await SaveList.findOne({ userId: userId });

  if (!saveList) {
    // no saving list
    return res.status(200).json({ saveList: [] });
  }
  res.status(200).json({ saveList: saveList.saveList });
};

//  add item into list
// {location_id, name, address, tripAdvisor, image, type}
export const addItemToList = async (req, res) => {
  const {
    userId,
    location_id,
    name,
    address,
    tripAdvisor,
    image,
    location_type,
  } = req.body;
  if (
    !location_id ||
    !name ||
    !address ||
    !tripAdvisor ||
    !image ||
    !location_type
  )
    return res
      .status(400)
      .send(
        "Not enough info to add location to list.(location_id, name, address, tripAdvisor link, image)"
      );

  const userSaveList = await SaveList.findOne({ userId: userId });
  const item = {
    location_id,
    name,
    address,
    tripAdvisor,
    image,
    location_type,
  };
  if (!userSaveList) {
    // no saving list then create new one
    const list = await SaveList.create({
      userId: userId,
      saveList: [item],
    });
    await list.save();
    return res.status(200).send("New list and added");
  }
  await userSaveList.saveList.push(item);
  await userSaveList.save();
  res.status(200).send("added");
};

// delete item
export const deleteItem = async (req, res) => {
  const { userId } = req.body;
  const { location_id } = req.params;
  console.log("🚀 ~ location_id", location_id);
  const userSaveList = await SaveList.findOne({ userId: userId });
  userSaveList.saveList = userSaveList.saveList.filter(
    (place) => +place.location_id !== +location_id
  );
  await userSaveList.save();
  res.status(200).send("delete successful");
};
