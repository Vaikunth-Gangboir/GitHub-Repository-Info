import { Link } from 'react-router-dom';

function Repo({ repo }) {
  const { name, description, visibility, language, stargazers_count } = repo;

  const colors = {
    HTML: '#E34C26',
    JavaScript: '#F1E05A',
    C: '#555555',
    Cpp: '#f34b7d',
    CSharp: '#178600',
    Go: '#00ADD8',
    Java: '#B07219',
    Kotlin: '#A97BFF',
    Python: '#3572A5',
    R: '#701516',
    Swift: '#FFAC45',
    TypeScript: '#2B7489',
    CSS: '#563D7C',
  };

  return (
    <li className="rounded-xl border-[1px]  border-gray-300 px-10 py-8">
      <div className="mb-3 flex items-center justify-between">
        <Link to={`${name}`}>
          <h2 className="text-2xl font-bold text-blue-500">{name}</h2>
        </Link>
        <p className="rounded-full border-[1px] px-3 font-semibold leading-7">
          {visibility[0].toUpperCase() + visibility.slice(1)}
        </p>
      </div>
      <p className="mb-3 text-gray-700">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-500">
          <div
            className={`h-3 w-3 rounded-full`}
            style={{ backgroundColor: colors[language] }}
          ></div>
          {language}
        </div>
        <div className="mr-2 flex items-center gap-1 font-bold">
          <svg
            aria-label="stars"
            role="img"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="18"
            data-view-component="true"
            className=" stroke-[#333]"
          >
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
          </svg>
          {stargazers_count}
        </div>
      </div>
    </li>
  );
}

export default Repo;
