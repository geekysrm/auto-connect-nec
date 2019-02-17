const getAuthToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    
      if(typeof authHeader !== 'undefined')
      {
        const token = authHeader.split(' ')[1];
    
        req.token = token;
    
        next();
      }
      else
      {
        res.sendStatus(403);
      }

}

module.exports = getAuthToken;
