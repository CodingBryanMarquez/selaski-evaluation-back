const pool = require("../database");
var moment = require("moment");
const AppError = require("../utils/appError");

exports.ordersAll = async (req, res, next) => {
  await pool.query("SELECT * FROM orders", (err, data) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
      message: "obtained",
    });
  });
};

exports.order = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "Select * FROM orders WHERE idOrder = ?",
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

exports.orderAdd = async (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));

  const {
    idUser,
    orderNumber,
    dateTime,
    providerName,
    observation,
    totalValue,
    status,
  } = req.body;
  const values = {
    idUser,
    orderNumber,
    dateTime: moment(dateTime).format(),
    providerName,
    observation,
    totalValue,
    status,
  };

  await pool.query("INSERT INTO orders set ?", [values], function (err, data) {
    if (err) return next(new AppError(err, 500));
    res.status(201).json({
      status: "success",
      info: data,
      message: "created",
    });
  });
};

exports.orderUpdate = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));
  if (!req.body) return next(new AppError("No form data found", 404));

  const values = req.body;
  const valuesDateTime = moment(values.dateTime).format();

  await pool.query(
    "UPDATE orders SET idUser=?, orderNumber=?, dateTime=?, providerName=?, observation=?, totalValue=?, status=? WHERE idOrder=?",
    [
      values.idUser,
      values.orderNumber,
      valuesDateTime,
      values.providerName,
      values.observation,
      values.totalValue,
      values.status,
      req.params.id,
    ],
    function (err, data) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        info: data,
        message: "updated",
      });
    }
  );
};

exports.orderRemove = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "DELETE FROM orders WHERE idOrder = ?",
    [req.params.id],
    (err) => {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        message: "deleted",
      });
    }
  );
};
