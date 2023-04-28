const PORT = process.env.PORT || 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4:uuid4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const axios = require('axios');
const { Server } = require('socket.io')
require('dotenv').config({ path: '../.env' })

const uri = process.env.MONGODB_URI
const newsApiKey = process.env.NEWS_API_KEY

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}


const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri)
  const {email, password} = req.body
  const generateUserId = uuid4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const existingUser = await users.findOne({email})

    if(existingUser) {
      return res.status(409).send('User already exists. Please login')
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashedPassword: hashedPassword
    }

    const insertedUser = await users.insertOne(data)

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    })

    res.status(201).json({ token, userId: generateUserId  })
  } catch (err) {
    console.log(err)
  }

})

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const user = await users.findOne({ email })


    if (user && user.hashedPassword) {
      const correctPassword = await bcrypt.compare(password, user.hashedPassword)

      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({ token, userId:user.user_id })
      return
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
    console.log('error')
  }
})

app.get('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: userId }
    const user = await users.findOne(query)
    res.send(user)
  } finally {
    await client.close()
  }
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('test')
    const users = database.collection('users')

    const returnedUsers = await users.find().toArray()
    res.send(returnedUsers)
  } finally {
    await client.close()
  }

})

app.get('/articles', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`, {
      withCredentials: false
    });
    res.json(response.data.articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const formData = req.body.formData

  console.log(formData)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: formData.user_id }
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        interest: formData.interest,
      }
    }
    const insertedUser = await users.updateOne(query, updateDocument)
    res.send(insertedUser)
  }finally {
    await client.close()
  }


})

app.put('/add-article', async (req, res) => {
  const client = new MongoClient(uri)
  const { userId, article } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const chats = database.collection('chats')

    const query = { user_id: userId }
    const user = await users.findOne(query)
    if (user) {
      const bookmark = user.bookmark || []
      const articleUrl = article.articleUrl

      // Check if the article has already been bookmarked
      if (!bookmark.some(item => item.articleUrl === articleUrl)) {
        bookmark.push(article)
        const updateDocument = {
          $set: {
            bookmark: bookmark
          }
        }
        await users.updateOne(query, updateDocument)

        // Check if there's already a chat for this article
        const chat = await chats.findOne({ articleUrl: articleUrl })
        if (chat) {
          // Add the user to the existing chat
          const chatUsers = chat.users || []
          if (!chatUsers.includes(userId)) {
            chatUsers.push(userId)
            await chats.updateOne({ articleUrl: articleUrl }, { $set: { users: chatUsers } })
          }
        } else {
          // Create a new chat for this article
          const chatData = {
            articleUrl: articleUrl,
            users: [userId],
            messages: []
          }
          // Use the "upsert" option to ensure that only one document is inserted
          await chats.updateOne({ articleUrl: articleUrl }, { $set: chatData }, { upsert: true })
        }

        res.send({ success: true })
      } else {
        res.send({ success: false, message: 'Article already bookmarked' })
      }
    } else {
      res.send({ success: false, message: 'User not found' })
    }
  } finally {
    await client.close()
  }
})



app.delete('/delete-bookmark', async(req, res) => {
  const client = new MongoClient(uri)
  // const userId = req.query.userId
  // const articleUrl = req.query.articleUrl
  // console.log(userId, articleUrl)
  const { userId, articleUrl } = req.query
  console.log(articleUrl)
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    // Find the user with the specified userId
    const user = await users.findOne({ user_id: userId });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Remove the bookmark with the specified articleUrl
    // const updatedBookmarks = user.bookmark.filter((bookmark) => bookmark.articleUrl !== articleUrl);

    // Update the user's bookmark field in the database
    await users.updateOne(
      { user_id: userId },
      { $pull: { bookmark: { title: articleUrl } } },
    );

    res.status(200).send('Bookmark deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting bookmark');
  } finally {
    await client.close();
  }
})

app.get('/messages', async (req, res) => {
  const client = new MongoClient(uri)
  const { userId, correspondingBookmarkId } = req.query
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('app-data');
    const chats = database.collection('chats')

    //Find Chat with the BookmarkId
    const response = await chats.findOne({articleUrl: correspondingBookmarkId})
    res.send(response)
    console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
})

app.put('/message', async(req, res) => {
  const client = new MongoClient(uri)
  const message = req.body.message
  const chatId = req.body.message.chatId
  console.log(chatId)

  try {
    await client.connect()
    const database = client.db('app-data')
    const messages = database.collection('chats')
    
    const query = { articleUrl: chatId }
    const chat = await messages.findOneAndUpdate(
      query,
      { $push: { messages: message } },
      { returnOriginal: false }
    )
    
    res.send(chat)
  } catch(error) {
    console.log(error)
  } finally {
    await client.close()
  }
})

const server = app.listen(PORT, () => {
  console.log('Server running on PORT ' + PORT)
});

const io = new Server(server, { cors: { origin: '*' } });