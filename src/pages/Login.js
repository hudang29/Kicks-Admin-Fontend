import logo from "../assets/KICKS.png";
import {Link, useNavigate} from "react-router-dom";
import LoginVM from "../viewmodels/LoginVM";
import {useEffect} from "react";

function Login() {
    const navigate = useNavigate();
    const {message, activeLogin, handleLogin} = LoginVM();
    useEffect(() => {
        document.title = "Login";
    }, []);
    return (
        <>
            {message && (
                <div
                    className={`alert ${message.includes("Successful!") ? "alert-success" : "alert-danger alert-dismissible"} 
                    position-absolute top-0 start-50 translate-middle-x`}
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
                                    <button type="button" className="btn btn-dark form-control d-flex mb-3"
                                            disabled={!activeLogin}
                                            onClick={() => handleLogin(navigate)}>
                                        <span className="me-auto">LOGIN</span>
                                        <span>→</span>
                                    </button>
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