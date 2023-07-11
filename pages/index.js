import Link from "next/link";

const Home = () => {
  return (
    <div className="main">
      <article className="main-info-container">
        <h1>A Simple Scheduling App</h1>
        <p>
         This app allows you to find various training courses around the world.
        </p>
        <div className="button-container">
          <Link href='/search' className="primary">
            Try for Free
          </Link>
          <Link href='/search' className="secondary">
            Tell me more about this App
          </Link>
        </div>
        <Link href='/search'>Browse Classes and Appointments</Link>
      </article >
    </div >
  )
}

export default Home;