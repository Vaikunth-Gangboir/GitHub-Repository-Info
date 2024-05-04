// Context and State
import { createContext, useContext, useState } from 'react';

// Context
import { useOctokitContext } from './OctokitContext';

const UserContext = createContext();

function UserProvider({ children }) {
  const { BASEURL, userData, octokit } = useOctokitContext();

  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState();

  async function getRepoList() {
    try {
      setIsLoading((isLoading) => !isLoading);
      setError('');
      const res = await octokit.request(
        `GET ${BASEURL}/users/{username}/repos`,
        {
          username: userData.login,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );
      setRepos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading((isLoading) => !isLoading);
    }
  }

  return (
    <UserContext.Provider
      value={{
        repos,
        isLoading,
        setIsLoading,
        getRepoList,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('useUserContext must be used within a UserProvider');
  return context;
};

export { UserProvider, useUserContext };
