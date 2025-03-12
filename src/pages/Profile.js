import StaffsVM from "../viewmodels/StaffsVM";
import {useEffect} from "react";

function Profile() {
    const {
        profile, setProfile,
        provinces, setSelectedProvince,
        districts, setSelectedDistrict,
        wards, setSelectedWard,
        handleUpdate
    } = StaffsVM();
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
            <div className="my-3">
                <p className="fw-semibold fs-2">Welcome</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>

            <div className="row g-3">
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
                                // const provinceCode = e.target.selectedOptions[0].getAttribute("data-code");
                                // setSelectedProvince(provinceCode);
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
                                    <option key={district.code} value={district.name}>{district.name}</option>
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
        </>
    );
}

export default Profile;