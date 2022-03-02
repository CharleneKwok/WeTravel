import React, { useEffect, useState } from "react";
import classes from "./Appearance.module.scss";
import MapSelection from "./MapSelection";
import { useDispatch, useSelector } from "react-redux";

const Appearance = () => {
  const userData = JSON.parse(localStorage.getItem("profile"));
  const checkUserUpdate = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(userData || {});
  const mapList = [
    "Light Dream",
    "Muti Brand Network",
    "Becomeadinosaur",
    "Unsaturated Browns",
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [checkUserUpdate]);

  return (
    <div className={classes.container}>
      <h2>Map Appearance</h2>
      <section className={classes.maps}>
        {mapList.map((map, i) => (
          <MapSelection
            text={map}
            idx={i}
            isSelected={user.mapAppearance === map.replace(/\s/g, "")}
            key={`map_${i}`}
          />
        ))}
      </section>
    </div>
  );
};

export default Appearance;
