import Link from "next/link";
import '../styles/globals.css';
import { useState, createContext } from "react";
import SearchBar from "../components/SearchBar";
import LoginBar from "../components/LoginBar";

export const searchContext = createContext(null)

const App = ({ Component, pageProps }) => {
  const [searchTerm, setSearchTerm] = useState(null)
  return (
    <>
      <searchContext.Provider value={[searchTerm, setSearchTerm]}>
        <header>
          <Link href='/'>
            <h3 className="home-page">Home</h3>
          </Link>
          <SearchBar />
          <LoginBar />
        </header>
        <Component {...pageProps} />
      </searchContext.Provider>
    </>
  )
}

export default App;