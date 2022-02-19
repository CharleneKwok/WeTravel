import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getSaveList } from "../../api/feature-api";
import Avatar from "../header/Avatar";
import Button from "../UI/Button";
import Page from "../UI/Page";
import CollectionCard from "./CollectionCard";
import classes from "./Space.module.scss";

const Space = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (!user) {
      return <Redirect to="/login" />;
    }
    const getCollection = async () => {
      const resp = await getSaveList(user._id);
      setCollection(resp.data.saveList);
      console.log("🚀 ~ collection", collection);
    };
    getCollection();
  }, [collection, user]);

  return (
    <Page className={classes["space-container"]}>
      <div className={classes["space-image"]}>
        <div className={classes["user_info"]}>
          <Avatar className={classes["user_info--avatar"]} />
          <h2>{user.username}</h2>
          <div className={classes["user_info--follow"]}>
            <p>Followers: 0</p>
            <p>Following: 0</p>
          </div>
          <p className={classes["user_info--bio"]}>bio: Love everything!</p>
        </div>
      </div>
      <section>
        <div>
          <Button text="COLLECTION" to="/space/collection" />
          <Button text="POSTS" to="/space/posts" />
        </div>
        {collection ? (
          <div>
            {collection.map((item, i) => (
              <CollectionCard key={i} item={item} />
            ))}
          </div>
        ) : (
          <p>Cannot find any saved location</p>
        )}
      </section>
    </Page>
  );
};

export default Space;
