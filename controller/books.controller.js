const { Book } = require("../model/book");
const { Rent } = require("../model/rent");

exports.findAll = async (req, res) => {
  try {
    let details = await Book.findAll({
      include: [{ model: Rent, as: "rents" }],
    });
    res.send({
      statusCode: 200,
      books: details
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
    let details = await Book.findByPk(req.params.id, {
      include: [{ model: Rent, as: "rents" }],
    });
    if (details) {
      res.send({
        statusCode: 200,
        book: details
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No book found with the given book Id",
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
    const book = await Book.findOne({ where: { bookName: req.body.bookName } });
    if (book) {
      res.send({
        statusCode: 400,
        message: "Book already exists",
      });
      return;
    }
    let details = await Book.create(req.body);
    res.send({
      statusCode: 200,
      message: "Book added successfully",
      Book: details,
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

exports.updateBookWithId = async (req, res) => {

  try {
    let details = await Book.update(req.body, { where : { id : req.params.id }})
    if(details[0] === 1){
      res.send({
        statusCode:200,
        details,
        message:"Changes Saved"
      })
    }else{
      res.send({
        statusCode:400,
        details,
        message:`Cannot update book with id=${req.params.id}. Maybe book was not found or req.body is empty!`
      })
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

exports.deleteBookWithId = async (req, res) => {
  try {
    let details = await Book.destroy({ where: { id: req.params.id } });
    if (details === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "Book has been deleted successfully",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot delete book with id=${req.params.id}. Book may not be found!`,
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
