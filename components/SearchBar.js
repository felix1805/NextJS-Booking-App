import { useContext } from "react";
import { searchContext } from "../pages/_app";
import SearchIcon from "./SearchIcon";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useContext(searchContext)
  console.log('searchTerm', searchTerm)
  return (
    <div className="item-container">
      <div className="search-bar-container">
        <SearchIcon/>
        <input className="search-input"
          placeholder="Search classes here..."
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          />
      </div>
    </div>
  )
}

export default SearchBar;