import { useEffect } from 'react';
import Header from './Header';
import Repo from './Repo';
import { useUserContext } from '../Context/UserContext';

function RepositoryList() {
  const { getRepoList, repos, isLoading, error } = useUserContext();

  useEffect(() => {
    getRepoList();
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <Header />
      {isLoading && (
        <p className="mt-24 text-center text-xl font-bold text-red-500">
          Loading...
        </p>
      )}
      <ul className="mt-6 grid grid-cols-3 gap-4 border-gray-300 px-8">
        {!isLoading &&
          !error &&
          repos.length > 0 &&
          repos.map((repo) => <Repo repo={repo} key={repo.id} />)}
      </ul>
      {!isLoading && error && (
        <p className="mt-24 text-center text-xl font-bold text-red-500">
          😢 No Repository Found in this Account !!!{error}
        </p>
      )}
    </div>
  );
}

export default RepositoryList;
