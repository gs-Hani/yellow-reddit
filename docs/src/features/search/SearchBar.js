import { useNavigate } from 'react-router-dom';

import './SearchBar.css';

export const SearchBar = (props) => {

    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search/${event.target[0].value}`)
    } 

    return (
        <form className="container" onSubmit={handleSearch}>
            <input type="search" placeholder="Search..." required/>
            <div className="search"></div>
        </form>
    )
}

