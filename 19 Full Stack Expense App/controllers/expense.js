const Expense = require('../models/expense')

exports.postExpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const newExpense = await Expense.create({
            amount: amount,
            description: description,
            category: category
        })
        res.status(200).json({ newExpense: newExpense })
    } catch (err) {
        console.log('Error at postExpense');
        res.status(500).json({ error: err });
    }
}

exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll()
        res.status(200).json({ expenses: expenses })
    } catch (err) {
        console.log('Error at getExpense');
        res.status(500).json({ error: err });
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const deleteId = req.params.id;
        const expense = await Expense.findByPk(deleteId);

        if (!expense) {
            return res.status(404).json({ err: 'Expense not found' });
        }
        
        await expense.destroy()
        res.sendStatus(200)

    } catch (err) {
        console.log('error at deleteExpense');
        res.status(500).json({ err: 'Error at deleteExpense' })
    }
}

exports.editExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({ err: 'Expense not found' })
        }

        expense.amount = amount;
        expense.description = description;
        expense.category = category;
        const updateExpense = await expense.save();
        res.status(200).json({ updateExpense });
    } catch (err) {
        console.log('error at editExpense');
        res.status(500).json({ err: 'Error occured at editExpense' })
    }
}