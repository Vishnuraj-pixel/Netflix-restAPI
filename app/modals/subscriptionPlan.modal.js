const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    plan: {
        type: String,
        required: [true, 'plan name is required'],
    },
    monthly_price: {
        type: String,
        required: [true, 'monthly price is required']
    },
    video_quality: {
        type: String,
        required: [true, 'video quality is required']
    },
    resolution: {
        type: String,
        required: [true, 'resolution is required']
    },
    devices_can_use: {
        type: [String],
        required: true,
    },

});

module.exports = mongoose.model('Subscription', SubscriptionSchema);