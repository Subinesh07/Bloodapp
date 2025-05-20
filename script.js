function login() {
    // Add your login logic here
    alert("Logged in successfully");
    window.location.href = "dashboard.html";
  }

  function signup() {
    // Add your signup logic here
  
    // Get the selected login type
    var loginType = document.getElementById("loginType").value;
  
    // Assuming signup is successful, display an alert with the selected login type
    alert("You have successfully signed up as a " + loginType + ". Please login using the given credentials.");
  
    // Redirect to login.html after the alert
    window.location.href = "login.html";
  }
  function submitOrder() {
    // Add your logic to handle form submission here
  
    // Display a popup message
    alert("Your order is placed.");
  
    // Redirect to dashboard.html after the alert
    window.location.href = "dashboard.html";
  }
  document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.poster-slide img');
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Auto-slide every 3 seconds (adjust the interval as needed)
    setInterval(nextSlide, 3000);
  });
  