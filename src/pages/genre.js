import { useEffect } from "react";
import { Helmet } from "react-helmet";

import AnimeStreamAPI from "../controllers/animeStreamAPI";

import Preloader from '../components/preloader';
import Footer from "../components/footer";

const Genre = () => {

    const { 
        error, errorMessage, loadingData,
        genre, genreData,
    } = AnimeStreamAPI();

    useEffect(() => {
        genre()
    }, [])

    return (
        <>
            <Helmet>
                <title>OneeKu - Genre List</title>
            </Helmet>

            <div className="content-wrapper">
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorMessage={errorMessage} />
                        :
                            <div className="genre mx-auto col-sm-9 mb-5">
                                <div className="mvcategory">Select Genre</div>

                                <div className="mt-3 text-center mx-auto">
                                    {
                                        genreData.map((data, key) => {
                                            if (data.type === 'genre') {
                                                return (
                                                    <a href={'/genre/' + data.slug} key={key} className="btn btn-primary m-2">{data.genre}</a>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                }

                <Footer classCustom="position-absolute bottom-0" />
            </div>
        </>
    )
}

export default Genre;