import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from '../../service/Api'
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function Enviar(e){
    e.preventDefault()
    let usuarioLogado = {
      email: email,
      senha: password
    }
    Api.post('/Usuario', usuarioLogado)
    .then((res) => {
      navigate(`/inicio?cliente=${res.data[0].usu_id}`);
    })
    .catch((res) => alert(res.response.data));
  }
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={Enviar}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;