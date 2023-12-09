const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true },
}, {
    timestamps: true,
});

const adminModal = mongoose.model('admin', adminSchema);

module.exports = adminModal;
