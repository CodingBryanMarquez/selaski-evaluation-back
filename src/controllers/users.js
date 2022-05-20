const pool = require("../database");
const AppError = require("../utils/appError");

exports.usersAll = async (req, res, next) => {
  await pool.query("SELECT * FROM users", (err, data) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
      message: "obtained",
    });
  });
};

exports.user = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "Select * FROM users WHERE idUser = ?",
    [req.params.id],
    (err, data) => {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        data: data,
        message: "obtained",
      });
    }
  );
};
