import { Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar';
import Home from './pages/home';
import Genre from './pages/genre';
import AnimeByGenre from './pages/animeByGenre';
import Search from './pages/search';
import Watch from './pages/watch';
import Error404 from './pages/error404';

const App = () => {

    const Page = (element1, element2) => {
        return <> {element1} {element2} </>
    }

    return (
        <Routes>
            <Route path='/' element={Page(<Topbar />, <Home />)} />
            <Route path='/genre' element={Page(<Topbar />, <Genre />)} />
            <Route path='/genre/:genreanime' element={Page(<Topbar />, <AnimeByGenre />)} />
            <Route path='/search/:keywordanime' element={Page(<Topbar />, <Search />)} />
            <Route path='/watch/:animeslug/:episode' element={Page(<Topbar />, <Watch />)} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default App;