const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const messageOne = document.querySelector("p#m1");
const messageTwo = document.querySelector("p#m2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = address.value;
  messageOne.textContent = "Loading..";
  if (!location) {
    messageOne.textContent = "provide the address!";
  } else {
    fetch("http://localhost:3200/weather?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (!data.error) {
            const msg = data.forecast + " of " + data.location;
            messageTwo.textContent = msg;
            messageOne.textContent = "";
          }
        });
      }
    );
  }
});
