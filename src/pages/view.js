import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import Footer from "../components/footer";
import Preloader from "../components/preloader";
import AnimeStreamAPI from "../controllers/animeStreamAPI";

const View = () => {

    const { animetitle } = useParams();
    const {
        error, errorMessage, loadingData,
        anime, animeData
    } = AnimeStreamAPI();

    useEffect(() => {
        anime(animetitle)
    }, [animetitle])

    return (
        <>
            <Helmet>
                <title></title>
            </Helmet>

            <div className="content-wrapper">

                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorCode={errorMessage.status} errorMessage={errorMessage || errorMessage.msg} />
                        :
                            <>
                                <div className="viewanime mx-auto col-sm-9">
                                    {
                                        animeData.map((data, key) => {
                                            return (
                                                <div key={key}>
                                                    <div className="card card-body p-0 d-flex flex-row rounded-0" style={{backgroundColor: '#1e293b'}}>
                                                        <div>
                                                            <img src={data.imgURL} width={250} />
                                                            <div className="text-center text-info fs-1">
                                                                <i className="fa-solid fa-star"></i> {data.rating}
                                                            </div>
                                                        </div>
                                                        <div className="text-white p-3">
                                                            <h2>{data.title}</h2>
                                                            <small>
                                                                <i>{data.info[0]}, {data.info[1]}, {data.info[2]}, {data.info[3]}, {data.info[5]}</i>
                                                            </small>
                                                            <hr />
                                                            {
                                                                data.genres.map((genre, i) => {
                                                                    return (
                                                                        <a href={'/genre/' + genre.genreSlug} className={i === 0 ? "btn btn-outline-info rounded-0" : "btn btn-outline-info rounded-0 ms-3" }>{genre.genre}</a>
                                                                    )
                                                                })
                                                            }
                                                            <br />
                                                            <br />
                                                            {data.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div className="mx-auto col-sm-9 mt-3 mb-5">
                                    <div className="card card-body rounded-0 epslist" style={{backgroundColor: '#1e293b'}}>
                                        <table className="table text-white w-100">
                                            <tbody>
                                                {
                                                    animeData.map((data, key) => {
                                                        return (
                                                            data.epsList.map((eps, i) => {
                                                                const onClickHandler = () => {
                                                                    localStorage.setItem('nontonTerakhir', JSON.stringify([eps.epsSlug, eps.epsTitle, new Date().toDateString()]))
                                                                    window.location.href = "/watch/" + eps.epsSlug
                                                                }
                                                                return (
                                                                    <tr className="tr-hover" onClick={onClickHandler}>
                                                                        <td>Episode {eps.epsNum}</td>
                                                                        <td>{eps.epsTitle}</td>
                                                                        <td>{eps.epsDate}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                }

                <Footer />
            </div>
        </>
    )
}

export default View;