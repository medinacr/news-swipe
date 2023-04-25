import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import '../Dashboard.css'
import BookmarkContainer from '../components/BookmarkContainer'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [articles, setArticles] = useState([]);
  const [lastDirection, setLastDirection] = useState()
  const [bookmarkDeleted, setBookmarkDeleted] = useState(false)


  const userId = cookies.UserId

  const handlebookmarkDeleted = () => {
    setBookmarkDeleted(!bookmarkDeleted)
  }

  const getUser = async () => {
    try{
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])


  useEffect(() => {
      const getArticles = async() => {
      const res = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=f96287ec08a647b1a31a1548af42d678",{
        withCredentials: false
      })

      setArticles(res.data.articles)
      console.log(res)
    };

    getArticles();
  }, [])

  // const updatedMatches = async (matchedUserId) => {
  //   try {
  //     await axios.put('http://localhost:3000/addmatch', {
  //       userId, 
  //       matchedUserId
  //     })
  //     getUser()
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const swiped = async (direction, article) => {
    
    const { url: articleUrl, title, urlToImage } = article;
    console.log('swiped')
    if(direction === 'right') {
       try {
        await axios.put('http://localhost:8000/add-article', {
          userId, 
          article: { articleUrl, title, urlToImage }
        })
        getUser()
       } catch (err) {
        console.log(err)
       }
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
    { user &&
    <div className="dashboard">
      <BookmarkContainer user={user} getUser={getUser} />
      <div className="swipe-container">
        <div className="card-container">

          {articles.map((article) =>
            <TinderCard 
              className='swipe' 
              key={article.title} 
              onSwipe={(dir) => swiped(dir, article)}
              preventSwipe={['up', 'down']}
              onCardLeftScreen={() => outOfFrame(article.description)}>
              <div style={{ backgroundImage: 'url(' + (article.urlToImage || 'https://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/torman_demo1/files/nature-hollywood.jpg?m=1519841272&itok=3RYGrGr8') + ')' }} className='card-'>
                <a href={article.url} target="_blank" rel="noreferrer">
                <h3>{article.title}</h3>
                </a>
              </div>
            </TinderCard>
          )} 
           <div className='buttons'>
                  <button onClick={() => swiped('left', articles)}>Swipe left!</button>
                  <button onClick={() => swiped('right', articles)}>Swipe right!</button>
            </div>

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Dashboard