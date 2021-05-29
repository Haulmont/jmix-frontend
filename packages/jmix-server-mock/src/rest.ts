import {Router} from "express";

const restRouter = Router()

restRouter.get('/rest/userInfo', (req, res) => {
  res.send({"username":"admin","locale":"en"})
})

restRouter.get('/rest/permissions', (req, res) => {
  res.send({
    "entities": [],
    "entityAttributes": [],
    "specifics": [{"target": "rest.fileDownload.enabled", "value": 1}, {
      "target": "rest.fileUpload.enabled",
      "value": 1
    }]
  })
})

restRouter.get('/rest/messages/entities', (req, res) => {
  res.send({})
})

export {
  restRouter
}