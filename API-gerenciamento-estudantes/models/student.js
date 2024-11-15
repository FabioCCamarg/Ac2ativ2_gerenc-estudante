const mongoose = require('mongoose');
const Student = mongoose.model('Student', {
    
    id: Number,
    nome: String,
    idade: Number,
    curso: String
});

module.exports = Student;

