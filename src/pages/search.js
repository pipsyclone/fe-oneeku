import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import ResultNotFound from '../assets/img/search-not-found.png';

import Footer from "../components/footer";
import Preloader from "../components/preloader";
import AnimeStreamAPI from "../controllers/animeStreamAPI";

const Search = () => {

    const { keywordanime } = useParams();
    const {
        error, errorMessage, loadingData, 
        searchResult, loadSearchResult
    } = AnimeStreamAPI();

    useEffect(() => {
        loadSearchResult(keywordanime)
    }, [])

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
                        <div className="searchresult mx-auto col-sm-8 mb-5">
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
                                                        <a href={'/view/' + data.slug} className="mvcard" key={key}>
                                                            <div className="mvimgwrap">
                                                                <div className="mvbadge">
                                                                    <span className="badge text-bg-info badge-type">{data.type}</span>
                                                                    <span className="badge text-bg-danger badge-status">{data.status}</span>
                                                                </div>
                                                                <img src={data.imgURL} className="mvimg img-fluid" />
                                                            </div>

                                                            <span className="mt-3 text-white mvtitle">{data.title}</span>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                            }
                        </div>
                }

                <Footer classCustom="position-absolute bottom-0" />
            </div>
        </>
    )
}

export default Search