import Helmet from 'react-helmet';
import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Footer from "../components/footer";
import AnimeStreamAPI from "../controllers/animeStreamAPI";
import Preloader from '../components/preloader';

const Home = () => {
    const { 
        error, errorMessage, loadingData,
        popular, popularData,
        newEpisode, newEpisodeData
    } = AnimeStreamAPI();

    useEffect(() => {
        popular()
        newEpisode()
    }, [])

    const nontonTerakhir = JSON.parse(localStorage.getItem("nontonTerakhir"));

    return (
        <>  
            <Helmet>
                <title>OneeKu - Anime Streaming</title>
            </Helmet>

            <div className="content-wrapper">
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorCode={errorMessage.status} errorMessage={errorMessage.msg} />
                        :
                            <div className="mx-auto col-sm-9">
                                {
                                    nontonTerakhir ?
                                        <a href={'/watch/' + nontonTerakhir[0]} className='btn btn-outline-info ms-3 rounded-5 mb-3 w-100'>
                                            Terakhir Ditonton : {nontonTerakhir[1]}
                                            <br />
                                            <b>{nontonTerakhir[2]}</b>
                                        </a>
                                    :
                                        ''
                                }
                                <div className="popular">
                                    <div className="mvcategory">Popular Anime Today</div>
                                    <div className="popular_mvwrap">
                                        {
                                            popularData.map((data, key) => {
                                                return (
                                                    <a href={'/watch/' + data.slug} className="popular_mvcard" key={key} onClick={() => localStorage.setItem('nontonTerakhir', JSON.stringify([data.slug, data.title + ' Episode - ' + data.episode, new Date().toDateString()]))}>
                                                        <div className="popular_mvimgwrap">
                                                            <span className="position-absolute popular_mvbadge">
                                                                <span className="badge text-bg-info popular_badge-type">{data.type}</span>
                                                                <span className="badge text-bg-danger popular_badge-status">{data.status === "" ? "Ongoing" : data.status}</span>
                                                            </span>
                                                            <img src={data.imgURL} className="popular_mvimg img-fluid" />
                                                        </div>

                                                        <span className="mt-3 text-white popular_mvtitle">{data.title}</span>
                                                        <span className='text-info'>
                                                            Episode - {data.episode}
                                                        </span>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="neweps mt-5 mb-5">
                                    <div className="mvcategory">Latest Release</div>
                                    
                                    <div className="mvwrap">
                                        {
                                            newEpisodeData.slice(0, 6).map((data, key) => {
                                                return (
                                                    <a href={'/watch/' + data.slug} className="mvcard" key={key} onClick={() => localStorage.setItem('nontonTerakhir', JSON.stringify([data.slug, data.title, new Date().toDateString()]))}>
                                                        <div className="mvimgwrap">
                                                            <div className="mvbadge">
                                                                <span className="badge text-bg-info badge-type">{data.type}</span>
                                                                {
                                                                    data.episode === "ie" ?
                                                                        ""
                                                                    :
                                                                        <span className="badge text-bg-danger badge-status">Eps - {data.episode}</span>
                                                                }
                                                            </div>
                                                            <img src={data.imgURL} className="mvimg img-fluid" />
                                                        </div>

                                                        <span className="mt-3 text-white mvtitle">{data.title}</span>
                                                        {
                                                            data.rating === "" ?
                                                                ""
                                                            :
                                                                <span className='text-info'>
                                                                    <i className='fa-solid fa-star'></i> {data.rating}
                                                                </span>
                                                        }
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                }

                <Footer />
            </div>
        </>
    )
}

export default Home;