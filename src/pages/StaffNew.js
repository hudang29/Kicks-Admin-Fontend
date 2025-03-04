import StaffsVM from "../viewmodels/StaffsVM";

function StaffNew() {

    const {
        staffName, setStaffName, email, setEmail, phone, setPhone,
        setAddress, address, setSelectedRole, selectedRole,
        password, setPassword,
        provinces, selectedProvince, setSelectedProvince,
        districts, selectedDistrict, setSelectedDistrict,
        wards, selectedWard, setSelectedWard,
        activeBtn
    } = StaffsVM()

    return (
        <>
            <div className="my-3">
                <h3>New Staff</h3>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">New Staff</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <form>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name"
                               value={staffName}
                               onChange={(e) => setStaffName(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="phone"
                               value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <select id="role" className="form-select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="Staff">Staff</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-4">
                        <select id="province" className="form-select"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}>
                            <option>Choose Province</option>
                            {
                                provinces.length > 0 ? (
                                    provinces.map((province) => (
                                        <option key={province.code} value={province.code}>{province.name}</option>
                                    ))
                                ) : (
                                    <option>Errors</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <select id="district" className="form-select"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}>
                            <option>Choose District</option>
                            {
                                districts.length > 0 ? (
                                    districts.map((district) => (
                                        <option key={district.code} value={district.code}>{district.name}</option>
                                    ))
                                ) : (
                                    <option>Errors</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <select id="district" className="form-select"
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}>
                            <option>Choose Ward</option>
                            {
                                wards.length > 0 ? (
                                    wards.map((ward) => (
                                        <option key={ward.code} value={ward.code}>{ward.name}</option>
                                    ))
                                ) : (
                                    <option>Errors</option>
                                )
                            }
                        </select>
                    </div>

                </div>
                <div className="row mb-3">
                    <label htmlFor="province" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="address" rows="3"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  readOnly/>
                    </div>
                </div>
                <div className="hstack">
                    <button type="submit" className="btn btn-dark ms-auto"
                            disabled={!activeBtn()}>Create
                    </button>
                </div>
            </form>
        </>
    );
}

export default StaffNew;