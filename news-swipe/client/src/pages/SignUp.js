import { useState } from 'react'
import Nav from '../components/Nav'
import '../Signup.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [cookies] = useCookies(['user'])
    const [formData, setFormData] = useState({
      user_id: cookies.UserId,
      first_name: "",
      interest: [],
      bookmarks: {},
      matches: []
    })

    let navigate = useNavigate()
 
    const handleSubmit = async (e)=> {
        e.preventDefault()
        console.log(formData)
        try {
          const response = await axios.put('http://localhost:8000/user', { formData })
          const success = response.status === 200
          if(success) navigate('/dashboard')
        } catch(err) {
          console.log(err)
        }
    };

    const handleChange = (e) => {
      const value = e.target.value
      const name = e.target.name
    
      if(e.target.type === "checkbox") {
        if(formData.interest.includes(value)) {
          setFormData(prevState => ({
            ...prevState,
            interest: prevState.interest.filter(i => i !== value)
          }))
        } else {
          setFormData(prevState => ({
            ...prevState,
            interest: [...prevState.interest, value]
          }))
        }
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
      }
    }

    console.log(formData)

    return (
      <>
        <Nav
          minimal={true}
          setShowModal={() => {}}
          showModal={false}
        />
        <div className='signup'>
          <h2>CREATE ACCOUNT</h2>

          <form onSubmit={handleSubmit}>
            <section>
              <label htmlFor='first_name'>First Name</label>
              <input 
                id='first_name'
                type='text'
                name='first_name'
                placeholder='First Name'
                required={true}
                value={formData.first_name}
                onChange={handleChange}
                />
                <label htmlFor='ChooseInterest'>Choose Interests</label>
                <div className="multiple__input__container interest__container">
                  
                  <input
                    id='music'
                    type='checkbox'
                    name='interest_music'
                    value='music'
                    onChange={handleChange}
                  />
                  <label htmlFor='music'>Music</label>

                  <input
                    id='sports'
                    type='checkbox'
                    name='interest_sports'
                    value='sports'
                    onChange={handleChange}
                  />
                  <label htmlFor='sports'>Sports</label>
                  
                  <input
                    id='entertainment'
                    type='checkbox'
                    name='interest_entertainment'
                    value='entertainment'
                    onChange={handleChange}
                  />
                  <label htmlFor='entertainment'>Entertainment</label>
                  
                  <input
                    id='gaming'
                    type='checkbox'
                    name='interest_gaming'
                    value='gaming'
                    onChange={handleChange}
                  />
                  <label htmlFor='gaming'>Gaming</label>
                  
                  <input
                    id='football'
                    type='checkbox'
                    name='interest_football'
                    value='football'
                    onChange={handleChange}
                  />
                  <label htmlFor='football'>Football</label>      

                  <input
                    id='breaking_news'
                    type='checkbox'
                    name='interest_breaking-news'
                    value='breaking-news'
                    onChange={handleChange}
                  />
                  <label htmlFor='breaking_news'>Breaking News</label>

                  <input
                    id='technology'
                    type='checkbox'
                    name='interest_technology'
                    value='technology'
                    onChange={handleChange}
                  />
                  <label htmlFor='technology'>Technology</label>

                  <input
                    id='business'
                    type='checkbox'
                    name='interest_business'
                    value='business'
                    onChange={handleChange}
                  />
                  <label htmlFor='business'>Business</label>

                  <input
                    id='science'
                    type='checkbox'
                    name='interest_science'
                    value='science'
                    onChange={handleChange}
                  />
                  <label htmlFor='science'>Science</label>

                  <input
                    id='health'
                    type='checkbox'
                    name='interest_health'
                    value='health'
                    onChange={handleChange}
                  />
                  <label htmlFor='health'>Health</label>

                  <input
                    id='world'
                    type='checkbox'
                    name='interest_world'
                    value='world'
                    onChange={handleChange}
                  />
                  <label htmlFor='world'>World</label>
                </div>
                
                <input type='submit'/>
            </section>

          </form>

        </div>
      </>
    )
}

export default SignUp