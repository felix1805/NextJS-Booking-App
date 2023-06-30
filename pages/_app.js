import Link from "next/link";
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {

  return (
    <>
      <header>
        <Link href='/'>
          <h3>ClassPass</h3>
        </Link>
      </header>

      <Component {...pageProps} />
    </>

  )
}

export default App;