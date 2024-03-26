import { useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type Props = {}

function Register({ }: Props) {
  const navigate = useNavigate();
 
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    userRegisterStatus,
  }: any = useContext(AuthContext);

  useEffect(() => {
    if (userRegisterStatus === true) {
      navigate('/login');
    }
  }, [userRegisterStatus]);
  
  return (
    <div className="wrapper vh-100">
      <div className="row align-items-center h-100">
        <form onSubmit={registerUser} className="col-lg-6 col-md-8 col-10 mx-auto">
          <div className="mx-auto text-center my-4">
            <a
              className="navbar-brand mx-auto mt-2 flex-fill text-center"
              href="./index.html"
            >
              <svg
                version="1.1"
                id="logo"
                className="navbar-brand-img brand-md"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 120 120"
                xmlSpace="preserve"
              >
                <g>
                  <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                  <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                  <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                </g>
              </svg>
            </a>
            <h2 className="my-3">Register</h2>
          </div>
          {registerError && <div className="alert alert-warning" role="alert">
            <span className="fe fe-alert-triangle fe-16 mr-2" />{registerError.message}{" "}
          </div>}
          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4"
              onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" className="form-control"
                onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="inputPassword5">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword5"
                  name="newPassword"
                  onChange={(e)=> updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword6">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword6"
                  name="confirmPassword"
                  onChange={(e)=> updateRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <p className="mb-2">Password requirements</p>
              <p className="small text-muted mb-2">
                {" "}
                To create a new password, you have to meet all of the following
                requirements:{" "}
              </p>
              <ul className="small text-muted pl-4 mb-0">
                <li> Minimum 8 character </li>
                <li>At least one special character</li>
                <li>At least one number</li>
                <li>Can’t be the same as a previous password </li>
              </ul>
            </div>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign up
          </button>
          <div className="m-3 text-center">
            <Link to='/login'><p className="mb-3">Already have an account ? Sign in</p></Link></div>
          <p className="mt-5 mb-3 text-muted text-center">© 2020</p>
        </form>
      </div>
    </div>
  )
}

export default Register