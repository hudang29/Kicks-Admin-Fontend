import StaffsVM from "../viewmodels/StaffsVM";
import {useEffect} from "react";

function StaffNew() {

    const {
        staff, setStaff,
        provinces, setSelectedProvince,
        districts, setSelectedDistrict,
        wards,
        activeBtn, handleCreate,
    } = StaffsVM();

    useEffect(() => {
        document.title = "New Staff";
    }, []);

    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">New Staff</p>
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
                               value={staff.name}
                               onChange={(e) => setStaff(
                                   prev => ({...prev, name: e.target.value})
                               )}/>
                    </div>
                </div>
                {/*<div className="row mb-3">*/}
                {/*    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>*/}
                {/*    <div className="col-sm-10">*/}
                {/*        <input type="password" className="form-control" id="inputPassword3"*/}
                {/*               value={staff.}*/}
                {/*               onChange={(e) => setPassword(e.target.value)}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3"
                               value={staff.email}
                               onChange={(e) => setStaff(
                                   prev => ({...prev, email: e.target.value})
                               )}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="phone"
                               value={staff.phone}
                               onChange={(e) => setStaff(
                                   prev => ({...prev, phone: e.target.value})
                               )}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <select id="role" className="form-select"
                                value={staff.role}
                                onChange={(e) => setStaff(
                                    prev => ({...prev, role: e.target.value})
                                )}>
                            <option value="Staff">Staff</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="province" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-4">
                        <select id="province" className="form-select"
                                value={staff.city}
                                onChange={(e) => {
                                    setStaff(
                                        prev => ({...prev, city: e.target.value})
                                    )
                                    const provinceCode = e.target.selectedOptions[0].getAttribute("data-code");
                                    setSelectedProvince(provinceCode)
                                }}>
                            <option>Choose Province</option>
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
                    <div className="col-sm-3">
                        <select id="district" className="form-select"
                                value={staff.district}
                                onChange={(e) => {
                                    setStaff(
                                        prev => ({...prev, district: e.target.value})
                                    )
                                    const districtCode = e.target.selectedOptions[0].getAttribute("data-code");
                                    setSelectedDistrict(districtCode)
                                }}>
                            <option>Choose District</option>
                            {
                                districts.length > 0 ? (
                                    districts.map((district) => (
                                        <option key={district.code} value={district.name}
                                                data-code={district.code}>{district.name}</option>
                                    ))
                                ) : (
                                    <option>Errors</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <select id="ward" className="form-select"
                                value={staff.ward}
                                onChange={(e) => setStaff(
                                    prev => ({...prev, ward: e.target.value})
                                )}>
                            <option>Choose Ward</option>
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
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="address" rows="3"
                                  value={staff.address}
                                  onChange={(e) => setStaff(
                                      prev => ({...prev, address: e.target.value})
                                  )}/>
                    </div>
                </div>
                <div className="hstack">
                    <button type="button" className="btn btn-dark ms-auto"
                            disabled={!activeBtn()}
                    onClick={handleCreate}>Create
                    </button>
                </div>
            </form>
        </>
    );
}

export default StaffNew;