import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Footer from "../components/footer";
import Preloader from "../components/preloader";
import AnimeStreamAPI from "../controllers/animeStreamAPI";

const Watch = () => {

    const { slug } = useParams();
    const {
        error, errorMessage, loadingData,
        watch, watchData
    } = AnimeStreamAPI();

    useEffect(() => {
        watch(slug)
    }, [])

    return (
        <>
            <Helmet>
                <title>OneeKu - {watchData.length === 0 ? '' : watchData[0].series}</title>
            </Helmet>

            <div className="content-wrapper">
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorMessage={errorMessage} />
                        :
                            <div className="watchanime mx-auto col-sm-6 mb-5">
                                <div className="card card-body rounded-0 p-0" style={{backgroundColor: '#1e293b'}}>
                                    {
                                        watchData.map((data, key) => {
                                            localStorage.setItem('nontonTerakhir', JSON.stringify([slug, data.title, new Date().toDateString()]))
                                            return (
                                                <div key={key}>
                                                    <iframe src={data.vidURL} className="h-full w-full" allowFullScreen="allowFullScreen" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;" style={{ width: '100%', height: '450px' }} />

                                                    <div className="m-3">
                                                        <h2 className="text-white">{data.title}</h2>
                                                        <small className="text-white">Release : {data.released}</small>
                                                        <br />
                                                        <br />
                                                        <a href={'/view/' + data.slug} className="btn btn-outline-info rounded-5">{data.series}</a>

                                                        <div className="d-flex justify-content-between mt-3">
                                                            <a href={'/watch/' + data.prev}  className={data.prev === false ? 'btn btn-info disabled col me-3' : 'btn btn-info col me-3'}>
                                                                <i className="fa-solid fa-angle-left"></i> Prev
                                                            </a>

                                                            <a href={data.next} className={data.next === false ? 'btn btn-info disabled col ms-3' : 'btn btn-info col ms-3'}>
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
                }

                <Footer />
            </div>
        </>
    )
}

export default Watch;