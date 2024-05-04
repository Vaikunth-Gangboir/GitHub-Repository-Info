import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import Content from './Content';

import { useDataContext } from '../Context/DataContext';
import { useOctokitContext } from '../Context/OctokitContext';

function RepositoryDetail() {
  const { isLoading, error, contents, commits, getRepoDetails } =
    useDataContext();
  const { name } = useParams();
  const { userData } = useOctokitContext();

  const pathArr = useRef([]);

  useEffect(() => {
    getRepoDetails();
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Header />
      {isLoading && (
        <p className="mt-24 text-center text-xl font-bold text-red-500">
          isLoading...
        </p>
      )}

      <div className="grid grid-cols-1 px-8 pt-4 ">
        {!isLoading && !error && contents.length > 0 && (
          <ul className="rounded-lg border-[1px] border-gray-300">
            <li className="grid grid-cols-2 items-center  border-b-[1px]  border-gray-200 bg-gray-100 p-4">
              <div className="flex items-center gap-2">
                <img
                  src={userData.avatar_url}
                  alt="User Image"
                  className=" h-12 w-12 rounded-full"
                />
                <p className="text-lg font-bold">
                  {userData.login}/{name}
                </p>
              </div>
              <Link
                to={`/repos/history/${name}`}
                className="justify-self-end rounded-full border-2 border-gray-300 px-3 py-1 text-base font-semibold"
              >
                History
              </Link>
            </li>
            {pathArr.current.length > 0 && (
              <li
                className="border-b-[1px] border-gray-300 p-4"
                onClick={() => {
                  getRepoDetails(
                    pathArr.current[pathArr.current.length - 2],
                  ).then(() => {
                    pathArr.current.pop();
                  });
                }}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="select-none, text-[rgb(132, 141, 151)] inline-block overflow-visible align-text-bottom"
                  >
                    <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
                  </svg>
                  <p className="text-lg font-medium">...</p>
                </div>
              </li>
            )}
            {contents.map((item, i) => (
              <Content
                item={item}
                commits={commits[i]}
                key={item.sha}
                getRepoDetails={getRepoDetails}
                pathArr={pathArr}
              />
            ))}
          </ul>
        )}
      </div>

      {!isLoading && error && (
        <p className="mt-24 text-center text-xl font-bold text-red-500">
          😢 No Content Found in this Repository !!!
        </p>
      )}
    </div>
  );
}

export default RepositoryDetail;
