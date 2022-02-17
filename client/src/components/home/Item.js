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

const ShowInfo = ({ info }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className={classes["image-container"]}>
        <img
          src={
            info.photo?.images.original.url ||
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          }
          alt="location"
        />
      </div>
      <article className={classes.info}>
        <h2>{info.name}</h2>
        {info?.rating && (
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
            <p>{info.rating}</p>
          </div>
        )}
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

const Item = ({ info, refProps, selected }) => {
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
          <ShowInfo info={info} />
        </div>
      ) : (
        <div className={classes.container} data-aos="zoom-in" ref={refProps}>
          <ShowInfo info={info} />
        </div>
      )}
    </>
  );
};

export default Item;
