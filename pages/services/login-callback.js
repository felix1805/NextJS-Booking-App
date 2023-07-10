import { useState, useEffect } from "react";
import { redirects } from "@wix/redirects";
import { availabilityCalendar, services } from "@wix/bookings";
import { createClient, OAuthStrategy } from "@wix/api-client";
import Cookies from "js-cookie";

const myWixClient = createClient({
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: JSON.parse(Cookies.get('session') || null),
  })
})

const loginCallback = () => {
  const [nextPage, setNextPage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const verifyLogin = async () => {
    const data = JSON.parse(localStorage.getItem('oauthRedirectData'))
    localStorage.removeItem('oauthRedirectData')
    try {
      const { code, state } = myWixClient.auth.parseFromUrl()
      let tokens = await myWixClient.auth.getMemberTokens(code, state, data)
      while (!tokens?.refreshToken?.value) {
        tokens = await myWixClient.auth.getMemberTokens(code, state, data)
      }
      Cookies.set('session', JSON.stringify(tokens))
      window.location = data?.originalUri || '/'
    } catch (err) {
      setNextPage(data?.originalUri || '/')
      setErrorMessage(err.toString())
    }
  }
  useEffect(() => {
    verifyLogin()
  }, [])
  return (
    <article>
      {errorMessage && <p>{errorMessage}</p>}
      {nextPage ? <a href={nextPage}>Continue</a> : <>Loading...</>}
    </article>
  )
}

export default loginCallback;
