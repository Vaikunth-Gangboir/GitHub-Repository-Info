import { useNavigate } from "react-router-dom";
import GitIMG from "../assets/github-mark.svg";
import { useState } from "react";
import { useOctokitContext } from "../Context/OctokitContext";

function Landing() {
  const [username, setUsername] = useState("");
  const { BASEURL, setUserData, octokit } = useOctokitContext();
  const navigate = useNavigate();

  async function getUser() {
    try {
      const res = await octokit.request(`GET ${BASEURL}/users/{userN}`, {
        userN: `${username}`,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      setUserData(res.data);
      navigate("/repos");
    } catch (err) {
      alert("User Not Found");
      setUsername("");
    }
  }

  return (
    <div className="grid min-h-full place-items-center w-screen h-screen">
      <div className="w-[30%] flex flex-col items-center rounded-xl border-2 border-gray-400 py-12 shadow-md">
        <img src={GitIMG} className=" w-[30%] mb-3" alt="Company Logo" />
        <h1 className="text-3xl font-bold mb-6">GitHub Repository Info</h1>
        <form
          className="text-center self-stretch px-12"
          onSubmit={(e) => {
            e.preventDefault();
            getUser();
          }}
        >
          <div className="text-lg flex flex-col gap-2 mb-3">
            <label htmlFor="userId" className="font-semibold">
              Enter Github Username
            </label>
            <input
              type="text"
              id="userId"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full  border-2 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#29903B] text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Repository Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
