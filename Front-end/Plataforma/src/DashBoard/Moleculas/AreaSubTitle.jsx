import PropTypes from 'prop-types';


export function AreaSubTitle({ titles = [] }) {
  return (
    <div className="ml-[8vw] w-[60vw] flex flex-row items-end text-[#3A577B] text-[17px]">
      {titles.map((title, index) => (
      <div className="w-[25%] h-full text-center" key={index}>
        <h2 key={index}>{title}</h2>
      </div>
      ))}
    </div>
  );

}

AreaSubTitle.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
