window.addEventListener('DOMContentLoaded', async () => {
    let companyForm = document.getElementById('company-form');
    let searchForm = document.getElementById('search-form');
    let companyDiv = document.getElementById('company');

    try {
        let response = await axios.get('http://localhost:3000/admin/getReviews')
        let result = response.data.existingData;
        // console.log(result)
        // addCompany(result)
        result.forEach(res => {
            addCompany(res);
        })
    }
    catch (err) {
        console.log('error at axios.get', err);
    }

    function addCompany(company) {
        let compEle = document.createElement('div');
        compEle.classList = 'companyadded';
        compEle.style.display = 'none';

        let ratingEle = document.createElement('div');
        ratingEle.classList = 'rating';
        ratingEle.style.direction = 'ltr';
        for (let i = 1; i <= 5; i++) {
            let star = document.createElement('p');
            if (i <= company.rating) {
                star.innerHTML = '⭐'
            }
            else {
                star.innerHTML = '☆'
            }
            ratingEle.appendChild(star);
        }

        compEle.innerHTML = `<h3>${company.companyName}</h3>
        <p>${company.pros}</p>
        <p>${company.cons}</p>`;
        compEle.appendChild(ratingEle);

        companyDiv.appendChild(compEle);
    }

    companyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let companyName = e.target.name.value;
        let pros = e.target.pros.value;
        let cons = e.target.cons.value;
        let rating = e.target.rating.value;

        const company = {
            companyName,
            pros,
            cons,
            rating
        }
        axios.post('http://localhost:3000/admin/postReview', company)
            .then((response) => {
                // console.log(response);
                addCompany(company);
            })
            .catch(err => console.log('error at axios.post', err))
    })

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let searchText = document.getElementById('search').value.toLowerCase();
        let companies = document.querySelectorAll('.companyadded');

        companies.forEach(function (company) {
            let companyName = company.querySelector('h3').innerText.toLowerCase();
            if (companyName.includes(searchText)) {
                company.style.display = 'block';
            } else {
                company.style.display = 'none';
            }
        });
    })
})