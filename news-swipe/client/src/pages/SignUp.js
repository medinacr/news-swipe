import { useState } from 'react'
import Nav from '../components/Nav'
import '../Signup.css'



const SignUp = () => {
    const [formData, setFormData] = useState({
      user_id: "",
      first_name: "",
      interest: [],
      email: "",
      url: "", 
    })
 
    const handleSubmit = ()=> {

    };

    const handleChange = (e)=> {
      const value = e.target.value
      const name = e.target.name
      console.log(e.target.checked)

      setFormData((prevState) => ({
        ...prevState,
        [name] : value
      }))
    };

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
                    name='interest'
                    value='music'
                    onChange={handleChange}
                  />
                  <label htmlFor='music'>Music</label>

                  <input
                    id='sports'
                    type='checkbox'
                    name='interest'
                    value='sports'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='sports'>Sports</label>
                  
                  <input
                    id='entertainment'
                    type='checkbox'
                    name='interest'
                    value='entertainment'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='entertainment'>Entertainment</label>
                  
                  <input
                    id='gaming'
                    type='checkbox'
                    name='interest'
                    value='gaming'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='gaming'>Gaming</label>
                  
                  <input
                    id='football'
                    type='checkbox'
                    name='interest'
                    value='football'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='football'>Football</label>      

                  <input
                    id='breaking_news'
                    type='checkbox'
                    name='interest'
                    value='breaking-news'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='breaking_news'>Breaking News</label>

                  <input
                    id='technology'
                    type='checkbox'
                    name='interest'
                    value='technology'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='technology'>Technology</label>

                  <input
                    id='business'
                    type='checkbox'
                    name='interest'
                    value='business'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='business'>Business</label>

                  <input
                    id='science'
                    type='checkbox'
                    name='interest'
                    value='science'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='science'>Science</label>

                  <input
                    id='health'
                    type='checkbox'
                    name='interest'
                    value='health'
                    onChange={handleChange}
                    checked={false}
                  />
                  <label htmlFor='health'>Health</label>

                  <input
                    id='world'
                    type='checkbox'
                    name='interest'
                    value='world'
                    onChange={handleChange}
                    checked={false}
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