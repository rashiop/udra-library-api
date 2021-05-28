const express = require( 'express' );
const cors = require( 'cors' );

const app = express();

app.use( cors() );

const port = 3002

app.listen( port, () => {
  console.log( `server listening on http://localhost:${port}` )
} )

app.get( '/api', ( req, res ) => {
  res.send( 'connected' );
} )



module.exports = app;
