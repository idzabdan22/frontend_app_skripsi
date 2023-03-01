const ws = new WebSocket("ws://127.0.0.1:3000");
let state = null;
let blinking = "";
let warning = "";
let clicked = "";
let cols = "";

ws.addEventListener("open", () => {
  alert("Connection Established");
});

ws.addEventListener("message", (event) => {
  message = event.data;
  console.log(Number(message));

  if (Number(message) && !state) {
    cols = document.querySelectorAll(".col");
    const chosen = cols[Number(message) - 1];
    // const chosen = cols[0];
    // console.log(chosen);
    if (chosen.childElementCount < 2) {
      let div = document.createElement("div");
      div.classList.add("warning");
      chosen.prepend(div);
      warning = document.querySelector(".warning");
      op = 0;
      blinking = setInterval(() => {
        if (op >= 100) {
          op = 0;
        }
        warning.style.opacity = `${op}%`;
        op += 5;
      }, 75);
    }
    state = Number(message); //1
  } else {
    if (Number(message)) {
      warning = document.querySelector(".warning");
      cols = document.querySelectorAll(".col");
      const chosen = cols[Number(message) - 1];
      chosen.removeChild(warning);
      // const chosen = cols[0];
      if (chosen.childElementCount < 2) {
        let div = document.createElement("div");
        div.classList.add("warning");
        chosen.prepend(div);
        warning = document.querySelector(".warning");
        op = 0;
        blinking = setInterval(() => {
          if (op >= 100) {
            op = 0;
          }
          warning.style.opacity = `${op}%`;
          op += 5;
        }, 75);
      }
      state = Number(message);
    }
    else { //yes, no, on, off
      if (state) {
        chosen = document.querySelectorAll(".col");
        console.log(chosen);
        clearInterval(blinking);
        let timesRun = 0;
        let index = 100;
        let data = 0;
        const interval = setInterval(function () {
		  chosen = document.querySelectorAll(".col");
          if (timesRun < 4) {
            clearInterval(interval);
          }
          console.log("clicked");
          data = index / 100;
          console.log(data);
          console.log(chosen[state]-1);
          chosen[state-1].style.transform = `scale(${data}, ${data})`;
          index -= 5;
          timesRun += 1;
        }, 100);
        setTimeout(() => {
          chosen.style.transform = `scale(${1}, ${1})`;
          const mode = document.getElementById("mode");
          mode.textContent = "xxxxxxxxxx";
        }, 1000);
        state = null;
      }
      console.log("NOT A NUMBER", message);
    }
  }
  console.log("STATE: ", state)
});

ws.addEventListener("close", (event) => {
  alert("Connection Closed");
});
