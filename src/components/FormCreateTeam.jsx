import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Navigate } from "react-router-dom";
import { createTeamService } from "../services/team.services";

function FormCreateTeam() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [teamName, setTeamName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handlePassword1Change = (e) => setPassword1(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeam = {
      teamName,
      password1,
      password2,
    };
    try {
      await createTeamService(newTeam);
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return isLoggedIn ? (
    <div>
      <h1>FormCreateTeam</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="teamName"
              value={teamName}
              placeholder="Introduzca un nombre de equipo"
              onChange={handleTeamNameChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password1"
              value={password1}
              placeholder="Introduzca una contraseña"
              onChange={handlePassword1Change}
            />
          </div>
          <div>
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="Repita la contraseña"
              onChange={handlePassword2Change}
            />
          </div>
          <div>
            {errorMessage !== "" ? (
              <p class="date-of-birth-text">{errorMessage}</p>
            ) : null}
          </div>
          <div>
            <input type="submit" value="Registrar Equipo" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>
      <Navigate to="/login"></Navigate>
    </div>
  );
}

export default FormCreateTeam;
