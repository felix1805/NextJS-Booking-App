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
  return (
    <button>
      <p>{startDay}</p>

    </button>
  )
}

export default ScheduleCard;  