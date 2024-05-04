// React Router
import { useParams } from 'react-router-dom';

// Context
import { useDataContext } from '../Context/DataContext';

// Components
import Header from '../Components/Header';

function History() {
  const { name } = useParams();
  const { commits } = useDataContext();

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <Header />
      <div className="px-8 pt-4">
        <ul className="rounded-lg border-[1px] border-gray-300 ">
          <li className="grid grid-cols-2 items-center  border-b-[1px]  border-gray-200 bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">{name}/Commits</p>
            </div>
            <p className="justify-self-end text-xl font-bold">History</p>
          </li>

          {commits.length > 0 &&
            commits.map((commit, i) => (
              <li
                key={commit.sha}
                className="grid grid-cols-[auto_1fr] gap-4  border-b-[1px]  border-gray-200 p-4"
              >
                <div className="text-lg font-semibold">{i + 1}.</div>
                <div>
                  <p className="text-lg font-semibold">
                    {commit.commit.message}
                  </p>
                  <p className="">
                    {commit.commit.author.name} Commited{' '}
                    {commit.commit.author.date.slice(0, 10)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
