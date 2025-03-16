import StaffsVM from "../viewmodels/StaffsVM";
import {useEffect} from "react";
import ProfileVM from "../viewmodels/ProfileVM";
import {Link} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

function Profile() {
    const {
        provinces, setSelectedProvince,
        districts, setSelectedDistrict,
        wards, setSelectedWard
    } = StaffsVM();
    const {
        loading,
        profile, setProfile, password, setPassword,
        errorMessage, confirmPassword,
        handleUpdate, handleChangePassword, handleChange, handleConfirm,
        isDisabled,
    } = ProfileVM();

    useEffect(() => {
        document.title = "Home";
    }, []);
    useEffect(() => {
        if (!profile.city || provinces.length === 0) return; // Nếu chưa có dữ liệu thì dừng lại
        const selectedProvince = provinces.find(province =>
            province?.name?.toLowerCase() === profile?.city?.toLowerCase()
        );

        if (selectedProvince) {
            setSelectedProvince(selectedProvince.code);
            // district
            const selectedDistrict = districts.find(district =>
                district?.name?.toLowerCase() === profile?.district?.toLowerCase()
            );
            if (selectedDistrict) {
                setSelectedDistrict(selectedDistrict.code);
                // ward
                const selectedWard = wards.find(ward =>
                    ward?.name?.toLowerCase() === profile?.ward?.toLowerCase()
                );
                if (selectedWard) {
                    setSelectedWard(selectedWard.code);
                }
            }
        }
    }, [districts, provinces, setSelectedDistrict, setSelectedProvince, setSelectedWard,
        profile.city, profile.district, profile.ward, wards]);

    return (
        <>
            <LoadingPage
            props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Welcome</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button bg-body" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne">
                            <p className="fw-semibold">Profile</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body bg-body">
                            <div className="row g-3 w-75 mx-auto">
                                <div className="col-md-12">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name"
                                           value={profile.name}
                                           onChange={(e) => setProfile(
                                               prevState => ({...prevState, name: e.target.value}))}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email"
                                           value={profile.email}
                                           onChange={(e) => setProfile(
                                               prevState => ({...prevState, email: e.target.value}))}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="email" className="form-control" id="phone"
                                           value={profile.phone}
                                           onChange={(e) => setProfile(
                                               prevState => ({...prevState, phone: e.target.value}))}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <input type="email" className="form-control" id="role" readOnly={true}
                                           value={profile.role}
                                           onChange={(e) => setProfile(
                                               prevState => ({...prevState, role: e.target.value}))}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className="form-control" id="address" rows="3"
                                              value={profile.address}
                                              onChange={(e) => setProfile(
                                                  prevState => ({...prevState, address: e.target.value}))}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="province" className="form-label">City</label>
                                    <select id="province" className="form-select"
                                            value={profile.city}
                                            onChange={(e) => {
                                                setProfile(
                                                    prevState => ({...prevState, city: e.target.value}))
                                            }}>
                                        <option value="No Province">Choose Province</option>
                                        {
                                            provinces.length > 0 ? (
                                                provinces.map((province) => (
                                                    <option key={province.code} value={province.name}
                                                            data-code={province.code}>{province.name}</option>
                                                ))
                                            ) : (
                                                <option>Errors</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="district" className="form-label">District</label>
                                    <select id="district" className="form-select"
                                            value={profile.district}
                                            onChange={(e) => {
                                                setProfile(
                                                    prevState => ({...prevState, district: e.target.value}))
                                            }}>
                                        <option value="No District">Choose District</option>
                                        {
                                            districts.length > 0 ? (
                                                districts.map((district) => (
                                                    <option key={district.code}
                                                            value={district.name}>{district.name}</option>
                                                ))
                                            ) : (
                                                <option>Errors</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="ward" className="form-label">Ward</label>
                                    <select id="ward" className="form-select"
                                            value={profile.ward}
                                            onChange={(e) => {
                                                setProfile(
                                                    prevState => ({...prevState, ward: e.target.value}))
                                            }}>
                                        <option value="No Ward">Choose Ward</option>
                                        {
                                            wards.length > 0 ? (
                                                wards.map((ward) => (
                                                    <option key={ward.code} value={ward.name}>{ward.name}</option>
                                                ))
                                            ) : (
                                                <option>Errors</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-dark"
                                                type="button"
                                                disabled={!profile.status}
                                                onClick={handleUpdate}>Update
                                        </button>
                                        <button className="btn btn-light border border-dark"
                                                type="button">Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed bg-body" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                            <p className="fw-semibold">Change password</p>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body bg-body">
                            <div className="w-75 mx-auto">
                                <div className="mb-3 row">
                                    <label htmlFor="oldPassword" className="col-sm-2 col-form-label">Old
                                        Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" id="oldPassword"
                                               value={password.oldPassword}
                                               onChange={(e) => setPassword(
                                                   prevState => ({
                                                       ...prevState,
                                                       oldPassword: e.target.value
                                                   }))}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="newPassword" className="col-sm-2 col-form-label">New
                                        Password
                                    </label>
                                    <div className="col-sm-10">
                                        <div className="input-group mb-3">
                                            {/*    <span className="input-group-text" id="basic-addon1">*/}
                                            {/*        <button type="button" className="btn btn-secondary" data-bs-container="body"*/}
                                            {/*           data-bs-toggle="popover" data-bs-placement="left"*/}
                                            {/*           data-bs-content={`Password must be at least 8 characters long!\n*/}
                                            {/*      Password must contain at least one uppercase letter!\n*/}
                                            {/*      Password must contain at least one number!\n*/}
                                            {/*      Password must contain at least one special character!\n*/}
                                            {/*      (!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?)!*/}
                                            {/*      `}>*/}
                                            {/*    <i className="bi bi-info-circle"></i>*/}
                                            {/*</button>*/}
                                            {/*    </span>*/}
                                            <input type="password" className="form-control" id="newPassword"
                                                   value={password.newPassword}
                                                   onChange={(e) => handleChange(e)}/>
                                            <span
                                                className={`input-group-text ${!errorMessage.newPasswordMessage ? "" : "invisible"}`}>
                                                <i className={`bi bi-check-circle-fill 
                                                ${!errorMessage.newPasswordMessage ? "text-success" : ""}`}></i>
                                            </span>
                                        </div>
                                        <p className="text-danger"><small>{errorMessage.newPasswordMessage}</small></p>
                                    </div>

                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="confirmedPassword" className="col-sm-2 col-form-label">Confirmed New
                                        Password</label>
                                    <div className="col-sm-10">
                                        <div className="input-group mb-3">
                                            <input type="password" className="form-control" id="newPassword"
                                                   value={confirmPassword}
                                                   onChange={(e) => handleConfirm(e)}/>
                                            <span className="input-group-text">
                                                <i className={`bi bi-check-circle-fill 
                                                ${errorMessage.confirmPasswordMessage ? "text-success" : "invisible"}`}></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                                <div className="div">
                                    <div className="col-12">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button className="btn btn-dark"
                                                    type="button"
                                                    disabled={isDisabled}
                                                    onClick={handleChangePassword}>Update
                                            </button>
                                            <button className="btn btn-light border border-dark"
                                                    type="button">Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;