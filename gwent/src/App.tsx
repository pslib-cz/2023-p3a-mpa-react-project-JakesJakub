import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage';
import BoardPage from './pages/BoardPage';
import TutorialPage from './pages/TutorialPage';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<MenuPage />} />,
      <Route path="/board" element={<BoardPage />} />,
      <Route path="/menu" element={<MenuPage />} />,
      <Route path="/tutorial" element={<TutorialPage />} />,
    ]),
    {basename: "/2023-p3a-mpa-react-project-JakesJakub/"}
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;