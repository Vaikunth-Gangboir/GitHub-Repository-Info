// React Router
import { useParams } from 'react-router-dom';

// Context
import { useOctokitContext } from './OctokitContext';

// Context and State
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

function DataProvider({ children }) {
  const { name } = useParams();
  const { userData, octokit, BASEURL } = useOctokitContext();

  const [contents, setContents] = useState([]);
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function getRepoDetails(path = '') {
    try {
      setIsLoading((isLoading) => !isLoading);
      setError('');
      const res = await octokit.request(
        `GET ${BASEURL}/repos/{owner}/{repo}/contents/{path}`,
        {
          owner: userData.login,
          repo: name,
          path: path,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );
      setContents(res.data);
      getCommits();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading((isLoading) => !isLoading);
    }
  }

  async function getCommits() {
    try {
      const res = await octokit.request(
        `GET ${BASEURL}/repos/{owner}/{repo}/commits`,
        {
          owner: userData.login,
          repo: name,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );
      setCommits(res.data);
    } catch (err) {
      alert('Something went wrong with fetching Repositories');
    }
  }

  return (
    <DataContext.Provider
      value={{
        isLoading,
        error,
        contents,
        commits,
        getRepoDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error('useDataContext must be used within a DataProvider');
  return context;
};

export { DataProvider, useDataContext };
