import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { createClient, OAuthStrategy } from "@wix/api-client";
import { availabilityCalendar, services } from "@wix/bookings";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";
import ScheduleCard from "@/components/ScheduleCard";

const myWixClient = createClient({
  modules: { services, availabilityCalendar, redirects },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: JSON.parse(Cookies.get('session') || null),
  })
})

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
            {/* {Image Placeholder} */}
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
           {/* {MiniMap} */}
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