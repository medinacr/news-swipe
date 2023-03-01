const PORT = 8000 
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4:uuid4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const uri = "mongodb+srv://medinacr:chivas1!1@cluster0.wrhygrb.mongodb.net/?retryWrites=true&w=majority"

const app = express()
app.use(cors())
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

    const correctPassword = await bcrypt.compare(password, user.hashedPassword)

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({ token, userId:user.user_id })
      return
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
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

    const query = { user_id: userId }
    const user = await users.findOne(query)
    if (user) {
      const bookmark = user.bookmark || []
      const articleUrl = article.articleUrl
      if (!bookmark.some(item => item.articleUrl === articleUrl)) {
        bookmark.push(article)
        const updateDocument = {
          $set: {
            bookmark: bookmark
          }
        }
        await users.updateOne(query, updateDocument)
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
























app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

 