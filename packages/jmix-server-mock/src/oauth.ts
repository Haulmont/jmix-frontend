import {Request, Router} from "express";

const createOauthRouter = (allowInvalidCreds) => {

  const oauthRouter = Router()

  oauthRouter.post('/oauth/token', (req, res) => {
    const {username, password} = getCreds(req);

    let accessToken;
    let refreshToken;
    let sessionId;

    if (username === 'admin' && password === 'admin') {
      accessToken = '-xMM4dlsCNjGtYviFArebBXep7w'
      refreshToken = 'yi2VX-JIHdd04EKlysV4SoxSVDA'
      sessionId = '9563D73FA2ADCD6774BAAA06984EE2E7'
    }

    if (username === 'user1' && password === 'user1') {
      accessToken = 'XONNmH89K2JKGu-To-oPNj1mk9o'
      refreshToken = 'HP8abXBteTinzbZkXSW3OoKrCuQ'
      sessionId = 'CD85C80F32231478C77D9355DC8769F8'
    }

    if (username === 'user2' && password === 'user2') {
      accessToken = 'EY5etaIDPNMj3WF4T4CdTlCPm34'
      refreshToken = '6sEqd3xnTt3AnlaRbg4dUF21WZA'
      sessionId = 'F4615CFFBAD97FB28431AE644EEEDD8D'
    }

    if (accessToken == null) {

      if (allowInvalidCreds === false) {
        return res.status(400).send({
          "error": "invalid_grant",
          "error_description": "Bad credentials"
        })
      }

      accessToken = '02DU0_xOWE1Hn-pmIGuc6tFBilU';
      refreshToken = 'N6LgoQgbIklnDhz3VgbaxHJ6oKQ';
      sessionId = 'F55D157FF35E6BBB6B69F7F3DD56B746';
    }

    res.send({
        "access_token": `${accessToken}`,
        "token_type": "bearer",
        "refresh_token": `${refreshToken}`,
        "expires_in": 43199,
        "scope": "api",
        "OAuth2.SESSION_ID": `${sessionId}`
      }
    )
  })

  oauthRouter.post('/oauth/revoke', (req, res) => {
    res.status(200).end()
  })

  return oauthRouter;

}

const getCreds = (req: Request) => {
  const username = req?.body?.username;
  const password = req?.body?.password;
  return {username, password};
}

export {
  createOauthRouter
}

