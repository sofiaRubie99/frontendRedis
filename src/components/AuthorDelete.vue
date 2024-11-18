<template>
  <div class="delete-author-container">
    <h2>Delete Author</h2>
    <form @submit.prevent="deleteAuthor" class="delete-author-form">
      <label for="id">Author ID:</label>
      <input 
        v-model="id" 
        type="number" 
        id="id" 
        placeholder="Enter author ID" 
        required 
      />
      <button type="submit" class="delete-button">Delete</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: null, 
      message: "", 
    };
  },
  methods: {
    async deleteAuthor() {
      try {
        const response = await axios.delete(
          `https://tarea4sr.netlify.app/.netlify/functions/authorDelete/${this.id}`
        );
        this.message = "Author successfully deleted.";
        this.resetForm(); 
      } catch (error) {
        this.message = "Error deleting the author.";
        console.error(error);
      }
    },
    resetForm() {
      this.id = null; 
    },
  },
};
</script>

<style scoped>
.delete-author-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.delete-author-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.delete-button {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #e60000;
}

.message {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>
