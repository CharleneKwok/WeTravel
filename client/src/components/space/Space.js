import React, { createRef, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
  changeBio,
  deleteItemOnList,
  getSaveList,
} from "../../api/feature-api";
import Avatar from "../header/Avatar";
import Button from "../UI/Button";
import Page from "../UI/Page";
import CollectionCard from "./CollectionCard";
import classes from "./Space.module.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import AllPosts from "../explore/AllPosts";

const Space = () => {
  const checkUserUpdate = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [collection, setCollection] = useState([]);
  const [remove, setRemove] = useState(false);
  const location = useLocation();
  const isCollection = location.pathname.includes("collection");
  const [select, setSelect] = useState("");
  const [refs, setRefs] = useState([]);
  const currYear = new Date().getFullYear();
  const [year, setYear] = useState(currYear);
  const [allYears, setAllYears] = useState([]);
  const [bio, setBio] = useState(user?.bio);
  const [showInput, setShowInput] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [checkUserUpdate]);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    let newYears = [];
    for (let y = currYear; y >= 2018; y--) {
      newYears.push(y);
    }
    setAllYears(newYears);
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
    const allRefs = Array(collection.length)
      .fill()
      .map((_, i) => createRef());
    setRefs(allRefs);
  }, [collection]);

  useEffect(() => {
    const getCollection = async () => {
      const resp = await getSaveList(user._id);
      const filterCollects = resp.data.saveList.filter(
        (item) => +item.createdAt.split("-")[0] === +year
      );
      setCollection(filterCollects);
    };
    try {
      if (user) {
        getCollection();
        setRemove(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [remove, year]);

  const defaultProps = {
    options: collection,
    getOptionLabel: (option) => option.name,
  };

  const changeBioHandler = async () => {
    try {
      await changeBio({ bio: bio });
      dispatch(authActions.changeBio({ bio: bio }));
      setShowInput(false);
      console.log("change");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page isDarkMode={true}>
      {localStorage.getItem("profile") ? (
        <>
          <div className={classes["space-image"]}>
            <div className={classes["user_info"]}>
              <Avatar className={classes["user_info--avatar"]} />
              <h2>{user.username}</h2>
              <div className={classes["user_info--follow"]}>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
              </div>
              <div className={classes["user_info--bio"]}>
                bio:
                {/* {!showInput && (
                  <p
                    onClick={() => setShowInput(true)}
                    title="Click to change your bio"
                  >
                    {bio}
                  </p>
                )}
                {(showInput || !user.bio) && ( */}
                {/* )} */}
                <textarea
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={changeBioHandler}
                  maxLength="80"
                  placeholder="Please enter your bio.."
                />
              </div>
            </div>
          </div>
          <section>
            <div className={classes.buttons}>
              <Button text="COLLECTS" to="/space/collection" />
              <Button text="POSTS" to="/space/posts" />
            </div>
            {isCollection ? (
              <>
                <div className={classes.filter}>
                  <div className={classes.search}>
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
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={year}
                      onChange={handleChange}
                      autoWidth
                      label="year"
                    >
                      {allYears?.map((year, i) => (
                        <MenuItem value={year} key={`year_${i}`}>
                          <em>{year}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {collection.length > 0 ? (
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
                ) : (
                  <p>Cannot find any saved location</p>
                )}
              </>
            ) : (
              <AllPosts
                className={classes.posts}
                setPosts={setPosts}
                posts={posts}
                isUserPosts={true}
                userId={user._id}
              />
            )}
          </section>
        </>
      ) : (
        <Redirect to={"/login"} />
      )}
    </Page>
  );
};

export default Space;
