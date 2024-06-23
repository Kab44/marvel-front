import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// COMPONENTS
import Toolbar from "./components/toolbar.component";

// PAGES
import Home from "./pages/homepage/home.page";
import Characters from "./pages/characters/characters.page";
import Comics from "./pages/comics/comics.page";
import CharComics from "./pages/characters/characterInComics.page";

function App() {
  const ROUTES = [
    {
      name: "home",
      path: "/",
      page: <Home />,
    },
    {
      name: "characters",
      path: "/characters",
      page: <Characters />,
    },
    {
      name: "comics",
      path: "/comics",
      page: <Comics />,
    },
    {
      name: "comic",
      path: "/comics/:characterId",
      page: <CharComics />,
    },
  ];
  return (
    <Router>
      <Toolbar nav={ROUTES} />
      <Routes>
        {ROUTES.map((route, index) => (
          <Route key={index} path={route.path} element={route.page} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
