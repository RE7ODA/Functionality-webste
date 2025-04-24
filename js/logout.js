function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
  }
  
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  
    document.getElementById("loginBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "none";
  
    Toastify({
      text: "👋 Logged out",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#007bff",
      close: true,
    }).showToast();
  
    location.reload();
  }
  
  window.onload = () => {
    const token = localStorage.getItem("token");
    if (token) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("logoutBtn").style.display = "inline-block";
    } else {
      document.getElementById("loginBtn").style.display = "inline-block";
      document.getElementById("logoutBtn").style.display = "none";
    }
  
    loadPosts();
  };