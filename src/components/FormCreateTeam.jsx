import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Navigate } from "react-router-dom";
import { createTeamService } from "../services/team.services";
import { Alert, Button, Form } from "react-bootstrap";

function FormCreateTeam() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [teamName, setTeamName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

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

  const handleClose = () => setShow(false);
  const hnadleShow = () => {
    errorMessage !== "" ? setShow(true) : setShow(false);
  };

  return isLoggedIn ? (
    <div className="d-flex justify-content-center pt-0 p-5">
      <div className="row text-center pe-5 ps-5">
        <section>
          <img
            className="big-logo-image"
            src="https://res.cloudinary.com/dn3vdudid/image/upload/v1680987620/FutAliner/CREAR-EQUIPO-YELLOW_bdojwn.png"
            alt="Crear un Equipo"
          />
        </section>
        <section className="ps-5 pe-5">
          <div className="ps-1 pe-1">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="teamName"
                  value={teamName}
                  placeholder="Introduce un nombre de equipo"
                  onChange={handleTeamNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password1"
                  value={password1}
                  placeholder="Introduce una contraseña"
                  onChange={handlePassword1Change}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password2"
                  value={password2}
                  placeholder="Repite la contraseña"
                  onChange={handlePassword2Change}
                />
                <Form.Text className="text-muted">
                  El password debe tener al menos 6 caracteres, incluir una
                  mayuscula y un caracter especial
                </Form.Text>
              </Form.Group>
              <div>
                {show ? (
                  <Alert variant="danger" onClose={handleClose} dismissible>
                    <Alert.Heading>Ooops...</Alert.Heading>
                    <p>{errorMessage}</p>
                  </Alert>
                ) : null}
              </div>
              <Button
                variant="warning"
                size="lg"
                type="submit"
                value="Registrar"
                onClick={hnadleShow}
              >
                <img
                  src="https://res.cloudinary.com/dn3vdudid/image/upload/v1681221359/FutAliner/REGISTRAR-EQUIPO-GREEN_gg6bl7.png"
                  alt="Registrar"
                  width={120}
                />
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>
      <Navigate to={"/login"}></Navigate>
    </div>
  );
}

export default FormCreateTeam;
