import './searchMovies.css';
import { useState, useEffect } from 'react';
import GetData from './GetData';
import { Link, useParams } from "react-router-dom";



//working images and titles
//useparams
//get correct query
//working pages

const SearchMovies = () => {

    let params = useParams()

    let queryText = "fight club"

    if ('query' in params) {
        queryText = params.query
    }

    const [query, setQuery] = useState(queryText)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState([])

    useEffect(async () => {
        window.scrollTo(0, 0)
        let url = "https://api.themoviedb.org/3/search/movie?api_key=86f237d170416093156de7affa43927e&language=en-US&"
        + "query=" + query + "&page=" + page + "&include_adult=false"
        let response = await GetData(url)
        let movies = response.results


        let movieElements = []

        //loop through the array of movies 
        movies.forEach((e, i) => {

            let currentPoster = e.poster_path
            
            if(currentPoster != null){
                currentPoster = "https://image.tmdb.org/t/p/w500" + e.poster_path
            } else {
                //when there is no poster image for a movie
                currentPoster = "img/no_image.png"
            }

            let currentTitle = e.title

            movieElements.push(
                <div className="movie">
                    <img className="movie-poster" src={currentPoster} alt={currentTitle} />
                    <p>{currentTitle}</p>
                </div>
            )
        });





        
        setSearch(movieElements)
    }, [page])

    return (

        <section>
            <div className="search-container">
                <p className="query">Search results for {query}</p>
                <div className="search-grid">
                    {search}
                </div>
            </div>
        </section>
    )
}

export default SearchMovies;