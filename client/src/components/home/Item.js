import React, { useEffect, useState } from "react";
import classes from "./Item.module.scss";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SvgIcon from "@mui/material/SvgIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PhoneIcon from "@mui/icons-material/Phone";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Aos from "aos";
import "aos/dist/aos.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { addToSaveList, deleteItemOnList } from "../../api/feature-api";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ShowInfo = ({ info, type }) => {
  const [showMore, setShowMore] = useState(false);
  const [save, setSave] = useState(info.saveToList);
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("profile");

  const addItemHandler = async () => {
    setOpen(true);
    setSave((prev) => !prev);
    try {
      if (!save) {
        const data = {
          location_id: info.location_id,
          name: info.name,
          address: info.address || info.location_string,
          tripAdvisor: info.web_url || "",
          image: info.image,
          location_type: type,
        };
        await addToSaveList(data);
      } else {
        await deleteItemOnList(info.location_id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className={classes["image-container"]}>
        <img src={info.image} alt="location" />
      </div>
      <article className={classes.info}>
        {user && (
          <>
            <div
              className={classes.bookmark}
              title="Save this location"
              onClick={addItemHandler}
            >
              {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </div>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              message={save ? "🎊 Location saved" : "👋 Removed"}
              action={action}
            />
          </>
        )}
        <h2>{info.name}</h2>
        <div className={classes.rating}>
          <Stack spacing={1} className={classes.star}>
            <Rating
              name="half-rating-read"
              defaultValue={0}
              value={info?.rating ? +info.rating : 0}
              precision={0.5}
              readOnly
            />
          </Stack>
          <p>{info.rating || "No Rating"}</p>
        </div>
        <div className={classes.address}>
          <SvgIcon color="disabled" className={classes.svg}>
            <FmdGoodIcon />
          </SvgIcon>
          <p>{info.address || info.location_string}</p>
        </div>
        <p className={classes.price}>{info.price || info.price_level}</p>
      </article>
      {/* more details */}
      <article
        className={showMore ? classes["more-details"] : classes["hide-details"]}
      >
        {info?.cuisine && (
          <div className={classes["cuisine-list"]}>
            {info.cuisine?.map((item, i) => (
              <button
                key={`cuisine_${item.location_id}_${i}`}
                className={classes.cuisine}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
        {info?.ranking && <p>{info.ranking}</p>}
        {info?.phone && (
          <div className={classes.middle}>
            <SvgIcon color="disabled" className={classes.svg}>
              <PhoneIcon />
            </SvgIcon>
            <p>{info.phone}</p>
          </div>
        )}
        {info?.awards.map((award, i) => (
          <div
            key={`award_${info.location_id}_${i}`}
            className={classes.middle}
          >
            <SvgIcon color="disabled" className={classes.svg}>
              <MilitaryTechIcon />
            </SvgIcon>
            <p>{award.display_name}</p>
          </div>
        ))}
        {info.web_url && (
          <a
            href={info.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btn}
          >
            Trip Advisor
          </a>
        )}
        {info.website && (
          <a
            href={info.website}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btn}
          >
            Website
          </a>
        )}
        {info.write_review && (
          <a
            href={info.write_review}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.btn}
          >
            Write Review
          </a>
        )}
      </article>
      <div
        className={classes["down-arrow"]}
        onClick={() => setShowMore((prev) => !prev)}
      >
        <SvgIcon
          titleAccess="show more details"
          className={classes["down-arrow__svg"]}
        >
          <KeyboardArrowDownIcon />
        </SvgIcon>
      </div>
    </>
  );
};

const Item = ({ info, refProps, selected, type }) => {
  const innerWidth = window.innerWidth;

  if (selected) {
    refProps?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <>
      {innerWidth > 1300 ? (
        <div className={classes.container} ref={refProps}>
          <ShowInfo info={info} type={type} />
        </div>
      ) : (
        <div className={classes.container} data-aos="zoom-in" ref={refProps}>
          <ShowInfo info={info} type={type} />
        </div>
      )}
    </>
  );
};

export default Item;
