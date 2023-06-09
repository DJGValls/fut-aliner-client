import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormCreateTeam from "./components/FormCreateTeam";
import FormCreateUser from "./components/FormCreateUser";

import NavBar from "./components/NavBar";
import Login from "./pages/auth/Login";
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Home from "./pages/Home";
import FormJoinTeam from "./components/FormJoinTeam";
import UserProfile from "./pages/UserProfile";
import TeamProfile from "./pages/TeamProfile";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<UserProfile />}></Route>
        <Route path="/user/create-user" element={<FormCreateUser />}></Route>
        <Route path="/team/create-team" element={<FormCreateTeam />}></Route>
        <Route path="/team/join-team" element={<FormJoinTeam />}></Route>
        <Route path="/team/:playerId/team" element={<TeamProfile />}></Route>

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
