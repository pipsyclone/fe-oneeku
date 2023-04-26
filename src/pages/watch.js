import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Footer from "../components/footer";
import Preloader from "../components/preloader";
import AnimeStreamAPI from "../controllers/animeStreamAPI";

const Watch = () => {

    const { animeslug, episode } = useParams();
    const {
        error, errorMessage, loadingData,
        watch, watchData
    } = AnimeStreamAPI();

    useEffect(() => {
        watch(animeslug, episode)
    }, [])

    return (
        <>
            <Helmet>
                <title>OneeKu - {watchData.length === 0 ? '' : watchData[0].animeTitle}</title>
            </Helmet>

            <div className="content-wrapper">
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorMessage={errorMessage} />
                        :
                            <>
                                <div className="watchanime mx-auto col-sm-6 mb-5">
                                    <div className="card card-body rounded-0 p-0" style={{backgroundColor: '#1e293b'}}>
                                        {
                                            watchData.map((data, key) => {
                                                return (
                                                    <div key={key}>
                                                        <iframe src={data.videoURL} className="h-full w-full" allowFullScreen="allowFullScreen" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;" style={{ width: '100%', height: '450px' }} />

                                                        <div className="m-3">
                                                            <h2 className="text-white">{data.animeTitle} - Episode {data.episode}</h2>
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <a href={'/watch/' + data.prevNext[0].link}  className={data.prevNext[0].link === "" ? 'btn btn-info disabled col me-3' : 'btn btn-info col me-3'}>
                                                                    <i className="fa-solid fa-angle-left"></i> Prev
                                                                </a>

                                                                <a href={'/watch/' + data.prevNext[1].link} className={data.prevNext[1].link === "" ? 'btn btn-info disabled col ms-3' : 'btn btn-info col ms-3'}>
                                                                    Next <i className="fa-solid fa-angle-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="watchanime mx-auto col-sm-8 mb-5">
                                    <div className="card card-body rounded-0 p-0" style={{backgroundColor: '#1e293b'}}>
                                        {
                                            watchData.map((data, key) => {
                                                return (
                                                    <div className="d-flex" key={key}>
                                                        <div className="col-sm-3 mt-3 ms-3 mb-3">
                                                            <img src={data.imgURL} className="img-fluid w-100" />
                                                        </div>

                                                        <div className="m-3 text-white">
                                                            {data.description}
                                                            <br />
                                                            <br />
                                                            {
                                                                data.genres.map((genres, key) => {
                                                                    return (
                                                                        <a href={'/genre/' + genres.genre} className={key === 0 ? 'btn btn-info rounded-0 me-2' : 'btn btn-info rounded-0 ms-2 me-2'}>
                                                                            {genres.genre}
                                                                        </a>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                }

                <Footer />
            </div>
        </>
    )
}

export default Watch;