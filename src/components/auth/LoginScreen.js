import './login.css'
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

  const dispatch = useDispatch();


  const [ formLoginValues, handleLoginInputChange ] = useForm({
    loginEmail: 'Pablito12@gamil.com',
    loginPassword: '1a23456'
  });

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    registerName: 'Damian',
    registerEmail: 'damian@gamil.com',
    registerPasswordOne: '1234567',
    registerPasswordTwo: '1234567',
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const { registerName, registerEmail, registerPasswordOne, registerPasswordTwo } = formRegisterValues;


  // manejador de evento de login
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(loginEmail, loginPassword));
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if( registerPasswordOne !== registerPasswordTwo) {
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    }

    // if( registerPasswordOne < 6) {
    //   return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    // }

    // console.log('!');
    dispatch( startRegister(registerEmail, registerPasswordOne, registerName) );
  }



  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Inicio de sesión</h3>
          <form onSubmit={ handleLogin }>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                name='loginEmail'
                value={ loginEmail }
                onChange={ handleLoginInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={ loginPassword }
                onChange={ handleLoginInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ handleRegister }>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={ registerName }
                onChange={ handleRegisterInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={ registerEmail }
                onChange={ handleRegisterInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPasswordOne"
                value={ registerPasswordOne }
                onChange={ handleRegisterInputChange }
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPasswordTwo"
                value={ registerPasswordTwo }
                onChange={ handleRegisterInputChange }
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
