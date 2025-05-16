import PropTypes from 'prop-types';
import React from 'react';

export function AreaSubTitle({ title1, title2, title3, title4, title5 }) {
    return (

        <div className="h-[8vh] w-[40vw] flex flex-row justify-center items-end text-[#3A577B] text-[17px]  mr-[7.5vw]">
            <h2>{title1}</h2>
            <h2 className="ml-[7.5vw]">{title2}</h2>
            <h2 className="ml-[7.5vw]">{title3}</h2>
            <h2 className="ml-[7.5vw]">{title4}</h2>
            <h2 className="ml-[7.5vw]">{title5}</h2>
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


