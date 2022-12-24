import React, {useState} from 'react'
import TinderCard from 'react-tinder-card'
import '../TinderCards.css'

function TinderCards() {
  const [people, setPeople] = useState( [
    {
      name: "NewsWeek",
      url: "https://cdn.pixabay.com/photo/2022/12/02/18/37/middle-spotted-woodpecker-7631440_960_720.jpg"
    },
    {
      name: "The Verge",
      url: "https://media.istockphoto.com/id/1443082207/photo/middle-spotted-woodpecker-bird-on-the-tree.jpg?s=612x612&w=is&k=20&c=wlSH5g9QApWB3WYdInaJrwpkF4RKx-wMXehgPd1eeE8="
    }
  ] )

  return ( 
    <div>
      <div className='tinderCards__cardContainer'>
          {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up','down']}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
              >
                <h3>{person.name}</h3>
            </div>
          </TinderCard> 
          ))} 
      </div>
    </div>
  );
}

export default TinderCards;