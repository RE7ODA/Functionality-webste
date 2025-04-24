async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        window.location.href = "index.html";
      } else {
        Toastify({
          text: `❌ Login failed: ${data.message || "Invalid credentials"}`,
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "❌ Error logging in. Please try again later.",
        duration: 3000,
        backgroundColor: "#dc3545",
        close: true,
      }).showToast();
      console.error("Login error:", error);
    }
  }