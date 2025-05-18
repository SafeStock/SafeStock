import PropTypes from 'prop-types';
import React from 'react';

export function AreaSubTitle({ title1, title2, title3, title4, title5 }) {
    const sizu = "ml-[3vw]";
    const size = "ml-[9.5vw]";
    return (

        <div className="h-[8vh] w-[40vw] flex flex-row justify-center items-end text-[#3A577B] text-[17px]  mr-[7.5vw]">
            <h2 className= {sizu}>{title1}</h2>
            <h2 className= {size}>{title2}</h2>
            <h2 className= {size}>{title3}</h2>
            <h2 className= {size}>{title4}</h2>
            <h2 className= {size}>{title5}</h2>
        </div>
    );
}

AreaSubTitle.propTypes = {
    title1: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    title3: PropTypes.string.isRequired,
    title4: PropTypes.string.isRequired,
    title5: PropTypes.string.isRequired,
};


