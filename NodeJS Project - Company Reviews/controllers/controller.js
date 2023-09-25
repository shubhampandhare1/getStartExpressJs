const companyReview = require('../models/model');

exports.getReviews = async (req, res, next) => {
    try {
        const existingData = await companyReview.findAll();
        res.status(200).json({ existingData });
    } catch (err) {
        console.log('error at app.get', err)
    }
}

exports.postReview = async (req, res, next) => {
    try {
        const cName = req.body.companyName;
        const pros = req.body.pros;
        const cons = req.body.cons;
        const rating = req.body.rating;

        const existingReview = await companyReview.findOne({
            where: { companyName: cName }
        })

        if (existingReview) {
            existingReview.pors = pros;
            existingReview.cons = cons;

            let newRating = (existingReview.rating + +rating);
            newRating = newRating / 2;

            existingReview.rating = newRating;

            await existingReview.save();
            res.status(200).json({ existingReview })
        }
        else {
            const cRev = await companyReview.create({
                companyName: cName,
                pros: pros,
                cons: cons,
                rating: rating,
            })
            res.status(200).json({ cRev });
        }
    } catch (err) {
        console.log('error at app.post')
        res.status(500).json({ error: 'Internal Server error' })
    }
}