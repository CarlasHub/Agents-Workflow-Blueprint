import { createProjectBuilderApp } from './features/project-builder/app.js?v=20260605-9';

const root = document.querySelector('#app');

if (root) {
  createProjectBuilderApp(root).init();
}
