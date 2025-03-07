import ProductsVM from "../viewmodels/ProductsVM";

function Pagination() {
    const {
        handleChangePage,
        page, totalPages,
    } = ProductsVM();
    return (

        totalPages > 0 ? (
            <nav aria-label="...">
                <ul className="pagination hstack gap-3">
                    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handleChangePage(page - 1)}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                            <button
                                className="page-link px-3"
                                onClick={() => handleChangePage(index)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handleChangePage(page + 1)}
                            disabled={page + 1 >= totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        ) : (
            <></>
        )

    );
}

export default Pagination;