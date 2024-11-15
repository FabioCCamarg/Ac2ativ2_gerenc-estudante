const studentModel = require("../models/student");

exports.criarStudent = async (req, res) => {
  try {
    const { nome, idade, curso } = req.body;
    const saveStudent = await studentModel.create({ nome, idade, curso });
    res.status(201).json(saveStudent);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.listarTodos = async (req, res) => {
  try {
    const student = await studentModel.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.listarPorId = async(req, res) => {
    try {
        const id = req.params.id;
        const studentId = await studentModel.findById(id);
        res.status(200).json(studentId);
    }catch(error) {
        res.status(500).json({ error: error });
    }
};

  exports.editarStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, idade, curso } = req.body;

      const editarStudent = await studentModel.findByIdAndUpdate(
        id,
        { nome, idade, curso },
        { new: true }
      );
      res.status(200).json(editarStudent);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };

exports.deletarStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStudent = await studentModel.findByIdAndDelete(id);
    res.status(200).json(deleteStudent);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
