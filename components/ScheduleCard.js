import moment from "moment/moment";
import { myWixClient } from "../helpers";

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