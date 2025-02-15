
function Pagination() {
    return (
        <nav aria-label="...">
            <ul className="pagination hstack gap-3">
                <li className="page-item">
                    <a className="page-link" href="#">Previous</a>
                </li>
                <li className="page-item">
                    <a className="page-link px-3" href="#">1</a>
                </li>
                <li className="page-item" aria-current="page">
                    <a className="page-link px-3" href="#">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link px-3" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;