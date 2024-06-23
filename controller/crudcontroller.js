async function fetchBooks() {
    try {
        // Make a GET request to your backend endpoint
        const response = await fetch('http://localhost:5000/getBooks');
        // Check if the request was successful
        if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if not successful
        }
        const books = await response.json(); // Parse the JSON response
        return books; // Return the books data
    } catch (error) {
        console.error("Failed to fetch books:", error); // Log any errors to the console
        return []; // Return an empty array in case of error
    }
}

async function fetchBook(bookCode) {
    try {
        // Make a GET request to your backend endpoint
        const response = await fetch(`http://localhost:5000/getBook/${bookCode}`);
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Throw an error if not successful
        }
        const book = await response.json(); // Parse the JSON response
        return book; // Return the book data
    } catch (error) {
        console.error("Failed to fetch book:", error); // Log any errors to the console
        return { success: false }; // Return a failure object
    }
}

async function addBook(book) {
    try {
        // Make a POST request to your backend endpoint
        const response = await fetch('http://localhost:5000/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify(book.body),
        });
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Throw an error if not successful
        }
        const result = await response.json(); // Parse the JSON response
        return result; // Return the result data
    } catch (error) {
        console.error("Failed to add book:", error); // Log any errors to the console
        return { success: false }; // Return a failure object
    }
}

async function fetchCategories() {
    try {
        // Make a GET request to your backend endpoint
        const response = await fetch('http://localhost:5000/getCategories');
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Throw an error if not successful
        }
        const categories = await response.json(); // Parse the JSON response
        return categories; // Return the categories data
    } catch (error) {
        console.error("Failed to fetch categories:", error); // Log any errors to the console
        return []; // Return an empty array in case of error
    }
}

async function fetchCategory(categoryId) {
    try {
        // Make a GET request to your backend endpoint
        const response = await fetch(`http://localhost:5000/getCategory/${categoryId}`);
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Throw an error if not successful
        }
        const category = await response.json(); // Parse the JSON response
        return category; // Return the category data
    } catch (error) {
        console.error("Failed to fetch category:", error); // Log any errors to the console
        return { success: false }; // Return a failure object
    }
}

// Export the function so it can be used in other files
module.exports = { 
    fetchBooks,
    fetchBook,
    addBook,
    fetchCategories,
    fetchCategory
};