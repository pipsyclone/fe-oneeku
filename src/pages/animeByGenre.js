import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AnimeStreamAPI from '../controllers/animeStreamAPI';
import Footer from '../components/footer';
import Preloader from '../components/preloader';

const AnimeByGenre = () => {

    const [pageNum, setPageNum] = useState(1);
    const { genreanime, page } = useParams();
    const {
        error, errorMessage, loadingData, 
        animeByGenre, animeByGenreData
    } = AnimeStreamAPI();

    useEffect(() => {
        animeByGenre(genreanime, pageNum || page);
    }, [pageNum, page])

    return (
        <>
            <Helmet>
                <title>OneeKu - {genreanime}</title>
            </Helmet>

            <div className='content-wrapper'>
                {
                    loadingData ?
                        <Preloader error={false} />
                    :
                        error ?
                            <Preloader error={error} errorMessage={errorMessage} />
                        :
                            <div className="animegenre mx-auto col-sm-9 mb-5">
                                <div className="mvcategory">Anime Genre {genreanime}</div>
                                <div className="mvwrap">
                                    {
                                        animeByGenreData.map((data, key) => {
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

                                <div className='d-flex justify-content-center mt-5'>
                                    <button className={pageNum <= 1 ? 'btn btn-info me-5 disabled' : 'btn btn-info me-5'} onClick={() => setPageNum((next) => next - 1)}>
                                        <i className='fa-solid fa-angle-left'></i> Previous
                                    </button>

                                    <span className='text-white text-center'>Page : {pageNum}</span>

                                    <button className={animeByGenreData.length < 10 ? 'btn btn-info ms-5 disabled' : 'btn btn-info ms-5'} onClick={() => setPageNum((prev) => prev + 1)}>
                                        <i className='fa-solid fa-angle-right'></i> Next
                                    </button>
                                </div>
                            </div>
                }
                <Footer classCustom={animeByGenreData.length < 6 || error ? 'position-absolute bottom-0' : ''} />
            </div>
        </>
    )
}

export default AnimeByGenre;