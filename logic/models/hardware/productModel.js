const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

hardwareProductSchema.pre('save', function (next) {
    if (this.isModified('quantity') || this.isModified('price')) {
        this.total = this.quantity * this.price;
    }
    next();
});

const hardwareProduct = mongoose.model('hardwareProduct', hardwareProductSchema);
module.exports = hardwareProduct;