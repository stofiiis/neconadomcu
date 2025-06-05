const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'stories.json');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Helper function to read stories from file
function readStories() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading stories:', err);
        return [];
    }
}

// Helper function to write stories to file
function writeStories(stories) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(stories, null, 2));
    } catch (err) {
        console.error('Error writing stories:', err);
    }
}

// GET /stories - return all stories
app.get('/stories', (req, res) => {
    const stories = readStories();
    res.json(stories);
});

// POST /stories - add a new story
app.post('/stories', (req, res) => {
    const { story, anonymous } = req.body;
    if (!story || typeof story !== 'string' || story.trim() === '') {
        return res.status(400).json({ error: 'Story text is required' });
    }
    const stories = readStories();
    stories.push({ story: story.trim(), anonymous: !!anonymous });
    writeStories(stories);
    res.status(201).json({ message: 'Story added' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
