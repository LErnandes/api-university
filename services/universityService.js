const University = require("../model/University");


async function getAll(country, page=0) {
    return await University.find({ ...(country && {country}) }).select(['_id', 'country', 'name', 'stateProvince']).skip(page*20).limit(20)
}


async function checkIfExists(country, name, stateProvince) {
    let data = { country, name, ...(stateProvince && {stateProvince}) }
    return (await University.find(data)).length > 0
}


async function count() {
    return await University.countDocuments()
}


async function getById(id) {
    return await University.findById(id)
}


async function create(data) {
    const university = new University(data);

    await university.save();
    return university;
}


async function createBatch(data) {
    await University.insertMany(data, ordered=false)
}


async function remove(id) {
    await University.deleteOne({ id });
}


async function update(id, data) {
    return await University.updateOne({ _id: id }, { $set: data });
}


module.exports = { getAll, checkIfExists, createBatch, getById, count, create, update, remove };
