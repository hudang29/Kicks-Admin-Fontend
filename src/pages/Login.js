import logo from "../assets/KICKS.png";
import {Link, useNavigate} from "react-router-dom";
import LoginVM from "../viewmodels/LoginVM";
import {useEffect, useState} from "react";

function Login() {
    const navigate = useNavigate();
    const {message, handleLogin} = LoginVM();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = "Login";
    }, []);
    return (
        <div className="bg-body-secondary">
            {message && (
                <div
                    className={`alert ${message.includes("successful!") ? "alert-success" : "alert-danger"} 
                    position-absolute top-0 start-50 translate-middle-x`}
                    style={{zIndex: 2909, minWidth: "300px", marginTop: "20px"}}
                >
                    {message}
                </div>
            )}
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row w-100" style={{minHeight: "75vh"}}>
                    <div className="col-md-6 d-none d-md-block bg-body-secondary position-relative">
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <img src={logo} alt="" className="img-fluid"/>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="card w-100 border border-0 h-75">
                            <div className="card-body">
                                <h2>Login</h2>
                                <Link to="#" className="text-dark">Forgot your password?</Link>
                                <form className="mt-4 d-flex flex-column h-75">
                                    <div className="mb-3">
                                        <div className="input-group flex-nowrap">
                                            <input type="text"
                                                   id="email"
                                                   className="form-control border border-dark" placeholder="Email"/>
                                            <Link to={`#`} className="input-group-text nav-link px-3 invisible"
                                                  id="addon-wrapping">
                                                <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"} fs-4`}></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group flex-nowrap">
                                            <input type={showPassword ? "text" : "password"}
                                                   id="password"
                                                   className="form-control border border-dark" placeholder="Password"
                                                   aria-label="Username" aria-describedby="addon-wrapping"/>
                                            <Link to={`#`} className="input-group-text nav-link px-3"
                                                  id="addon-wrapping"
                                                  onClick={() => setShowPassword(!showPassword)}>
                                                <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"} fs-4`}></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <button type="button" className="btn btn-dark form-control d-flex mb-3"
                                                onClick={() => handleLogin(navigate)}>
                                            <span className="me-auto">LOGIN</span>
                                            <span>→</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;