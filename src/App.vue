<template>
  <div>
   
    <h1 class="title">Authors</h1>
    <nav>
      <router-link to="/authors" class="nav-link">Find Authors</router-link> 
      <router-link to="/authors/create" class="nav-link">Create Author</router-link> 
      <router-link to="/authors/delete" class="nav-link">Delete Author</router-link> 
      <router-link to="/authors/edit/1" class="nav-link">Update Author</router-link> 
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>

.title {
  text-align: center;
  margin-bottom: 20px;
}


nav {
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.nav-link {
  color: white;
  background-color: #b22222; 
  padding: 10px 20px;
  text-decoration: none;
  margin-right: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: red; 
}

.nav-link:active {
  background-color: #8b0000;
}


.blue-button {
  background-color: #0e4f94;
}

.blue-button:hover {
  background-color: #0056b3; 
}

.blue-button:active {
  background-color: #003d80; 
}
</style>
