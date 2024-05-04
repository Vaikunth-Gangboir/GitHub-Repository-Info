import { Octokit } from 'octokit';
import { createContext, useContext } from 'react';
import { useState } from 'react';

const OctokitContext = createContext('');

function OctokitProvider({ children }) {
  const [userData, setUserData] = useState({});

  const octokit = new Octokit({});
  const BASEURL = 'https://api.github.com';

  return (
    <OctokitContext.Provider
      value={{ userData, setUserData, octokit, BASEURL }}
    >
      {children}
    </OctokitContext.Provider>
  );
}

const useOctokitContext = function () {
  const context = useContext(OctokitContext);
  if (context === undefined) {
    throw new Error('useOctokitContext must be used within an OctokitProvider');
  }
  return context;
};

export { OctokitProvider, useOctokitContext };
