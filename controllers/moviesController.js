const connection = require("../db/conn");

function index(req, res) {
  const sql = `
    SELECT 
    id, 
    title, 
    director, 
    genre, 
    release_year, 
    image 

    FROM movies`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }

    const movies = results.map((movie) => ({
      ...movie,
      image: generateCover(movie.image),
    }));
    console.log(movies);

    res.json({
      message: "ok",
      movies,
    });
  });
}

function show(req, res) {
  const movieId = req.params.id;
  const sqlMovie = `
    SELECT id, title, director, genre, release_year, image 
    FROM movies
    WHERE id = ?`;
  connection.query(sqlMovie, [movieId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }
    const [movie] = results;

    res.json({
       status: "KO",
        message: "Database query failed"
    });
  });
}

function createReview(req, res) {
  const movieId = req.params.id;
  const { name, vote, text } = req.body;

  const sql = `
  INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);
`;
connection.query(sql, [movieId, name, vote, text], (err) => {
  if (err) {
    console.log(err);

    return res.status(500).json({
      status: "KO",
      message: "Database query failed",
    });
  }

  res.json({
    status: "ok",
    message: "Review added",
  });
});
}

const generateCover = (coverName) => {
  const { HOST_PORT, HOST_DOMAIN } = process.env;
  return `${HOST_DOMAIN}:${HOST_PORT}/public/img/${coverName}`;
};
// console.log(generateCover);

module.exports = { index, show, createReview };
