import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Card from "../components/Card";
import { searchContext } from "../pages/_app";
import Map from "../components/Map";
import { myWixClient } from "../helpers";


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

  let coords = serviceList.map((serviceItem) => serviceItem.locations[0].business.address.location)

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
      <Map coords={coords} />
    </div>
  )
}

export default Search;