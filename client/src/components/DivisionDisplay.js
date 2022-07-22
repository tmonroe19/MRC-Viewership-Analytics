import FlipMove from "react-flip-move"

const DivisionDisplay = ({ DivRecords, DivLogo, alt }) => {
    console.log({ alt, DivRecords })

    return (
        <div>
            <div className="div-imgWrapper">
                <img src={DivLogo} alt={alt} />
            </div>
            <FlipMove className="block-collection">
                {
                    DivRecords.map(element => {
                        return (
                            <div key={element.title} className="block" >
                                <div className="counter">
                                    <div className="counter-number">
                                        <h3>{element.viewer}</h3>
                                    </div>
                                    <div className="counter-viewership">
                                        <h3>Current Viewership</h3>
                                    </div>
                                </div>
                                <p>{element.title}</p>
                            </div>
                        )
                    })
                }
            </FlipMove>
        </div>
    )
}

export default DivisionDisplay