const validationService = require("../services/validationService");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");


function maketoken(payload, res, user = {}) {
  jwt.sign(
    payload,
    process.env.SECRETKEY,
    {
      expiresIn: "7d",
    },
    (error, token) => {
      if (error) throw error;
      return res.status(200).json({
        user,
        token,
      });
    }
  );
}


async function signup(req, res) {
  validationService.validation(req, res);
  const { email, password } = req.body;

  try {
    let user = await userService.getByEmail(email);

    if (user) {
      return res.status(400).json({
        message: "Usuário já existe",
      });
    }
    
    user = await userService.signup(email, password)

    maketoken({ user: { id: user.id } }, res);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao criar a conta");
  }
}


async function login(req, res) {
  validationService.validation(req, res);
  const { email, password } = req.body;

  try {
    let user = await userService.getByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Usuário não existe",
      });
    }

    user = await userService.verifyPassword(user, password)

    if (!user) {
      return res.status(400).json({
        message: "Senha incorreta",
      });
    }

    maketoken({ user: { id: user.id } }, res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao entrar na conta",
    });
  }
}

async function updatePassword(req, res) {
  validationService.validation(req, res);
  const { password } = req.body;

  try {
    let user = await userService.getById(req.user.id);

    if (!user) {
      return res.status(400).json({
        message: "Usuário não existe",
      });
    }

    user = await userService.verifyPassword(user, password)

    if (user) {
      return res.status(400).json({
        message: "Essa já é sua senha",
      });
    }

    user = await userService.updatePassword(req.user.id, password)

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao atualizar senha",
    });
  }
}


module.exports = { login, signup, updatePassword };
