import StaffsVM from "../viewmodels/StaffsVM";

function StaffDetail() {
    const {
        staff,
        staffName, setStaffName,
        address, setAddress,
        phone, setPhone,
        email, setEmail,
        selectedRole, setSelectedRole,
        status, setStatus,
        handleUpdate, handleStatus
    } = StaffsVM();
    return (<>
        <div className="mb-3">
            <h3>Staff Detail</h3>
            <div className="hstack">
                <div className="p-1">
                    <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Staff Detail</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        <div className="card mb-3">
            <div className="card-body text-center">
                <h5>
                    {staff.status ? (
                            <span className="badge rounded-pill text-bg-success p-2">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        ) :
                        (
                            <span className="badge rounded-pill text-bg-danger p-2">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        )
                    } # {staff?.id || "##"}
                </h5>
            </div>
        </div>
        <form className="row g-3">
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                       value={staffName}
                       onChange={(e) => setStaffName(e.target.value)}/>
            </div>
            {/*<div className="col-md-6">*/}
            {/*    <label htmlFor="inputPassword4" className="form-label">Password</label>*/}
            {/*    <input type="password" className="form-control" id="inputPassword4"/>*/}
            {/*</div>*/}
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="role" className="form-label">Role</label>
                <select id="role" className="form-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea className="form-control" id="address" rows="3"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                readOnly/>
            </div>

            <div className="col-12">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-dark"
                            type="button"
                            disabled={!status}
                            onClick={handleUpdate}>Update
                    </button>
                    <button className="btn btn-light border border-dark"
                            type="button">
                        Cancel
                    </button>
                    <button className="btn btn-danger" type="button"
                    onClick={handleStatus}>Change Status</button>
                </div>
            </div>
        </form>
    </>
    );
}

export default StaffDetail;