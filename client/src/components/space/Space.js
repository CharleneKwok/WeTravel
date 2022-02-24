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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Space = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [collection, setCollection] = useState([]);
  const [remove, setRemove] = useState(false);
  const location = useLocation();
  const isCollection = location.pathname.includes("collection");
  const history = useHistory();
  const [select, setSelect] = useState("");
  const [refs, setRefs] = useState([]);
  const currYear = new Date().getFullYear();
  const [year, setYear] = useState(currYear);
  const [allYears, setAllYears] = useState([]);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      history.push("/login");
    }
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
    if (user) {
      getCollection();
      setRemove(false);
    }
  }, [remove, year]);

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
            )}
          </section>
        </>
      )}
    </Page>
  );
};

export default Space;
