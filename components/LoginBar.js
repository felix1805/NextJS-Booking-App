import { useEffect, useState } from "react";
import { createClient, OAuthStrategy } from "@wix/api-client";
import { members } from "@wix/members";
import Cookies from "js-cookie";

const myWixClient = createClient({
  modules: { members },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    tokens: JSON.parse(Cookies.get('session') || null),
  })
})

const LoginBar = () => {
  const [user, setUser] = useState('visitor')
  const [member, setMember] = useState(null)

  const fetchMember = async () => {
    const { member } = myWixClient.auth.loggedIn() ? await myWixClient.members.getMyMember() : {}
    setMember(member || undefined)
  }

  const login = async () => {
    const data = myWixClient.auth.generateOAuthData(`${window.location.origin}/login-callback`)
    localStorage.setItem('oauthRedirectData', JSON.stringify(data))
    const { authUrl } = await myWixClient.auth.getAuthUrl(data)
    window.location = authUrl
  }

  const logout = async () => {
    const { logoutUrl } = await myWixClient.auth.logout(window.location.href)
    Cookies.remove('session')
    window.location = logoutUrl
  }

  useEffect(() => {
    fetchMember()
  }, [])

  useEffect(() => {
    if (myWixClient.auth.loggedIn()) {
      setUser(member?.profile?.nickname || member?.profile?.slug || '')
    } else {
      setUser('visitor')
    }
  }, [myWixClient.auth.loggedIn(), user, member?.profile?.nickname, member?.profile?.slug])

  return (
    <nav>
      <div className="item-container">
        <p>Hello {user}</p>
      </div>
      {member !== null &&
        <button className="login"
          onClick={() => myWixClient.auth.loggedIn() ? logout() : login()}>
          {myWixClient.auth.loggedIn() ? "Log Out" : "Log In"}
        </button>}
      <div className="item-container">
        <button
          className="primary"
          onClick={login}
        >Try for free
        </button>
      </div>
    </nav>
  )

}

export default LoginBar;