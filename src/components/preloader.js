const Preloader = (props) => {
    return (
        <div className="preloader-wrapper">
            <div className="preloader-content">
                <span className="spinner spinner-grow spinner-grow-sm preloader-icon"></span>
                <span className="spinner spinner-grow spinner-grow-sm preloader-icon"></span>
                <span className="spinner spinner-grow spinner-grow-sm preloader-icon"></span>
                <span className="spinner spinner-grow spinner-grow-sm preloader-icon"></span>
                <span className="spinner spinner-grow spinner-grow-sm preloader-icon"></span>
                <br />
                {props.error ? <small>Error Message : {props.errorMessage}</small> : ''}
            </div>
        </div>
    )
}

export default Preloader;