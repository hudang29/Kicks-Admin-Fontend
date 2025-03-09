import logo from "../assets/KICKS.png";
import {Link, useNavigate} from "react-router-dom";
import LoginVM from "../viewmodels/LoginVM";

function Login() {
    const navigate = useNavigate();
    const {message, activeLogin, handleLogin} = LoginVM();
    return (
        <>
            {message && (
                <div
                    className={`alert ${message.includes("Successful") ? "alert-success" : "alert-danger alert-dismissible"} position-absolute top-0 start-50 translate-middle-x`}
                    style={{ zIndex: 2909, minWidth: "300px", marginTop: "20px" }}
                >
                    {message}
                </div>
            )}
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row w-100">
                    <div className="col-md-6 d-none d-md-block bg-secondary-subtle position-relative">
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <img src={logo} alt="" className="img-fluid"/>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="card w-75 border border-0 ">
                            <div className="card-body">
                                <h2>Login</h2>
                                <Link to="#" className="text-dark">Forgot your password?</Link>
                                <form className="mt-4">
                                    <div className="mb-3">
                                        <input type="email" className="form-control border border-dark" id="email"
                                               placeholder="Email"/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control border border-dark" id="password"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="checkbox" className="form-check-input bg-dark" id="rememberMe"/>
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            <p className="m-0">Keep me logged in - applies to all log in options
                                                below.</p>
                                            <p><a href="#" className="text-dark">More info</a></p>
                                        </label>
                                    </div>
                                    <button type="button" className="btn btn-dark form-control d-flex mb-3"
                                            disabled={!activeLogin}
                                            onClick={() => handleLogin(navigate)}>
                                        <span className="me-auto">Email</span>
                                        <span>→</span>
                                    </button>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-outline-dark form-control mb-3">
                                                <span><i className="bi bi-google fs-3 text-warning"></i></span>
                                            </button>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-outline-dark form-control mb-3">
                                                <span><i className="bi bi-apple fs-3"></i></span>
                                            </button>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-outline-dark form-control mb-3">
                                                <span><i className="bi bi-facebook fs-3 text-primary"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;