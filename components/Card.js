import { media } from "@wix/api-client";

const Card = ({ service }) => {

  const image = media.getImageUrl(service.media.mainMedia.image)

  return (
    <article className="card">
      <div className="info-container">
        <div className="img-container">
          <img
            src={image.url}
            alt={service.name}
          />
        </div>
        <div className="text-container">
          <h3>{service.name}</h3>
          <p>{service.tagLine}</p>
        </div>
      </div>
      <div className="description-container">
        <p>{service.description}</p>
      </div>
    </article>
  )
}

export default Card;