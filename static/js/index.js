const introComp = Vue.component("introComp", {
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
  `,
});

// SIGNUP COMPONENT
const signUpComp = Vue.component("signup", {
  // DELIMITERS
  delimiters: ["{[", "]}"],
  // TEMPLATE
  template: `
        <div>
            <div class="mb-3">
            <p v-if="invalid_login">Invalid credentials</p>
              <label for="exampleInputEmail1" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                v-model="password"
              />
            </div>
            <div class="mb-3 form-check">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button @click=submit() class="btn btn-primary">Login</button>
            <router-link to="/signup">
            <button
              class="btn btn-primary"
            >
              Register
            </button>
          </router-link>
        </div>
  `,

  // DATA
  data: function () {
    return {
      loading: false,
      invalid_login: false,
      email: "",
      password: "",
    };
  },
  // METHODS
  methods: {
    emailCheck: function (mail) {
      this.username_length_incorrect = false;
      this.password_length_incorrect = false;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        alert("invalid email address");
        return false;
      }
    },
    setCookie: function (cname, cvalue, exhours) {
      const d = new Date();
      d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    submit: function () {
      const login_validate_url =
        "http://" + window.location.host + "/signup_validate";
      const dashboard_url = "http//" + window.location.host + "/dashboard";
      if (this.emailCheck(this.email) && this.password.length > 8) {
        fetch(login_validate_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            email: this.email,
          },
        })
          .then((response) => {
            if (!response.ok) {
              console.log("Response not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data["valid_login"]) {
              console.log("Valid login");
              this.submit.setCookie("auth-token", data["auth_token"], 1);
              window.location.href = dashboard_url;
            }
          });
      } else {
        this.invalid_login = true;
      }
    },
  },
});

// LOGIN COMPONENT
const loginComp = Vue.component("login", {
  // DELIMITERS
  delimiters: ["{[", "]}"],
  // TEMPLATE
  template: `
        <div>
            <div class="mb-3">
            <p v-if="invalid_login">Invalid credentials</p>
              <label for="exampleInputEmail1" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                v-model="password"
              />
            </div>
            <div class="mb-3 form-check">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button @click=submit() class="btn btn-primary">Login</button>
            <router-link to="/signup">
            <button
              class="btn btn-primary"
            >
              Register
            </button>
          </router-link>
        </div>
  `,

  // DATA
  data: function () {
    return {
      loading: false,
      invalid_login: false,
      email: "",
      password: "",
    };
  },
  // METHODS
  methods: {
    emailCheck: function (mail) {
      this.username_length_incorrect = false;
      this.password_length_incorrect = false;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        alert("invalid email address");
        return false;
      }
    },
    setCookie: function (cname, cvalue, exhours) {
      const d = new Date();
      d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    submit: function () {
      const login_validate_url =
        "http://" + window.location.host + "/login_validate";
      const dashboard_url = "http//" + window.location.host + "/dashboard";
      if (this.emailCheck(this.email) && this.password.length > 8) {
        fetch(login_validate_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            email: this.email,
          },
        })
          .then((response) => {
            if (!response.ok) {
              console.log("Response not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data["valid_login"]) {
              console.log("Valid login");
              this.submit.setCookie("auth-token", data["auth_token"], 1);
              window.location.href = dashboard_url;
            }
          });
      } else {
        this.invalid_login = true;
      }
    },
  },
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

const app = new Vue({
  delimiters: ["{[", "]}"],
  el: "#app",
  router: router,
  data: {
    message: "Vue loaded",
  },
});
