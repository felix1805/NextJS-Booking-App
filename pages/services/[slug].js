import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ScheduleCard from "../../components/ScheduleCard";
import MiniMap from "../../components/MiniMap";
import MainImage from "../../components/MainImage";
import { myWixClient } from "../../helpers";


const ServicePage = () => {
  const [service, setService] = useState(null)
  const [availabilityEntries, setAvailabilityEntries] = useState([])
  const router = useRouter()

  const fetchService = async () => {
    if (router.query.slug) {
      const serviceItem = await myWixClient.services.queryServices().eq('mainSlug.name', decodeURIComponent(router.query.slug)).find()
      setService(serviceItem.items[0])
    }
  }

  const fetchAvailability = async () => {
    const today = new Date()
    const oneWeek = new Date(today)
    oneWeek.setDate(oneWeek.getDate() + 7)
    const availability = await myWixClient.availabilityCalendar.queryAvailability({
      filter: {
        serviceId: [service._id],
        startDate: today.toISOString(),
        endDate: oneWeek.toISOString()
      }
    }, { timezone: 'EST' })
    setAvailabilityEntries(availability.availabilityEntries)

  }

  useEffect(() => {
    fetchService()
  }, [router.query.slug])

  useEffect(() => {
    if (service) fetchAvailability()
  }, [service])

  console.log('availabilityEntries', availabilityEntries)
  console.log('service', service)

  return (
    <>
      {service &&
        <article className="service-container">
          <div className="info-container">
            <MainImage service={service} />
            <h2>{service.name}</h2>
            <p>{service.tagLine}</p>
            <p>{service.description}</p>
            <hr />
            <h3>Schedule</h3>
            {availabilityEntries.map((availabilityEntry) =>
              <ScheduleCard
                key={Object.keys(availabilityEntry)}
                availabilityEntry={availabilityEntry}
              />
            )}
          </div>
          <div className="address-container">
            <MiniMap
              lng={service.locations[0].business.address.location.longitude}
              lat={service.locations[0].business.address.location.latitude}
            />
            <p>➡️{service.locations[0].business.address.formatted}</p>
            <p>➡️{service.locations[0].business.address.city}</p>
            <p>➡️{service.locations[0].business.address.country}</p>
          </div>
        </article>
      }
    </>
  )
}

export default ServicePage;