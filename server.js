const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // ObjectId for deleting by _id

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port on Render

// --- IMPORTANT ---
// You must set this environment variable in your Render.com dashboard.
// It should look something like: mongodb+srv://<user>:<password>@cluster.mongodb.net/
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'portfolio'; // Or whatever you named your database
const COLLECTION_NAME = 'lyrics';

// Add a check to ensure the MongoDB URI is set in the environment
if (!MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI environment variable is not set. The application cannot start.');
    process.exit(1); // Exit the process with an error code
}

let db;
let lyricsCollection;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

const client = new MongoClient(MONGODB_URI);

async function startServer() {
    try {
        // 1. Connect the client to the server
        await client.connect();
        console.log('Connected successfully to MongoDB');

        // 2. Set up DB and collection variables
        db = client.db(DB_NAME);
        lyricsCollection = db.collection(COLLECTION_NAME);

        // 3. Start the Express server
        app.listen(PORT, () => {
            console.log(`Lyrics Backend running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

startServer();
// Routes

// 1. Get all lyrics
app.get('/api/lyrics', async (req, res) => {
    if (!lyricsCollection) {
        return res.status(503).json({ error: 'Database not connected' });
    }
    try {
        // Find all lyrics and sort by date added (newest first)
        const lyrics = await lyricsCollection.find().sort({ _id: -1 }).toArray();
        res.json(lyrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lyrics' });
    }
});

// 2. Add a new lyric
app.post('/api/lyrics', async (req, res) => {
    if (!lyricsCollection) {
        return res.status(503).json({ error: 'Database not connected' });
    }
    const { title, artist, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and Content are required.' });
    }

    const newLyric = {
        title,
        artist: artist || 'Unknown Artist',
        content,
        date: new Date() // Store as a proper date object
    };

    try {
        const result = await lyricsCollection.insertOne(newLyric);
        const insertedDoc = { ...newLyric, _id: result.insertedId };
        res.status(201).json(insertedDoc);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add lyric' });
    }
});

// 3. Delete a lyric
app.delete('/api/lyrics/:id', async (req, res) => {
    if (!lyricsCollection) {
        return res.status(503).json({ error: 'Database not connected' });
    }
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid lyric ID format' });
    }

    try {
        const result = await lyricsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Lyric not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete lyric' });
    }
});