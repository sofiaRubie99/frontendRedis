import { createRouter, createWebHistory } from 'vue-router';
import Authors from '../components/Authors.vue';
import AuthorDelete from '../components/AuthorDelete.vue';
import EditAuthor from '../components/EditAuthor.vue';
import CreateAuthor from '../components/AuthorCreate.vue';


const routes = [
  { path: '/', component: Authors },
  { path: '/authors', component: Authors },
  { path: '/authors/:id', component: AuthorDelete },
  { path: '/authors/edit/:id', component: EditAuthor },
  { path: '/authors/create', component: CreateAuthor},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

