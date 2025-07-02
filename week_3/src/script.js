const path = window.location.pathname


if(path.endsWith("index.html")){
  const userDetails = {
  fullName: "",
  email: "",
  address: "",
  state: "",
  city: "",
  zipCode: "",
  upi: "",
  cvv: "",
  cardExpiry: "",
  creditNumber: "",
  termsConditions: false,
};
const errorList = {
  fullNameError: document.getElementById("fullNameError"),
  emailError: document.getElementById("emailError"),
  addressError: document.getElementById("addressError"),
  stateError: document.getElementById("stateError"),
  cityError: document.getElementById("cityError"),
  zipCodeError: document.getElementById("zipError"),
  upiError: document.getElementById("upiError"),
  creditNumberError: document.getElementById("cardNumberError"),
  cardExpiryError: document.getElementById("expiryError"),
  cvvError: document.getElementById("cvvError"),
  termsConditionsError: document.getElementById("termsConditionsError"),
};




  function validateData(user) {
    let isValid = true;
   
    for (const key in errorList) {
      if (errorList[key]) {
        errorList[key].textContent = "";
      }
    }

    if (user.fullName.trim() === "") {
      errorList.fullNameError.textContent = "Full Name is required.";
      isValid = false;
    }

    if (user.email.trim() === "") {
      errorList.emailError.textContent = "Email is required";
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(user.email.trim())) {
        errorList.emailError.textContent = "Enter a valid email address.";
        isValid = false;
      }
    }

    if (user.address.trim() === "") {
      errorList.addressError.textContent = "Address is required.";
      isValid = false;
    }

    if (user.state.trim() === "") {
      errorList.stateError.textContent = "State is required.";
      isValid = false;
    }

    if (user.city.trim() === "") {
      errorList.cityError.textContent = "City is required.";
      isValid = false;
    }

    if (!/^\d{6}$/.test(user.zipCode.trim())) {
      errorList.zipCodeError.textContent = "Enter a valid zip code.";
      isValid = false;
    }

if (user.upi.trim() === "" && user.creditNumber.trim() === "") {
  alert("Please add a payment method.");
  isValid = false;
} else if (user.upi.trim() !== "") {

  const upiPattern = /^[\w.-]+@[\w.-]+$/;  
  if (!upiPattern.test(user.upi.trim())) {
    errorList.upiError.textContent = "Enter a valid UPI ID.";
    isValid = false;
  }
} else {
 
  if (!/^\d{16}$/.test(user.creditNumber.trim())) {
    errorList.creditNumberError.textContent = "Enter a valid 16-digit card number.";
    isValid = false;
  }


  if (!user.cardExpiry) {
    errorList.cardExpiryError.textContent = "Please select an expiry date.";
    isValid = false;
  } else {
    const selectedDate = new Date(user.cardExpiry + "-01");
    const today = new Date();
    today.setDate(1);

    if (selectedDate < today) {
      errorList.cardExpiryError.textContent = "Card expiry date cannot be in the past.";
      isValid = false;
    }
  }

  if (!/^\d{3,4}$/.test(user.cvv.trim())) {
    errorList.cvvError.textContent = "Enter a valid 3 or 4 digit CVV.";
    isValid = false;
  }
}


  if (!user.termsConditions) {
    errorList.termsConditionsError.textContent = "You must agree to the terms and conditions.";
    isValid = false;
  }

  if (isValid) {
   
   localStorage.setItem("paymentData",JSON.stringify(user))
  window.location.href="details.html"
  }
}

function handleSubmit(e) {
  e.preventDefault();

  userDetails.fullName = document.getElementById("fullName").value;
  userDetails.email = document.getElementById("email").value;
  userDetails.address = document.getElementById("address").value;
  userDetails.state = document.getElementById("state").value;
  userDetails.city = document.getElementById("city").value;
  userDetails.zipCode = document.getElementById("zip").value;
  userDetails.upi = document.getElementById("upi").value;
  userDetails.creditNumber = document.getElementById("cardNumber").value;
  userDetails.cardExpiry = document.getElementById("expiry").value;
  userDetails.cvv = document.getElementById("cvv").value;
  userDetails.termsConditions = document.getElementById("t&c").checked;

  validateData(userDetails);
}

const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit", handleSubmit);

const reset = document.getElementById("resetBtn")

reset.addEventListener("click",(e)=>{
  e.preventDefault()
    paymentForm.reset()
      for (const key in errorList) {
      if (errorList[key]) {
        errorList[key].textContent = "";
      }
    }
    paymentForm.scrollTo({ top: 0, behavior: "smooth" });
})


}

if(path.endsWith("details.html")){
  const user = JSON.parse(localStorage.getItem("paymentData"));
  const list = document.getElementById("paymentDetailsList");
  const container = document.getElementById("paymentContainer");

  if (user && Object.keys(user).length > 0 && list) {
    const displayData = {
      "Full Name": user.fullName,
      "Email": user.email,
      "Address": user.address,
      "State": user.state,
      "City": user.city,
      "ZIP Code": user.zipCode,
      "UPI": user.upi || "N/A",
      "Credit Card Number": user.creditNumber
        ? `XXXX-XXXX-XXXX-${user.creditNumber.slice(-4)}`
        : "N/A",
      "Expiry": user.cardExpiry || "N/A",
      "CVV": user.cvv ? "***" : "N/A",
    };

    for (const [key, value] of Object.entries(displayData)) {
      const li = document.createElement("li");
      li.innerHTML = `
    <strong>${key}:</strong> ${value}`;
      list.appendChild(li);
    }

  } else {
    container.innerHTML = ` <h1 class="text-2xl font-bold text-center">Payment Details</h1>
 <h1 class="text-2xl  text-center">No Data Found</h1>
  <div class="flex justify-center">
            <a href="index.html" class="px-6 py-2 rounded mt-2 bg-gray-950 hover:bg-gray-800 text-white font-semibold ">
                Back to Home
            </a>
        </div>`;

  }
}

