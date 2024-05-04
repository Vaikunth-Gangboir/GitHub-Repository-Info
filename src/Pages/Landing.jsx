// React Router
import { useNavigate } from 'react-router-dom';

// Context
import { useOctokitContext } from '../Context/OctokitContext';

// State
import { useState } from 'react';

// Assets
import GitIMG from '../assets/github-mark.svg';

function Landing() {
  const [username, setUsername] = useState('');
  const { BASEURL, setUserData, octokit } = useOctokitContext();
  const navigate = useNavigate();

  async function getUser() {
    try {
      const res = await octokit.request(`GET ${BASEURL}/users/{userN}`, {
        userN: `${username}`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      setUserData(res.data);
      navigate('/repos');
    } catch (err) {
      alert('User Not Found');
      setUsername('');
    }
  }

  return (
    <div className="grid h-screen min-h-full w-screen place-items-center">
      <div className="flex flex-col items-center rounded-xl border-2 border-gray-400 px-12 py-12 shadow-md">
        <img src={GitIMG} className=" mb-3 w-[30%]" alt="Company Logo" />
        <h1 className="mb-6  text-3xl font-bold">GitHub Repository Info</h1>
        <form
          className="w-full text-center"
          onSubmit={(e) => {
            e.preventDefault();
            getUser();
          }}
        >
          <div className="mb-3 flex max-w-sm flex-col gap-2  text-lg">
            <label htmlFor="userId" className="font-semibold">
              Enter Github Username
            </label>
            <input
              type="text"
              id="userId"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inline-block w-full max-w-md  rounded-lg border-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#29903B] px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Repository Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
