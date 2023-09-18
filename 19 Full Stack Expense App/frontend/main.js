let editing = null;

//On window reload
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const getExpense = await axios.get('http://localhost:4000/expense/get-expense')
        // console.log(getExpense.data.expenses)
        for (let i = 0; i < getExpense.data.expenses.length; i++) {
            showExpenseOnHome(getExpense.data.expenses[i]);
        }
    } catch (err) {
        console.log('error while getting data via axios');
    }
})

const addExpense = async (event) => {
    event.preventDefault();

    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    let obj = {
        amount: amount,
        description: description,
        category: category
    }
    if (editing === null) {
        try {
            const postExpense = await axios.post('http://localhost:4000/expense/add-expense', obj)
            // console.log(postExpense.data.newExpense);
            showExpenseOnHome(postExpense.data.newExpense);
        } catch (err) {
            console.log('error at post in main.js', err);
        }
    }
    else {
        let url = 'http://localhost:4000/expense/edit-expense/' + editing;
        try {
            const updatedExp = await axios.put(url, obj)
            showExpenseOnHome(updatedExp.data.updateExpense);
            editing = null;
        } catch (err) {
            console.log('error at axios.put');
        }
    }
}

const showExpenseOnHome = async (obj) => {
    let parentEle = document.getElementById('expenseList');
    let childEle = document.createElement('li');
    childEle.id = 'expenseAdded';
    childEle.innerText = `${obj.amount} | ${obj.description} | ${obj.category}`;
    let deleteExpense = document.createElement('input');
    deleteExpense.type = 'button';
    deleteExpense.value = 'Delete Expense';
    deleteExpense.className = 'btn m-3 btn-danger'

    let editExpense = document.createElement('input');
    editExpense.type = 'button';
    editExpense.value = 'Edit Expense';
    editExpense.className = 'btn btn-info';

    deleteExpense.onclick = async () => {
        try {
            let id = obj.id;
            // console.log(id);
            await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`)
            parentEle.removeChild(childEle);
        } catch (err) {
            console.log('error at axios.delete');
        }
    }

    editExpense.onclick = () => {
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.description;
        document.getElementById('category').value = obj.category;

        editing = obj.id;
        // console.log(editing)
        parentEle.removeChild(childEle);
    }
    parentEle.appendChild(childEle);
    childEle.appendChild(deleteExpense);
    childEle.appendChild(editExpense);
}