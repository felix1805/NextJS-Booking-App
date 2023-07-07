import moment from "moment/moment";
import { createClient, OAuthStrategy } from "@wix/api-client";
import { availabilityCalendar, services } from "@wix/bookings";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";

const myWixClient = createClient({
  modules: { services, availabilityCalendar, redirects },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: JSON.parse(Cookies.get('session') || null),
  })
})

const ScheduleCard = ({ availabilityEntry }) => {
  const startDate = moment(availabilityEntry.slot.startDate, 'YYYY-MM-DD HH:mm:ss')
  const startDay = startDate.format('ddd MM yyyy')
  const startTime = startDate.format('HH:mm')
  const endTime = moment(availabilityEntry.slot.endDate, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')

  const createRedirect = async (slotAvailability) => {
    const redirect = await myWixClient.redirects.createRedirectSession({
      bookingsCheckout: { slotAvailability, timezone: 'EST' },
      callbacks: { postFlowUrl: window.location.href }
    })
    window.location = redirect.redirectSession.fullUrl
  }
  return (
    <button className="schedule-card-button" onClick={() => createRedirect(availabilityEntry)}>
      <p>{startDay}</p>
      <p>{startTime}</p>
      <p>{endTime}</p>
    </button>
  )
}

export default ScheduleCard;  