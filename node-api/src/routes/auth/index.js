import express from "express";
import {
  forgotPasswordRouteHandler,
  loginRouteHandler,
  registerRouteHandler,
  resetPasswordRouteHandler,
} from "../../services/auth";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req);
  //const { email, password } = req.body.data.attributes;
  const email = "admin@jsonapi.com";
  const password = "secret";
  loginRouteHandler(req, res, email, password);
});

router.post("/logout", (req, res) => {
  return res.sendStatus(204);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body.data.attributes;
  await registerRouteHandler(req, res, name, email, password);
});

router.post("/password-forgot", async (req, res) => {
  const { email } = req.body.data.attributes;
  await forgotPasswordRouteHandler(req, res, email);
});

router.post("/password-reset", async (req, res) => {
  await resetPasswordRouteHandler(req, res);
});

export default router;
