import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import ResultNotFound from '../assets/img/search-not-found.png';

import Footer from "../components/footer";
import Preloader from "../components/preloader";
import AnimeStreamAPI from "../controllers/animeStreamAPI";

const Search = () => {

    const { keywordanime } = useParams();
    const [pageNum, setPageNum]  = useState(1);
    const {
        error, loadingData, 
        searchResult, loadSearchResult
    } = AnimeStreamAPI();

    useEffect(() => {
        loadSearchResult(keywordanime, pageNum)
    }, [pageNum])

    return (
        <>
            <Helmet>
                <title>OneeKu - {keywordanime}</title>
            </Helmet>

            <div className="content-wrapper">
                
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        <div className="searchresult mx-auto col-sm-9 mb-5">
                            <div className="mvcategory">Search Result of {keywordanime}</div>
                            
                            {
                                error ?
                                    <div className="text-center">
                                        <img src={ResultNotFound} className="img-fluid" width={500} />
                                    </div>
                                :
                                    <>
                                        <div className="mvwrap">
                                            {
                                                searchResult.map((data, key) => {
                                                    return (
                                                        <a href={'/view/' + data.epsLink} className="mvcard" key={key}>
                                                            <div className="mvimgwrap">
                                                                <div className="mvbadge">
                                                                    <span className={data.status === "Tamat" ? 'badge text-bg-success badge-type' : 'badge text-bg-danger badge-type'}>{data.status}</span>
                                                                </div>
                                                                <img src={data.imgURL} className="mvimg img-fluid" />
                                                            </div>

                                                            <div className="mvtext">
                                                                <span className="mt-3 text-white mvtitle">{data.animeTitle}</span>
                                                                <span className="text-info">{data.type}</span>
                                                            </div>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='d-flex justify-content-center mt-5'>
                                            <button className={pageNum <= 1 ? 'btn btn-info me-5 disabled' : 'btn btn-info me-5'} onClick={() => setPageNum((next) => next - 1)}>
                                                <i className='fa-solid fa-angle-left'></i> Previous
                                            </button>

                                            <span className='text-white text-center'>Page : {pageNum}</span>

                                            <button className={searchResult.length < 12 ? 'btn btn-info ms-5 disabled' : 'btn btn-info ms-5'} onClick={() => setPageNum((prev) => prev + 1)}>
                                                <i className='fa-solid fa-angle-right'></i> Next
                                            </button>
                                        </div>
                                    </>
                            }
                        </div>
                }

                <Footer classCustom={searchResult.length === 6 ? 'position-absolute bottom-0' : ''} />
            </div>
        </>
    )
}

export default Search