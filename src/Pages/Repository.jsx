// React Router
import { Outlet } from 'react-router-dom';

// Context
import { UserProvider } from '../Context/UserContext';
import { DataProvider } from '../Context/DataContext';

function Repository() {
  return (
    <>
      <UserProvider>
        <DataProvider>
          <Outlet />
        </DataProvider>
      </UserProvider>
    </>
  );
}

export default Repository;
