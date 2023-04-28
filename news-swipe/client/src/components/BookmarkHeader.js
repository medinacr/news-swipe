import "../ChatContainer.css"
import { useCookies } from 'react-cookie'

const BookmarkHeader = ( { user } ) => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
  console.log('bookmarkHeader:' , user)
  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.pathname = '/'
  }

  return (
    <div className="bookmark-container-header">
      <div className="img-container">
        <img src=""/>
        <h3>{user.first_name}</h3>
      </div>
      <i className="log-out-icon" onClick={logout}>&#8592;</i>
    </div>
  )
}

export default BookmarkHeader