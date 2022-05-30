const pool = require("../database");
const AppError = require("../utils/appError");

exports.productsAll = async (req, res, next) => {
  await pool.query("SELECT * FROM orders_products", (err, data) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
      message: "obtained",
    });
  });
};

exports.product = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "Select * FROM orders_products WHERE idOrdersProducts = ?",
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

exports.productOrder = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "Select * FROM orders_products WHERE idOrder = ?",
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

exports.productAdd = async (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));

  const {
    idOrder,
    valueUnit,
    unit,
    description,
    sku,
    quantity,
    qtyBox,
    weight,
    volumen,
    mark,
    status,
  } = req.body;
  const values = {
    idOrder,
    valueUnit,
    unit,
    description,
    sku,
    quantity,
    qtyBox,
    weight,
    volumen,
    mark,
    status,
  };

  await pool.query(
    "INSERT INTO orders_products set ?",
    [values],
    function (err, data) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        info: data,
        message: "created",
      });
    }
  );
};

exports.productUpdate = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));
  if (!req.body) return next(new AppError("No form data found", 404));

  const values = req.body;

  await pool.query(
    "UPDATE orders_products SET idOrder=?, valueUnit=?, unit=?, description=?, sku=?, quantity=?, qtyBox=?, weight=?, volumen=?, mark=?, status=? WHERE idOrdersProducts=?",
    [
      values.idOrder,
      values.valueUnit,
      values.unit,
      values.description,
      values.sku,
      values.quantity,
      values.qtyBox,
      values.weight,
      values.volumen,
      values.mark,
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

exports.productRemove = async (req, res, next) => {
  if (!req.params.id) return next(new AppError("No todo id found", 404));

  await pool.query(
    "DELETE FROM orders_products WHERE idOrdersProducts = ?",
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
