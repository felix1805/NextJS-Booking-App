import Link from "next/link";

const Home = () => {
  return (
    <div className="main">
      <article className="main-info-container">
        <h1>A Simple Fitness App</h1>
        <p>
          This app will allow you to search for a gym that suits your needs anywhere in the world.
        </p>
        <div className="button-container">
          <button className="primary" 
          // onClick={login}
          >Try for Free</button>
          <button className="secondary" 
          // onClick={login}
          >Tell me more about this App</button>
        </div>
        <Link href='/search'>Browse Classes and Appointments</Link>
        <p className="disclaimer">
          **Disclaimer**
        </p>
      </article>
    </div>
  )
}

export default Home;