function AlertMessage({props}) {

    return (
        <>
            {
                props? (
                    <div className="loading-container">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </>

    );
}
export default AlertMessage;