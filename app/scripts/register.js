import "./../scss/register.scss";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (form) {
    form.removeEventListener("submit", handleSubmit);
    form.addEventListener("submit", handleSubmit);
  }
});

var i = 0;
async function handleSubmit(e) {
  e.preventDefault();
  console.log("Submit");
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    name,
    email,
    password
  };


  try {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      alert("User registered successfully!");
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    alert("An error ocurred while registering the userData. " + error);
    console.error(`Error: ${error}`);
  }
};