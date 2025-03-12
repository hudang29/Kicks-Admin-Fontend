import SizeVM from "../viewmodels/SizeVM";

function Size() {
    const {size, newSize, setNewSize, handleSizeSubmit, handleSizeDelete} = SizeVM();

    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">Sizes</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Size</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>

            <form className="row row-cols-lg-auto g-3 align-items-center mb-3"
                  onSubmit={handleSizeSubmit}>
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Size</label>
                    <div className="input-group">
                        <div className="input-group-text">Size</div>
                        <input type="text" className="form-control"
                               id="inlineFormInputGroupUsername"
                               value={newSize}
                               onChange={(e) => setNewSize(e.target.value)}/>
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
            <div className="table-responsive">
                <table className="table table-hover object-fit-contain">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Size</th>
                        <th scope="col">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        size?.length > 0 ? (
                            // eslint-disable-next-line array-callback-return
                            size.map((size, index) =>
                                (
                                    <tr key={size.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{size.size}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" id={size.id}
                                                    onClick={() => handleSizeDelete(size.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <th scope="row">1</th>
                                <td>#</td>
                                <td>#</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Size;