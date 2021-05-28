import {Router} from "express";

const oauthRouter = Router()

oauthRouter.post('/oauth/token', (req, res) => {
  res.send({
      "access_token": "02DU0_xOWE1Hn-pmIGuc6tFBilU",
      "token_type": "bearer",
      "refresh_token": "N6LgoQgbIklnDhz3VgbaxHJ6oKQ",
      "expires_in": 43199,
      "scope": "api",
      "OAuth2.SESSION_ID": "F55D157FF35E6BBB6B69F7F3DD56B746"
    }
  )
})

oauthRouter.post('/oauth/revoke', (req, res) => {
  res.status(200).end()
})


export {
  oauthRouter
}