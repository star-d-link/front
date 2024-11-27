import PropTypes from "prop-types";

const StudyCard = ({ study, onClick, className }) => {
  return (
      <div onClick={onClick}
           className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
                className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full">
              {study.username.charAt(0).toUpperCase()}
            </div>
            <p className="text-gray-700 font-medium">{study.username}</p>
          </div>
          <div className="text-gray-500">❤️ {study.likesCount}</div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{study.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{study.content.length > 100
            ? `${study.content.substring(0, 100)}...` : study.content}</p>
        <div className="flex flex-wrap gap-2">
          {study.hashTag.split(' ').map((tag, index) => (
              <span key={index}
                    className="text-sm text-white bg-gray-700 rounded-full px-3 py-1">
            {tag}
          </span>
          ))}
        </div>
      </div>
  );
};

// PropTypes 정의
StudyCard.propTypes = {
  study: PropTypes.shape({
    username: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    hashTag: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default StudyCard;
