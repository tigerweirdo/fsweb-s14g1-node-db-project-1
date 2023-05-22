const AccountModels = require("./accounts-model");

exports.logger = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  console.log(
    `${req.originalUrl}--${req.method}--${new Date().toLocaleTimeString()}`
  );
  next();
};

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  const { name, budget } = req.body;
  if (!name || !budget) {
    next({ code: 400, message: "name and budget are required" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ code: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget != "number") {
    console.log(typeof budget);
    next({ code: 400, message: "must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({ code: 400, message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // KODLAR BURAYA
  AccountModels.getByName(req.body.name.trim()).then((response) => {
    response ? next({ code: 400, message: "that name is taken" }) : next();
  });
};

exports.checkAccountId = (req, res, next) => {
  // KODLAR BURAYA
  AccountModels.getById(req.params.id).then((response) => {
    if (response) {
      req.dbInfo = response;
      next();
    } else next({ code: 404, message: "account not found" });
  });
};