const router = require("express").Router();
const AccountModels = require("./accounts-model");
const md = require("./accounts-middleware");

router.use(md.logger);

router.get("/", (req, res, next) => {
  // KODLAR BURAYA
  console.log(req.query);
  AccountModels.getAll(req.query).then((response) =>
    res.status(200).json(response)
  );
});

router.get("/:id", md.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  res.status(200).json(req.dbInfo);
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    // KODLAR BURAYA
    AccountModels.create(req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) =>
        next({ code: 500, message: "There is a database problem" })
      );
  }
);

router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    // KODLAR BURAYA
    AccountModels.updateById(req.params.id, req.body)
      .then((response) => res.status(200).json(req.body))
      .catch((err) =>
        next({ code: 500, message: "There is a database problem" })
      );
  }
);

router.delete("/:id", md.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  AccountModels.deleteById(req.params.id)
    .then((res) => res.status(201).json({ message: "Deleted" }))
    .catch((err) =>
      next({ code: 500, message: "There is a database problem" })
    );
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.code).json({ message: err.message });
});

module.exports = router;