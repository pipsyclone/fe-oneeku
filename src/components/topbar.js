import { Link } from "react-router-dom";

import LogoOneeku from './../assets/img/oneeku.png';

import AnimeStreamAPI from "../controllers/animeStreamAPI";

const Topbar = () => {

    const {
        handleSearch
    } = AnimeStreamAPI();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top topbar p-3">
            <div className="container">
                <a className="navbar-brand" href={'/'}>
                    <img src={LogoOneeku} className='img-fluid' width={100} />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topbarCollapse">
                    <i className="fa-solid fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="topbarCollapse">
                    <ul className="navbar-nav me-5 mb-2 mb-lg-0 ms-auto text-center">
                        <li className="nav-item">
                            <Link className="nav-link active" to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={'/genre'}>
                                Genre
                            </Link>
                        </li>
                    </ul>

                    <form onSubmit={handleSearch.handleSubmit} className='col-sm-3'>
                        <div className='input-group'>
                            <input type="text" className="form-control input-dark border-0" placeholder="Cari..." {...handleSearch.getFieldProps('keyword')} />
                            <button type="submit" className='btn btn-primary'>
                                <i className='fa-solid fa-search'></i>
                            </button>
                        </div>
                        {handleSearch.errors.keyword}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Topbar;