<template>
  <div>
    <h2>Message List</h2>
    <button @click="fetchAuthors">Load</button>

    <div v-if="messages.length">
      <h3>Session Messages:</h3>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          <pre>{{ formatMessage(message) }}</pre>
        </li>
      </ul>
    </div>
    
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="noNewMessages">{{ noNewMessages }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      errorMessage: "",
      noNewMessages: "",
    };
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await axios.get(
          "https://tarea4sr.netlify.app/.netlify/functions/authorGetAll"
        );
        const newMessage = response.data.message;

        if (!newMessage || newMessage === this.messages[this.messages.length - 1]) {
          this.noNewMessages = "There are no changes recorded";
        } else {
          this.noNewMessages = "";
          this.messages.push(newMessage);
          sessionStorage.setItem("messages", JSON.stringify(this.messages));
        }

        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "Error loading authors.";
        console.error(error);
      }
    },
    loadStoredMessages() {
      const storedMessages = sessionStorage.getItem("messages");
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    },
    formatMessage(message) {
      try {
        let parsedMessage = JSON.parse(message.replace(/'/g, '"'));
        if (parsedMessage.method && parsedMessage.body) {
          const action = parsedMessage.method.toLowerCase();
          let actionMessage = "";

          // Determinar el título según el método
          if (action === "insert") {
            actionMessage = "Create";
          } else if (action === "update") {
            actionMessage = "Update";
          } else if (action === "delete") {
            actionMessage = "Delete";
          }

          // Construir el mensaje incluyendo el ID externo
          const id = parsedMessage.id ? `id: ${parsedMessage.id}, ` : "";
          const bodyMessage = JSON.stringify(parsedMessage.body, null, 2)
            .replace(/"/g, '')
            .replace(/{|}/g, '')
            .replace(/,/g, ', ');

          return `${actionMessage}: ${id}${bodyMessage.trim()}`;
        }

        return JSON.stringify(parsedMessage, null, 2).replace(/["{}]/g, '').trim();
      } catch (error) {
        return message;
      }
    },
  },
  async mounted() {
    this.loadStoredMessages();
    await this.fetchAuthors();
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

pre {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Courier New", Courier, monospace;
}

p {
  text-align: center;
  color: #f44336;
}
</style>
