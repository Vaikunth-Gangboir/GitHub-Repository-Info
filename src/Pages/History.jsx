import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { useOctokitContext } from '../Context/OctokitContext';
import { useEffect, useState } from 'react';

function History() {
  const { userData, BASEURL, octokit } = useOctokitContext();
  const { name } = useParams();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
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

    getCommits();
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <Header />
      <div className="px-8 pt-4">
        <ul className="rounded-lg border-[1px] border-gray-300 ">
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
          </li>

          {commits.length > 0 &&
            commits.map((commit, i) => (
              <li
                key={commit.sha}
                className=" flex items-center gap-2  border-b-[1px]  border-gray-200 p-4"
              >
                <div className="text-lg font-bold">{i + 1}.</div>
                <p className="text-lg font-bold">{commit.commit.message}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
