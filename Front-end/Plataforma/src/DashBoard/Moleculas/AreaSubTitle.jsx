import PropTypes from 'prop-types';


export function AreaSubTitle({ titles = [] }) {
  return (
    <div className="w-[75vw] flex flex-row justify-around items-end text-[#3A577B] text-[17px]">
      {titles.map((title, index) => (
        <h2 key={index}>{title}</h2>
      ))}
    </div>
  );

}

AreaSubTitle.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
