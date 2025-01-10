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

    if (err){
        console.log(err);

        return res.status(500).json({
            status: "KO",
            message: 'Database query failed'
        })
        
    };


    const movies = results.map((movie) => ({
      ...movie,
      //    image: generateCover(movie.image),
    }));

    res.json({
      message: "ok",
      movies,
    });
  });
}

function show(req, res) {
    const movieId= req.params.id;
    const sqlMovie = `
    SELECT id, title, director, genre, release_year, image 
    FROM movies
    WHERE id = ?`;
    connection.query(sqlMovie,[movieId], (err, results) =>{
        if (err){
            console.log(err);
    
            return res.status(500).json({
                status: "KO",
                message: 'Database query failed'
            })
            
        };

        const [movie] = results

        
    res.json({
        message: "ok",
        movie,
      });
    })
    
}

const generateCover = (coverName) => {
  const { HOST_PORT, HOST_DOMAIN } = process.env;
  `${HOST_DOMAIN}:${HOST_PORT}/img/${coverName}`;
};

module.exports = { index, show };
