import PropTypes from "prop-types";
import React from "react";

export function AreaSubTitleProdutos({ title1, title2, title3, title4, title5, title6 }) {
    const size = "ml-[4.5vw] flex justify-center";
  return (
    <div className="h-[8vh] w-[83vw] flex flex-row justify-start items-end text-[#3A577B] text-[17px] pl-[6vw]">
      <h2 className={size}>{title1}</h2>
      <h2 className={size}>{title2}</h2>
      <h2 className={size}>{title3}</h2>
      <h2 className={size}>{title4}</h2>
      <h2 className={size}>{title5}</h2>
      <h2 className={size}>{title6}</h2>
    </div>
  );
}

AreaSubTitleProdutos.propTypes = {
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  title3: PropTypes.string.isRequired,
  title4: PropTypes.string.isRequired,
  title5: PropTypes.string.isRequired,
  title6: PropTypes.string.isRequired,
};
