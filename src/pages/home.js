import Helmet from 'react-helmet';
import { useEffect } from "react";
import Carousel from 'react-grid-carousel';

import Script from '../assets/script';
import Footer from "../components/footer";
import AnimeStreamAPI from "../controllers/animeStreamAPI";
import Preloader from '../components/preloader';

const Home = () => {
    const { width } = Script();
    const { 
        error, errorMessage, loadingData,
        recomendation, recomendationData,
        newEpisode, newEpisodeData
    } = AnimeStreamAPI();

    useEffect(() => {
        recomendation()
        newEpisode()
    }, [])

    const nontonTerakhir = JSON.parse(localStorage.getItem("nontonTerakhir"));

    const responsive = [
        {
          breakpoint: 850,
          cols: 5,
          rows: 1,
        }
    ];

    const MyDot = ({ isActive }) => (
        <span
          style={{
            display: 'inline-block',
            height: isActive ? '8px' : '5px',
            width: isActive ? '8px' : '5px',
            background: '#0cc1e0',
            borderRadius: '50%'
          }}
        ></span>
    )

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
                            <Preloader error={error} errorMessage={errorMessage} />
                        :
                            <div className="mx-auto col-sm-9">
                                {/* {
                                    nontonTerakhir ?
                                        <a href={'/watch/' + nontonTerakhir[0]} className='btn btn-outline-info ms-3 rounded-5 mb-3 w-100'>
                                            Terakhir Ditonton : {nontonTerakhir[1]}
                                            <br />
                                            <b>{nontonTerakhir[2]}</b>
                                        </a>
                                    :
                                        ''
                                } */}
                                <div className="popular">
                                    <div className="mvcategory">Recomendations</div>
                                    <div className={width < 850 ? 'd-none' : ''}>
                                        <Carousel 
                                            responsiveLayout={responsive}
                                            cols={6}
                                            rows={1}
                                            showDots={true}
                                            dot={MyDot}
                                        >
                                            {
                                                recomendationData.map((data, key) => {
                                                    return (
                                                        <Carousel.Item>
                                                            <a href={'/watch/' + data.epsLink} className="recomend_mvcard" key={key}>
                                                                <div className="recomend_mvimgwrap">
                                                                    <img src={data.imgURL} className="recomend_mvimg img-fluid" />
                                                                </div>

                                                                <span className="mt-3 text-white mvtitle">{data.animeTitle}</span>
                                                            </a>
                                                        </Carousel.Item>
                                                    )
                                                })
                                            }
                                        </Carousel>
                                    </div>

                                    <div className={width < 850 ? 'mvwrap' : 'd-none'}>
                                        {
                                            recomendationData.map((data, key) => {
                                                return (
                                                    <a href={'/watch/' + data.epsLink} className="mvcard" key={key}>
                                                        <div className="mvimgwrap">
                                                            <img src={data.imgURL} className="mvimg img-fluid" />
                                                        </div>

                                                        <div className='mvtext'>
                                                            <span className="mt-3 text-white mvtitle">{data.animeTitle}</span>
                                                        </div>
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
                                            newEpisodeData.map((data, key) => {
                                                return (
                                                    <a href={'/watch/' + data.epsLink} className="mvcard" key={key}>
                                                        <div className="mvimgwrap">
                                                            <div className="mvbadge">
                                                                <span className={data.status === "Tamat" ? 'badge text-bg-success badge-type' : 'badge text-bg-danger badge-type'}>{data.status}</span>
                                                            </div>
                                                            <img src={data.imgURL} className="mvimg img-fluid" />
                                                        </div>

                                                        <div className='mvtext'>
                                                            <span className="mt-3 text-white mvtitle">{data.animeTitle}</span>
                                                            <span className="text-info ms-auto">{data.type}</span>
                                                        </div>
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