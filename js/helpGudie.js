    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    async function createPost() {
      const title = document.getElementById("title").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;

      const res = await fetch("http://localhost:3000/functionality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category, description })
      });
      const data = await res.json();
      if (res.ok) {
        Toastify({
          text: "✅ Post created successfully!",
          duration: 3000,
          backgroundColor: "#28a745",
          close: true,
        }).showToast();
        loadPosts();
      } else {
        Toastify({
          text: "❌ Failed to create post: ",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    }

    async function loadPosts() {
      const res = await fetch("http://localhost:3000/functionality", {
        headers: {
            authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      const container = document.getElementById("posts");
      container.innerHTML = "";
      result.data.forEach((post) => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
        <h1>${post.CreatedBy.usersName}</h1>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <small class="category">${post.category}</small><br>
        ${post.CreatedBy._id === userId ? `
          <div class="buttons">
            <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
            <button class="edit-btn" onclick="updatePost('${post._id}')">Edit</button>
          </div>
        ` : ""}
        <div class="comment-input-container">
          <input id="comment-input-${post._id}" placeholder="Add a comment" />
          <button class="send-comment" onclick="submitComment('${post._id}')">Send</button>
        </div>
        <div class="comments" id="comments-${post._id}"></div>
      `;
        container.appendChild(div);
        loadComments(post._id);
      });
    }
    function submitComment(postId) {
      const input = document.getElementById(`comment-input-${postId}`);
      const comment = input.value.trim();
      if (comment) {
        addComment(postId, comment);
        input.value = "";
      } else {
        Toastify({
          text: "Please enter a comment",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    }

    async function deletePost(postId) {
      await fetch(`http://localhost:3000/functionality/${postId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      loadPosts();
    }

    async function updatePost(postId) {
      const title = prompt("Enter new title:");
      const description = prompt("Enter new description:");
      const category = prompt("Enter new category:");

      if (!title || !description || !category) {
        Toastify({
          text: "All fields are required.",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
        return;
      }

      const res = await fetch(`http://localhost:3000/functionality/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category }),
      });

      const result = await res.json();

      if (res.ok) {
        Toastify({
          text: "✅ Post updated successfully!",
          duration: 3000,
          backgroundColor: "#28a745",
          close: true,
        }).showToast();
        loadPosts();
      } else {
        Toastify({
          text: "❌ Failed to update post: ",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    }

    async function addComment(postId, comment) {
      if (!comment.trim()) {
        Toastify({
          text: "Please enter a comment",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
        return;
      }
      const res = await fetch(`http://localhost:3000/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment })
      });
    
      const result = await res.json();
    
      if (res.ok) {
        Toastify({
          text: "✅ Comment added",
          duration: 3000,
          backgroundColor: "#28a745",
          close: true,
        }).showToast();
        loadComments(postId);
      } else {
        console.error(result);
        Toastify({
          text: "❌ Failed to comment: ",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    }

    async function loadComments(postId) {
      const res = await fetch(`http://localhost:3000/comments/${postId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      const container = document.getElementById(`comments-${postId}`);
      container.innerHTML = "";
      result.Comments.forEach((c) => {
        const isOwner = c.createdBy._id === userId;
        const div = document.createElement("div");
        div.className = "comment-container";
        div.innerHTML = `
          <div class="comment-info">
            <small class="comment-user">${c.createdBy.usersName}</small>
            <small class="comment-role">${c.createdBy.role}</small>
          </div>
          <p>${c.comment}</p>
          ${isOwner ? `<button class="delete-comment" onclick="deleteComment('${postId}', '${c._id}')">Delete</button>` : ""}
        `;
        container.appendChild(div);
      });
    }

    async function deleteComment(postId, commentId) {
        const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
    
      const result = await res.json();
    
      if (res.ok) {
        Toastify({
          text: "✅ Comment deleted",
          duration: 3000,
          backgroundColor: "#28a745",
          close: true,
        }).showToast();
        loadComments(postId);
      } else {
        Toastify({
          text: "❌ Failed to delete comment: ",
          duration: 3000,
          backgroundColor: "#dc3545",
          close: true,
        }).showToast();
      }
    }

    loadPosts();