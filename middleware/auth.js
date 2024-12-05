export default defineNuxtRouteMiddleware((to, from) => {
  // Usar useCookie para verificar o token
  const authToken = useCookie('authToken');
  
  // Se a página não for de login e o token não existir, redirecione para login
  if (!authToken.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});