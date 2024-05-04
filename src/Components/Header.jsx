import { useNavigate } from 'react-router-dom';
import { useOctokitContext } from '../Context/OctokitContext';
import LogoIMG from '../assets/GitHub_Logo.png';

function Header() {
  const navigate = useNavigate();
  const { userData } = useOctokitContext();

  return (
    <header className="sticky left-0 right-0 top-0 mb-4 flex items-center justify-between gap-4 border-b-[1px] px-6 py-3 backdrop-blur-md">
      <img src={LogoIMG} className="h-10" />
      <div className="ml-auto flex items-center gap-2 ">
        <img
          src={userData.avatar_url}
          alt="User Image"
          className=" h-12 w-12 rounded-full"
        />
        <p className="text-lg font-bold">{userData.login}</p>
      </div>
      <button
        className="rounded-full border-[2px] border-[#29903B] px-4 py-1 font-semibold transition-all hover:bg-[#29903B] hover:text-white"
        onClick={() => navigate('/')}
      >
        Exit
      </button>
    </header>
  );
}

export default Header;
