import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { createClient, OAuthStrategy } from "@wix/api-client";
import { services } from "@wix/bookings";
import Cookies from "js-cookie";
import Card from "../components/Card";
import { searchContext } from "./_app";

const myWixClient = createClient({
  modules: { services },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: JSON.parse(Cookies.get('session') || null),
  })
})

const Search = () => {
  const [serviceList, setServiceList] = useState([])
  const [searchTerm, setSearchTerm] = useContext(searchContext)

  const fetchServices = async () => {
    let serviceList
    if (searchTerm) {
      serviceList = await myWixClient.services.queryServices().startsWith('name', decodeURIComponent(searchTerm)).find()
    } else {
      serviceList = await myWixClient.services.queryServices().find()
    }
    setServiceList(serviceList.items)
  }

  useEffect(() => {
    fetchServices()
  }, [searchTerm])

  console.log(serviceList)

  return (
    <div className="search-container">
      <div className="results-container">
        <h2>Choose Class:</h2>
        <ul>
          {serviceList.map((service) =>
            <li key={service._id}>
              <Link className="card-link" href={`/services/${encodeURIComponent(service.mainSlug.name)}`}>
                <Card service={service} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Search;