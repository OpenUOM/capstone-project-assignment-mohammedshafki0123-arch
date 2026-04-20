const dbConnection = require("./sqlite");
const knex_db = require("./db-config");

// Teachers க்கான பங்க்ஷன்கள்
const readTeachers = async () => {
    const sql = `SELECT * FROM teachers`; // Teachers டேபிளில் இருந்து அனைத்தையும் எடுக்கும்
    return knex_db.raw(sql);
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teachers WHERE id = ?`; // குறிப்பிட்ட ID உள்ள டீச்சரை எடுக்கும்
    return knex_db.raw(sql, [id]);
}

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teachers (id, name, age) VALUES (?, ?, ?)`;
    return knex_db.raw(sql, [id, name, age]);
}

const updateTeacher = async (name, age, id) => {
    const sql = `UPDATE teachers SET name = ?, age = ? WHERE id = ?`;
    return knex_db.raw(sql, [name, age, id]);
}

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teachers WHERE id = ?`;
    return knex_db.raw(sql, [id]);
}

// Students க்கான பங்க்ஷன்கள் (இதுதான் உங்கள் முக்கியமான டாஸ்க்)
const readStudents = async () => {
    const sql = `SELECT * FROM students`;
    return knex_db.raw(sql);
}

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM students WHERE id = ?`;
    return knex_db.raw(sql, [id]);
}

const addStudent = async (id, name, age, religion) => {
    const sql = `INSERT INTO students (id, name, age, religion) VALUES (?, ?, ?, ?)`;
    return knex_db.raw(sql, [id, name, age, religion]);
}

const updateStudent = async (name, age, religion, id) => {
    const sql = `UPDATE students SET name = ?, age = ?, religion = ? WHERE id = ?`;
    return knex_db.raw(sql, [name, age, religion, id]);
} 

const deleteStudent = async (id) => {
    const sql = `DELETE FROM students WHERE id = ?`;
    return knex_db.raw(sql, [id]);
}

module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
