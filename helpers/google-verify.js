const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

async function googleVerify( idToken = '' ) {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });

  const { name: name, 
          picture: img, 
          email: email 
        } = ticket.getPayload();

  return  { name, img, email };

};

module.exports = { googleVerify };