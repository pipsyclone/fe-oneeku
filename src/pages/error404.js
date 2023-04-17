import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import Error404Image from '../assets/img/error-404.png';

const Error404 = () => {

    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Error 404 - Page Not Found!</title>
            </Helmet>

            <div className="middle text-center">
                <img src={Error404Image} className="img-fluid" width={500} />
                <br />
                <button className="btn btn-info" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </>
    )
}

export default Error404;