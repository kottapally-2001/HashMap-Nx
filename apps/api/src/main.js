const express = require('express');
const cors = require('cors');
const HashMap = require('./hashmap');

const app = express();
app.use(cors());
app.use(express.json());

const map = new HashMap();

// Initial dummy data
map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray'); 
map.set('frog', 'green'); 
map.set('grape', 'purple'); 
map.set('hat', 'black'); 
map.set('ice cream', 'white'); 
map.set('jacket', 'blue,black'); 
map.set('kite', 'pink,white,blue,silver,red'); 
map.set('lion', 'golden');
map.set('rose', 'red');
map.set('sunflower', 'yellow');
map.set('sky', 'blue');
map.set('grass', 'green');
map.set('peach', 'pink,orange');
map.set('peacock', 'blue,green,golden');
map.set('rainbow', 'red,orange,yellow,green,blue,indigo,violet');
map.set('ocean', 'blue,green');
map.set('lava', 'red,orange,yellow');
map.set('cloud', 'white,gray');
map.set('penguin', 'black,white');
map.set('zebra', 'black,white');
map.set('parrot', 'green,red,yellow,blue');
map.set('butterfly', 'orange,black');
map.set('rose gold', 'pink,golden');
map.set('robot', 'silver,gray,black');
map.set('snow', 'white');
map.set('sand', 'yellow,brown');
map.set('diamond', 'silver,white,blue');
map.set('coffee', 'brown,black');
map.set('forest', 'green,darkgreen');
map.set('fireworks', 'red,blue,green,purple,yellow');
map.set('unicorn', 'pink,purple,blue,white');
map.set('tiger', 'orange,black');
map.set('dragon', 'red,golden,black');
map.set('moon', 'silver,white');
map.set('star', 'yellow,white,silver');
map.set('marble', 'white,gray,black');
map.set('helmet', 'silver,black,blue');
map.set('thermos', 'red,black,silver');
map.set('spaceship', 'white,silver,black');
map.set('rocket', 'red,white,black,silver');
map.set('nebula', 'purple,pink,blue,magenta');
map.set('planet', 'brown,blue,green,gray');


// GET ALL ENTRIES
app.get('/entries', (req, res) => {
  res.json(map.entries());
});

// GET VALUE
app.get('/get/:key', (req, res) => {
  const { key } = req.params;
  const value = map.get(key);
  res.json({ key, value });
});

// SET KEY VALUE
app.post('/set', (req, res) => {
  const { key, value } = req.body;
  if (!key || value == null) {
    return res.status(400).json({ error: "key and value required" });
  }
  map.set(key, value);
  res.json({ message: "set success", entries: map.entries() });
});

// REMOVE KEY
app.delete('/remove/:key', (req, res) => {
  const { key } = req.params;
  const removed = map.remove(key);
  res.json({ removed, entries: map.entries() });
});

// CHECK STATS
app.get('/stats', (req, res) => {
  res.json({
    size: map.length(),
    capacity: map.capacity,
    loadFactor: map.loadFactor
  });
});

app.listen(3001, () => console.log('API running at http://localhost:3001'));
