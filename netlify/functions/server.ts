import express from "express";
import serverless from "serverless-http";
import app from "../../server";

export const handler = serverless(app);
