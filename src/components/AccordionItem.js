function AccordionItem({header, body, unique}) {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button bg-body z-0" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#flush-${unique}`} aria-expanded={false} aria-controls={`flush-${unique}`}>
                    {header}
                </button>
            </h2>
            <div id={`flush-${unique}`} className="accordion-collapse collapse z-0" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body bg-body">
                    {body ? (
                        body
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccordionItem;