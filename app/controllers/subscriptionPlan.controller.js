const SubcriptionPlan = require('../modals/subscriptionPlan.modal')
const asyncWrapper = require('../middleware/async')

const createSubscriptionPlan = asyncWrapper(async (req, res) => {
    try {
        const subscriptionPlan = await SubcriptionPlan.create(req.body);
        res.status(201).json(subscriptionPlan)
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in creating subscription' })
    }
})

const getAllSubscriptionPlan = asyncWrapper(async (req, res) => {
    try {
        await SubcriptionPlan.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'subscription',
                    as: 'subscribedUsers'
                }
            }
        ]).then((result) => {
            console.log(result)
            res.status(201).json(result)
        })
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in get All subscription plan' })
    }
})

const updateSubscriptionPlan = asyncWrapper(async (req, res) => {
    try {
        const id = req.params.id
        const plan = req.body.plan;
        const monthly_price = req.body.monthly_price;
        const video_quality = req.body.video_quality;
        const resolution = req.body.resolution;
        const devices_can_use = req.body.devices_can_use
        const update = {}
        if (plan) {
            update.plan = plan
        }
        if (monthly_price) {
            update.monthly_price = monthly_price
        }
        if (video_quality) {
            update.video_quality = video_quality
        }
        if (resolution) {
            update.resolution = resolution
        }
        if (devices_can_use) {
            update.devices_can_use = devices_can_use
        }
        const subscriptionPlan = await SubcriptionPlan.findOneAndUpdate(
            { _id: id },
            { $set: update },
            {
                new: [true, 'new subscription plan created'],
                runValidators: true
            }
        )
        res.status(201).json(subscriptionPlan)
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in updating subscription plan' })
    }
})

module.exports = {
    createSubscriptionPlan,
    getAllSubscriptionPlan,
    updateSubscriptionPlan
}