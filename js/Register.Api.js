async function register() {
    const usersName = document.getElementById("usersName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
  
    try {
      const res = await fetch("http://localhost:3000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usersName, email, password, role }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        window.location.href = "login.html";
      } else {
        Toastify({
          text: `❌ Register failed: ${data.message || "Invalid credentials"}`,
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "❌ Error register in. Please try again later.",
        duration: 3000,
        backgroundColor: "#dc3545",
        close: true,
      }).showToast();
      console.error("Register error:", error);
    }
  }