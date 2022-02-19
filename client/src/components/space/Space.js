import React, { createRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { deleteItemOnList, getSaveList } from "../../api/feature-api";
import Avatar from "../header/Avatar";
import Button from "../UI/Button";
import Page from "../UI/Page";
import CollectionCard from "./CollectionCard";
import classes from "./Space.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

const Space = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [collection, setCollection] = useState({});
  const [remove, setRemove] = useState(false);
  const location = useLocation();
  const isCollection = location.pathname.includes("collection");
  const history = useHistory();
  const [select, setSelect] = useState("");
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      history.push("/login");
    }
  }, []);

  const removeItem = async (id) => {
    try {
      await deleteItemOnList(id);
      setRemove(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getCollection = async () => {
      const resp = await getSaveList(user._id);
      setCollection(resp.data.saveList);
      setRemove(false);
    };
    if (user) {
      getCollection();
      const allRefs = Array(collection.length)
        .fill()
        .map((_, i) => createRef());
      setRefs(allRefs);
      console.log(refs);
    }
  }, [remove]);

  const defaultProps = {
    options: collection,
    getOptionLabel: (option) => option.name,
  };

  return (
    <Page>
      {user && (
        <>
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
            <div className={classes.buttons}>
              <Button text="COLLECTS" to="/space/collection" />
              <Button text="POSTS" to="/space/posts" />
            </div>
            {isCollection && (
              <>
                {collection.length > 0 ? (
                  <>
                    <div className={classes.filter}>
                      <SearchIcon className={classes.searchIcon} />
                      <Autocomplete
                        {...defaultProps}
                        onChange={(event, newValue) =>
                          setSelect(newValue?.location_id)
                        }
                        id="blur-on-select"
                        blurOnSelect
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search Location"
                            variant="standard"
                          />
                        )}
                        fullWidth
                      />
                    </div>
                    <div className={classes.collection}>
                      {collection.map((item, i) => (
                        <CollectionCard
                          key={+item.location_id}
                          item={item}
                          onRemove={removeItem}
                          refProp={refs[i]}
                          selected={+select === +item.location_id}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Cannot find any saved location</p>
                )}
              </>
            )}
          </section>
        </>
      )}
    </Page>
  );
};

export default Space;
