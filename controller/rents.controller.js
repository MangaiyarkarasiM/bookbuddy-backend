var { Rent } = require("../model/rent");
var { Book } = require("../model/book");

exports.findAll = async (req, res) => {
  try {
    let details = await Rent.findAll();
    res.send({
      statusCode: 200,
      rents: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    let details = await Rent.findByPk(req.param.id);
    if (details) {
      res.send({
        statusCode: 200,
        rent: details,
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No rent found with the given rent Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.create = async (req, res) => {
  try {
    let rent = await Rent.findOne({
      where: { book_id: req.body.book_id, isReturned: false },
    });
    if (rent) {
      res.send({
        statusCode: 400,
        message: `Book cannot be rented until it is returned from the user who currently rented the book. The expected date on which the book to be returned is ${rent.rentedTill}`,
      });
      return;
    }
    let details = await Rent.create(req.body);
    if (details.id > 0) {
      try {
        let resBook = await Book.update(
          { isRented: true, updatedBy: req.body.userId },
          { where: { id: req.body.book_id } }
        );
        if (resBook[0] === 1) {
          res.send({
            statusCode: 200,
            message: "Rent added successfully",
            rent: details,
          });
        } else {
          let detail = await Rent.destroy({ where: { id: details.id } });
          res.send({
            statusCode: 400,
            message:
              "Problem occured while saving the data. Please try again later",
          });
        }
      } catch (error) {
        console.log(error);
        let detail = await Rent.destroy({ where: { id: details.id } });
        res.send({
          statusCode: 400,
          message:
            "Problem occured while saving the data. Please try again later",
        });
      }
    } else {
      res.send({
        statusCode: 400,
        message:
          "Problem occured while saving the data. Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    if (details.id > 0) {
      let detail = await Rent.destroy({ where: { id: details.id } });
    }
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.updateRentWithId = async (req, res) => {
  try {
    let oldData = await Rent.findByPk(req.params.id);

    let details = await Rent.update(req.body, { where: { id: req.params.id } });

    if (details[0] === 1) {
      try {
        let resBook = await Book.update(
          { isRented: false, updatedBy: req.body.changedBy },
          { where: { id: req.body.book_id } }
        );

        if (resBook[0] === 1) {
          res.send({
            statusCode: 200,
            message: "Rent updated successfully",
            rent: details,
          });
        } else {
          let detail = await Rent.update(oldData, {
            where: { id: req.params.id },
          });
          res.send({
            statusCode: 400,
            message:
              "Problem occured while saving the data. Please try again later",
          });
        }
      } catch (error) {
        console.log(error);
        let detail = await Rent.update(oldData, {
          where: { id: req.params.id },
        });
        res.send({
          statusCode: 400,
          message:
            "Problem occured while saving the data. Please try again later",
        });
      }
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot update rent with id=${req.params.id}. Maybe rent was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteRentWithId = async (req, res) => {
  try {
    let details = await Rent.destroy({ where: { id: req.params.id } });
    if (details === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "Rent has been deleted successfully",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot delete rent with id=${req.params.id}. Rent may not be found!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
