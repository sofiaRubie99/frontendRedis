<template>
  <div>
    <h2>Insert Author</h2>
    <form @submit.prevent="insertAuthor">
      <label for="id">ID:</label>
      <input
        type="number"
        id="id"
        v-model="author.id"
        placeholder="Enter author ID"
        required
      />

      <label for="author">Author Name:</label>
      <input
        type="text"
        id="author"
        v-model="author.author"
        placeholder="Enter author name"
        required
      />

      <label for="nationality">Nationality:</label>
      <input
        type="text"
        id="nationality"
        v-model="author.nationality"
        placeholder="Enter nationality"
        required
      />

      <label for="birth_year">Year of Birth:</label>
      <input
        type="number"
        id="birth_year"
        v-model="author.birth_year"
        placeholder="Enter year of birth"
        required
      />

      <label for="fields">Fields(amount of books to add):</label>
      <input
        type="text"
        id="fields"
        v-model="author.fields"
        placeholder="Enter fields of expertise"
        required
      />

      <label>Books:</label>
      <div v-for="(book, index) in books" :key="index" class="book-entry">
        <label for="book_id">Book ID:</label>
        <input
          type="number"
          v-model="books[index].book_id"
          placeholder="Enter book ID"
          required
        />
        <label for="title">Title:</label>
        <input
          type="text"
          v-model="books[index].title"
          placeholder="Enter book title"
          required
        />
        <button type="button" @click="removeBook(index)">Remove</button>
      </div>

      <button type="button" @click="addBook">Add Book</button>

      <button type="submit">Submit</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      author: {
        id: null,
        author: "",
        nationality: "",
        birth_year: null,
        fields: "",
      },
      books: [],
      message: "",
    };
  },
  methods: {
    addBook() {
      this.books.push({ book_id: null, title: "" });
    },
    removeBook(index) {
      this.books.splice(index, 1);
    },
    async insertAuthor() {
      try {
        this.author.books = this.books;
        const response = await axios.post(
          "https://tarea4sr.netlify.app/.netlify/functions/authorInsert",
          this.author
        );
        this.message = "Author inserted successfully.";
        this.resetForm();
      } catch (error) {
        this.message = "Error inserting author.";
      }
    },
    resetForm() {
      this.author = {
        id: null,
        author: "",
        nationality: "",
        birth_year: null,
        fields: "",
      };
      this.books = [];
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input,
textarea {
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.book-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>
