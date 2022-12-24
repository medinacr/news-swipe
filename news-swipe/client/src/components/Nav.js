import blueLogo from '../images/logo_blue.png'
import whiteLogo from '../images/logo_white.png'
import '../Nav.css'

const Nav = ({minimal, setShowModal, showModal, setIsSignUp}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }
  const authToken = true
  return (
    <nav>
        <div className="logo__container">
          <img src={minimal ?  blueLogo: whiteLogo} alt="logo" className="logo" />
        </div>

        {!authToken && !minimal && 
        <button className='nav__button'
        onClick={handleClick}
        disabled={showModal}
        >Log in</button>}
    </nav>
    
  )
}

export default Nav