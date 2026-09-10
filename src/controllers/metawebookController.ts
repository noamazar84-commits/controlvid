export const handleMetawebookVerify = (req: any, res: any) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};

export const handleMetawebookEvent = (req: any, res: any) => {
  res.sendStatus(200);
};
