module.exports = {
  port: process.env.PORT || 8081,
  db: process.env.DB || 'mongodb://localhost/mevn',
  authentication: {
    jwtSecretKey: process.env.SECRET || 'secret',
    jwtExpiration: process.env.EXPIRATION || '1d'
  }
}