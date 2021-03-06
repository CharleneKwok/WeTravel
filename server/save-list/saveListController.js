import User from "../auth/user.js";
import SaveList from "./saveListModel.js";

// get list through user token
export const getSaveList = async (req, res) => {
  const { userId } = req.params;
  // check if id exists
  const saveList = await SaveList.findOne({ userId: userId });

  if (!saveList) {
    // no saving list
    return res.status(200).json({ saveList: [] });
  }
  res.status(200).json({ saveList: saveList.saveList });
};

//  add item into list
// {location_id, name, address, tripAdvisor, image, location_type, user_Id}
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
  if (!location_id || !name || !address || !image || !location_type)
    return res
      .status(400)
      .send(
        "Not enough info to add location to list.(userId,location_id, name, address, tripAdvisor link, image,location_type)"
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
  const { loginId } = req.body;
  const { location_id } = req.params;
  const userSaveList = await SaveList.findOne({ userId: loginId });
  userSaveList.saveList = userSaveList.saveList.filter(
    (place) => +place.location_id !== +location_id
  );
  await userSaveList.save();
  res.status(200).send("delete successful");
};
