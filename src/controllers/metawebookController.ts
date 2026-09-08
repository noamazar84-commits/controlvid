export const handleMetawebookVerify = (req: any, res: any) => {
  return res.status(200).send(req.query["hub.challenge"] || "OK");
};

export const metawebookController = {};
export type MetawebookEvent = any;
