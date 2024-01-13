const app = new Vue({
  delimiters: ["{[", "]}"],
  el: "#app",
  router: router,
  data: {
    message: "Vue loaded",
  },
});

const introComp = new Vue.component("index", {
  // DELIMITERS
  delimiters: ["{[", "]}"],
  // TEMPLATE
  template: `
        <div>
            <div>
                <h3> SmallBasket </h3>
            </div>
            <div>
                <router-link to="/signup">
                    <button>Get Started</button>
                </router-link>
                <router-link to="/login">
                    <button>Login</button>
                </router-link>
            </div>
        </div>
        <div>
            <!-- Image to be added -->
        </div>
  `,
});

// SIGNUP COMPONENT
const signUpComp = Vue.component("signup", {
  // DELIMITERS
  delimiters: ["{[", "]}"],
  // TEMPLATE
  template: `
        <div>
            <form
        </div>
  `,
});

const routes = [
  {
    path: "/",
    component: introComp,
  },
  {
    path: "/login",
    component: loginComp,
  },
  {
    path: "/signup",
    component: signUpComp,
  },
];

const router = new VueRouter({
  routes: routes,
});
