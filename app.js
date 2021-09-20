
// Spinner function 
const setSpinner = (status) => {
    if (status === 'start') {
        document.getElementById('spinner').style.display = 'block';
    }
    else {
        document.getElementById('spinner').style.display = 'none';
    }
}

// get user searched text 
const getQueryText = () => {
    const queryText = document.getElementById('queryText');
    // console.log(queryText.value);
    document.getElementById('book-container').innerHTML = '';
    document.getElementById('end-section').innerHTML = '';
    setSpinner('start');
    bookList(queryText.value);
    queryText.value = '';

}

//calling API
const bookList = (getQueryText) => {
    fetch(`https://openlibrary.org/search.json?q=${getQueryText}`)
        .then(res => res.json())
        .then(data => console.log(displayBook(data)));
}


// Displaying search result
const displayBook = (data) => {
    const bookArray = data.docs;
    const bookContainer = document.getElementById('book-container');
    let counter = 1;
    bookArray.forEach(books => {
        console.log(books.title);
        // const bookCard = document.createElement('div');
        const imageId = `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`;
        const bookCard = document.createElement('div');
        bookCard.classList.add("col-md-4");
        bookCard.innerHTML = `
        <div class="card mb-3 h-auto">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${imageId}" class="img-fluid rounded-start h-100" alt="No Image Found">
                </div>
                <div class="col-md-8">
                    <div class="card-body pt-1">
                        <h5 class="card-title mt-0">${books.title}</h5>
                        <hr class="mt-0">
                        <p class="h6">${books.author_name}</p>
                        <p class="card-text mb-0"><u>Publisher:</u> ${books.publisher}</p>
                        <p class="h6 m-0"><i>First published year:</i> ${books.first_publish_year}</p>
                    </div>
                </div>
            </div>
        </div>
        `;

        counter = counter + 1;
        console.log(counter);
        if (counter < 8) {
            bookContainer.appendChild(bookCard);
        }
        else {
            const endSection = document.getElementById('end-section');
            endSection.innerHTML = `
            <div class="text-center">
            <p class="">Found total ${bookArray.length} books.<p>
            </div>
            `;
        }
        setSpinner('end');

    });
    
    console.log('Total number of books', bookArray.length);
    if (bookArray.length === 0) {
        setSpinner('end');
        const endSection = document.getElementById('end-section');
        endSection.innerHTML = `
            <div class="text-center" >
                <p class="">No Books Found. :(<p>
                </div>
        `;
    }
}
