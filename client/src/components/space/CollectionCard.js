import { SvgIcon } from "@mui/material";
import React, { useEffect } from "react";
import classes from "./CollectionCard.module.scss";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Aos from "aos";
import "aos/dist/aos.css";

const CollectionCard = ({ item, onRemove, refProp, selected }) => {
  if (selected) {
    console.log("🚀 ~ refProp", refProp);
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  const removeItem = async () => {
    onRemove(item.location_id);
  };

  return (
    <div ref={refProp} className={classes.container} data-aos="flip-left">
      <img src={item.image} alt={"save item"} />
      <article>
        <h2>{item.name}</h2>
        <div className={classes.address}>
          <SvgIcon color="disabled" className={classes.svg}>
            <FmdGoodIcon />
          </SvgIcon>
          <p>{item.address}</p>
        </div>
        <p> Created At: {item.createdAt}</p>
        <div className={classes.btns}>
          <a href={item.tripAdvisor} target="_blank" rel="noopener noreferrer">
            Trip Advisor
          </a>
          <button onClick={removeItem}>Remove</button>
        </div>
      </article>
    </div>
  );
};

export default CollectionCard;
