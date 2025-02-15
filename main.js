document.addEventListener('DOMContentLoaded', function() {
    // If the user is already logged in, enable the puzzle link.
    if (getCookie("loggedIn")) {
      enablePuzzleLink();
    }
  
    // Toggle between registration and login forms.
    document.getElementById("register-tab").addEventListener("click", function() {
      toggleForms("register");
    });
    document.getElementById("login-tab").addEventListener("click", function() {
      toggleForms("login");
    });
  
    // Registration: Store credentials in localStorage (for demo purposes).
    document.getElementById("register").addEventListener("submit", function(e) {
      e.preventDefault();
      let username = document.getElementById("reg-username").value;
      let password = document.getElementById("reg-password").value;
      if (localStorage.getItem("user_" + username)) {
        alert("Username already exists. Please choose another.");
      } else {
        localStorage.setItem("user_" + username, password);
        alert("Registration successful. You can now login.");
        toggleForms(); // Hide forms after registration.
      }
    });
  
    // Login: Check credentials and set a login cookie.
    document.getElementById("login").addEventListener("submit", function(e) {
      e.preventDefault();
      let username = document.getElementById("login-username").value;
      let password = document.getElementById("login-password").value;
      let storedPassword = localStorage.getItem("user_" + username);
      if (storedPassword && storedPassword === password) {
        // Set a cookie for login (expires in 1 day)
        setCookie("loggedIn", username, 1);
        // Initialize progress cookie if not already set (0 means no puzzles solved)
        if (!getCookie("progress")) {
          setCookie("progress", 0, 1);
        }
        alert("Login successful!");
        enablePuzzleLink();
        toggleForms(); // Hide forms after login.
      } else {
        alert("Invalid username or password.");
      }
    });
  });
  
  // Toggle form display
  function toggleForms(formType) {
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.add("hidden");
    if (formType === "register") {
      document.getElementById("register-form").classList.remove("hidden");
    } else if (formType === "login") {
      document.getElementById("login-form").classList.remove("hidden");
    }
  }
  
  // Enable the puzzle page link when logged in.
  function enablePuzzleLink() {
    document.getElementById("first-puzzle-link").classList.remove("disabled");
  }
  
  // Cookie helper functions
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  