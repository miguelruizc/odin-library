function Book(title, author, numberOfPages, isRead) {
    // title
    this.title = title;
    // author
    this.author = author;
    // numberOfPages
    this.numberOfPages = numberOfPages;
    // isRead
    this.isRead = isRead;
}

function setAddEventListeners(){
    //Add book button event listener
    let addBtn = document.querySelector(`#addBookBtn`);

    addBtn.addEventListener("click", function() {
        const modal = document.getElementById("modal-form");
        modal.showModal();
    });

    //Cancel button
    let cancelBtn = document.getElementById("cancel");

    cancelBtn.addEventListener("click", function() {
        const modal = document.getElementById("modal-form");
        modal.close();
    });

    //Submit event
    let form = document.getElementById("form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        //Create book object with form data
        let newBookTitle = e.target.elements["title"].value;
        console.log(newBookTitle);
        let newBookAuthor = e.target.elements["author"].value;
        console.log(newBookAuthor);
        let newBookPages = e.target.elements["pages"].value;
        console.log(newBookPages);
        let newBookIsRead = e.target.elements["read"].checked;
        console.log(newBookIsRead);
        
        let form = document.getElementById("form");
        form.reset();
        
        addBookToLibrary();
        
        const modal = document.getElementById("modal-form");
        modal.close();
    });
}

function addBookToLibrary() {
    // Add new book to array
    myLibrary.push(new Book("xxxxx", "xxxx", 666, false));
    let newItemIndex = (myLibrary.length -1);

    // Create new HTML item 
    const container = document.getElementById("table");
    const newBook = document.createElement("tr");
    newBook.classList.add("book");
    newBook.setAttribute("id", newItemIndex);
    newBook.innerHTML = `
            <td>${myLibrary[newItemIndex].title}</td>
            <td>${myLibrary[newItemIndex].author}</td>
            <td>${myLibrary[newItemIndex].numberOfPages}</td>
            <td class=isRead${myLibrary[newItemIndex].isRead ? "True" : "False"}>
                <button id="readBtn${newItemIndex}">^</button>
            </td>
            <td class="remove">
                <button id="removeBtn${newItemIndex}">x</button>
            </td>
        `;
    // Append new book inside container
    container.appendChild(newBook);

    // Set event listeners for the new book
    let removeBtn = document.querySelector(`#removeBtn${newItemIndex}`);
    let readBtn = document.querySelector(`#readBtn${newItemIndex}`);

    removeBtn.addEventListener("click", function(){
        removeBook(newItemIndex);
    });

    readBtn.addEventListener("click", function(e) {
        toggleReadBook(newItemIndex, e)
    }); 
}

function generateHtmlCards() {
    // get div container from DOM
    const container = document.getElementById("table");

    // Iterate array of books and...
    myLibrary.forEach((item, index) => {
        // Generate a new div w/ book data
        const card = document.createElement("tr");
        card.classList.add("book");
        card.setAttribute("id", index);
        card.innerHTML = `
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>${item.numberOfPages}</td>
            <td class=isRead${item.isRead ? "True" : "False"}>
                <button id="readBtn${index}">^</button>
            </td>
            <td class="remove">
                <button id="removeBtn${index}">x</button>
            </td>
        `;
        // Append new div inside container
        container.appendChild(card);
    });
}

function toggleReadBook(index, e){
    // toggle isRead attribute
    myLibrary[index].isRead = !(myLibrary[index].isRead);
    
    // modify html class to isReadTrue or isReadFalse
    let element = e.target.parentElement; 
    element.classList.toggle("isReadTrue");
    element.classList.toggle("isReadFalse");
}

function removeBook(index) {
    // Remove all books from HTML
    myLibrary.forEach((item, index) => {
        const element = document.getElementById(index);
        element.remove();
    });

    // Remove specific book from array
    myLibrary.splice(index, 1);

    // Re-generate all (remaining) books
    generateHtmlCards();
    setEventListeners();
}

function setEventListeners() {
    myLibrary.forEach((item, index) => {
            // Set event listeners to remove & read buttons
            let removeBtn = document.querySelector(`#removeBtn${index}`);
            let readBtn = document.querySelector(`#readBtn${index}`);

            removeBtn.addEventListener("click", function(){
                removeBook(index);
            });

            readBtn.addEventListener("click", function(e) {
                toggleReadBook(index, e)
            }); 
    });
}

// Program starts here:
const myLibrary =  [];
myLibrary.push(new Book("The Sorcerer's Stonehenge", "Rowling Stones", 336, true));
myLibrary.push(new Book("The Fellowship of the Bling", "J. R. R. Token", 527, false));
myLibrary.push(new Book("A Game of Groans", "George R. R. Martian", 694, true));
myLibrary.push(new Book("The Lion, the Witch, and the Wardrobe Malfunction", "C.S. Flew-Is", 208, false));
myLibrary.push(new Book("The Hobbit: There and Backpack Again", "J.R.R. Tugboat", 304, true));
myLibrary.push(new Book("Percy Jackhammer and the Lightning Thief", "Riot Riordan", 377, false));
myLibrary.push(new Book("The Chronicles of Narnia: The Lion, the Twitch, and the Audible Wardrobe", "C.S. Mouse", 767, true));
myLibrary.push(new Book("The Hitchhiker's Guide to the Gag-alaxy", "Douglas Fart-Adams", 215, false));
myLibrary.push(new Book("Alice's Restaurant in Wonderland", "Lewis Carol King", 365, true));
myLibrary.push(new Book("A Clash of Canapes", "George R. R. Martini", 874, false));

console.table(myLibrary);

setAddEventListeners();
generateHtmlCards();
setEventListeners();

//TO-DO:
// -Modal form on add book click
    // -title, author, number of pages, read
    // need event.preventDefault so submit can be handled without sending to a server


