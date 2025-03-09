import StaffsVM from "../viewmodels/StaffsVM";
import {useEffect} from "react";

function StaffDetail() {
    const {
        id,
        staff, setStaff, password,
        provinces, setSelectedProvince, selectedProvince,
        districts, setSelectedDistrict,
        wards, setSelectedWard,
        handleUpdate, handleStatus, activeBtn, handleCreatePassword, handleResetData,
    } = StaffsVM();

    useEffect(() => {
        if (!staff.city || provinces.length === 0) return; // Nếu chưa có dữ liệu thì dừng lại
        const selectedProvince = provinces.find(province =>
            province.name.toLowerCase() === staff.city.toLowerCase()
        );

        if (selectedProvince) {
            setSelectedProvince(selectedProvince.code);
            // district
            const selectedDistrict = districts.find(district =>
                district.name.toLowerCase() === staff.district.toLowerCase()
            );
            if (selectedDistrict) {
                setSelectedDistrict(selectedDistrict.code);
                // ward
                const selectedWard = wards.find(ward =>
                    ward.name.toLowerCase() === staff.ward.toLowerCase()
                );
                if (selectedWard) {
                    setSelectedWard(selectedWard.code);
                }
            }
        }
    }, [districts, provinces, setSelectedDistrict, setSelectedProvince, setSelectedWard,
        staff.city, staff.district, staff.ward, wards]);

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
                                </span>) :
                            (<span className="badge rounded-pill text-bg-danger p-2">
                                    <span className="visually-hidden">New alerts</span>
                                </span>)
                        } # {staff.id || "##"}
                    </h5>
                </div>
            </div>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"
                           value={staff.name}
                           onChange={(e) => setStaff(
                               prev => ({...prev, name: e.target.value})
                           )}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4"
                           value={staff.email}
                           onChange={(e) => setStaff(
                               prev => ({...prev, email: e.target.value})
                           )}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone"
                           value={staff.phone}
                           onChange={(e) => setStaff(
                               prev => ({...prev, phone: e.target.value})
                           )}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="role" className="form-label">Role</label>
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
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" rows="3"
                              value={staff.address}
                              onChange={(e) => setStaff(
                                  prev => ({...prev, address: e.target.value})
                              )}/>
                </div>
                <div className="col-4">
                    <label htmlFor="province" className="form-label">City</label>
                    <select id="province" className="form-select"
                            value={staff.city}
                            onChange={(e) => {
                                setStaff(
                                    prev => ({...prev, city: e.target.value})
                                )
                                const provinceCode = e.target.selectedOptions[0].getAttribute("data-code");
                                setSelectedProvince(provinceCode);
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
                <div className="col-4">
                    <label htmlFor="district" className="form-label">District</label>
                    <select id="district" className="form-select"
                            value={staff.district}
                            onChange={(e) => setStaff(
                                prev => ({...prev, district: e.target.value})
                            )}>
                        <option value="No District">Choose District</option>
                        {
                            districts.length > 0 ? (
                                districts.map((district) => (
                                    <option key={district.code} value={district.name}>{district.name}</option>
                                ))
                            ) : (
                                <option>Errors</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-4">
                    <label htmlFor="ward" className="form-label">Ward</label>
                    <select id="ward" className="form-select"
                            value={staff.ward}
                            onChange={(e) => setStaff(
                                prev => ({...prev, ward: e.target.value})
                            )}>
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
                                disabled={!staff.status || !activeBtn()}
                                onClick={handleUpdate}>Update
                        </button>
                        <button className="btn btn-light border border-dark"
                                type="button"
                                onClick={handleResetData}>Reset
                        </button>
                        <button className="btn btn-danger" type="button"
                                onClick={handleStatus}>Change Status
                        </button>
                        <button className="btn btn-light border border-dark"
                                type="button"
                                hidden={password || !staff.status}
                                disabled={password || !staff.status}
                                onClick={handleCreatePassword}>
                            Send password
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default StaffDetail;