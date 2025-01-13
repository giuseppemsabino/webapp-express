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
    });
    
}

function update(req,res){

    const sql= `UPDATE movies.movies SET image = '' WHERE (id= ?);`
    connection.query(sql, [], (err,results)=>{
        if (err){
            console.log(err);
    
            return res.status(500).json({
                status: "KO",
                message: 'Database query failed'
            })
            
        };
    });


}

const generateCover = (coverName) => {
  const { HOST_PORT, HOST_DOMAIN } = process.env;
 return `${HOST_DOMAIN}:${HOST_PORT}/public/img/${coverName}`;
  
};
// console.log(generateCover);

module.exports = { index, show };
