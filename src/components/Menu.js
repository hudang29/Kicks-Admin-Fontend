function Menu() {
    return (
        <div className="pe-5 d-flex align-items-center justify-content-end"
             style={{height: "10vh"}}>
            <div className="hstack gap-3 ">
                <div className="border border-dark border-2 rounded">
                    <div className="hstack gap-1">
                        <input className="form-control me-auto" type="text" placeholder="Search"
                               aria-label="Search"/>
                        <button type="button" className="btn"><i className="bi bi-search"></i></button>
                    </div>
                </div>
                <div className="border border-dark border-2 rounded">
                    <button className="btn">
                        <i className="bi bi-bell-fill"></i>
                    </button>
                </div>
                <div className="border border-dark border-2 rounded">
                    <select className="form-select" aria-label="Default select example">
                        <option selected>ADMIN</option>
                        <option value="1">STAFF</option>
                        <option value="2">EMPLOYEE</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Menu;