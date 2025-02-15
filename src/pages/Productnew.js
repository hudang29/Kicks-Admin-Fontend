function ProductNew() {
    return (
        <>
            <div className="mb-3">
                <h3>New Product</h3>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item">
                                    <a href="#" className="nav-link d-inline-block">All Products</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Product</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>
        </>
    );
}

export default ProductNew;