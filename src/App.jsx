import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import Landing from './Pages/Landing';
import Repository from './Pages/Repository';
import History from './Pages/History';
import ProtectedRoute from './ProtecredRoute/ProtectedRoute';
import RepositoryList from './Components/RepositoryList';
import RepositoryDetail from './Components/RepositoryDetail';
import { OctokitProvider } from './Context/OctokitContext';

function App() {
  return (
    <BrowserRouter>
      <OctokitProvider>
        <Routes>
          <Route index element={<Landing />} />

          <Route
            path="repos"
            element={
              <ProtectedRoute>
                <Repository />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="list" />} />
            <Route path="list" element={<RepositoryList />} />
            <Route path="list/:name" element={<RepositoryDetail />} />
            <Route path="history/:name" element={<History />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </OctokitProvider>
    </BrowserRouter>
  );
}

export default App;
