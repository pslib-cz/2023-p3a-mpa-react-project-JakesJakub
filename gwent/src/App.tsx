import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage';
import BoardPage from './pages/BoardPage';


function App() {

  const router = createHashRouter(
    createRoutesFromElements([
      <Route path="/" element={<MenuPage />} />,
      <Route path="/board" element={<BoardPage />} />,
    ]),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;