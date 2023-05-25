import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          '/users/search?username=' + searchInput
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchInput.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const handleSearchBarClick = () => {
    setSearchInput('');
    setSearchResults([]);
    searchInputRef.current.focus();
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="topbartitle">SANCHAR</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar" onClick={handleSearchBarClick}>
          <Search className="searchIcon" />
          <input
            ref={searchInputRef}
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {searchResults.length > 0 && (
          <ul className="searchResults">
            {searchResults.map((result) => (
              <li key={result._id}>
                <Link to={`/profile/${result.username}`}>
                  {result.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HOMEPAGE</span>
          <span className="topbarLink">TIMELINE</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat className="icon" />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt="profile"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
