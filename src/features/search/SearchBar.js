import { useNavigate } from 'react-router-dom';

export const SearchBar = (props) => {

    const navigate = useNavigate();

    const formID = "search_reddit"

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search/${event.target[0].value}`)
    } 

    return (
        <div id="searchbar">
            <label htmlFor={formID}>Search Reddit: </label>
            <form className="search" onSubmit={handleSearch}>
                <input type="search" id={formID} name="search_reddit" placeholder="Search Reddit" required></input>
                <button type="submit">Go</button>
            </form>
        </div>
    )
}