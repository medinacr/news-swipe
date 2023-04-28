import Nav from '../components/Nav'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../Signup.css'
import { IconButton } from '@mui/material';

const handleSubmit = ()=> {

}

const Interest = () => {
  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
      <div className='signup'>
        <h2>Select up to 5 interests</h2>

        <form onSubmit={handleSubmit}>
          <section>
              
          </section>
          <IconButton>
           <ArrowForwardIosIcon fontSize='large' />
          </IconButton>
        </form>
      </div>
    </>
  )
}

export default Interest