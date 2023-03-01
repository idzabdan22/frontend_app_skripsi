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
    state = Number(message) - 1; //1
  } else {
    if (Number(message)) {
      warning = document.querySelector(".warning");
      cols = document.querySelectorAll(".col");
      const chosen = cols[Number(message) - 1];
      cols[state].removeChild(warning);
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
      state = Number(message) - 1;
    }
    else { //yes, no, on, off
      if (state) {
        cols = document.querySelectorAll(".col");
        clearInterval(blinking);
        let timesRun = 0;
        let index = 100;
        let data = 0;
        const interval = setInterval(function () {
          if (timesRun > 3) {
            clearInterval(interval);
          }
          console.log("clicked");
          data = index / 100;
          console.log(data);
          cols[state].style.transform = `scale(${data}, ${data})`;
          index -= 5;
          timesRun += 1;
        }, 100);
        setTimeout(() => {
          cols[state].style.transform = `scale(${1}, ${1})`;
          const mode = document.getElementById("mode");
          mode.textContent = "Head Movement";
        }, 1000);
        state = null;
      }
      console.log("NOT A NUMBER");
    }
  }

  // if (
  //   (message !== "Yes" &&
  //     message !== "No" &&
  //     message !== "On" &&
  //     message !== "Off") &&
  //   !state
  // ) {
  //   console.log("MASUK KE WARNING");
  //   cols = document.querySelectorAll(".col");
  //   const chosen = cols[Number(message) - 1];
  //   // const chosen = cols[0];
  //   console.log(chosen);
  //   if (chosen.childElementCount < 2) {
  //     let div = document.createElement("div");
  //     div.classList.add("warning");
  //     chosen.prepend(div);
  //     warning = document.querySelector(".warning");
  //     op = 0;
  //     blinking = setInterval(() => {
  //       if (op >= 100) {
  //         op = 0;
  //       }
  //       warning.style.opacity = `${op}%`;
  //       op += 5;
  //     }, 75);
  //     state = chosen;
  //   }
  // } else {
  //   console.log("MASUK KE CLICKED");

  //   if (state) {
  //     cols = document.querySelectorAll(".col");
  //     cols[state].removeChild(warning);
  //     const chosen = cols[Number(message) - 1];
  //     // const chosen = cols[0];
  //     console.log(chosen);
  //     if (chosen.childElementCount < 2) {
  //       let div = document.createElement("div");
  //       div.classList.add("warning");
  //       chosen.prepend(div);
  //       warning = document.querySelector(".warning");
  //       op = 0;
  //       blinking = setInterval(() => {
  //         if (op >= 100) {
  //           op = 0;
  //         }
  //         warning.style.opacity = `${op}%`;
  //         op += 5;
  //       }, 75);
  //       state = chosen;
  //     }
  //   }
  //   if (state === "chosen") {
  //     cols = document.querySelectorAll(".col");
  //     // cols[0].removeChild()
  //     cols[0].removeChild(warning);
  //     clearInterval(blinking);
  //     let timesRun = 0;
  //     let index = 100;
  //     let data = 0;
  //     const interval = setInterval(function () {
  //       if (timesRun > 3) {
  //         clearInterval(interval);
  //       }
  //       console.log("clicked");
  //       data = index / 100;
  //       console.log(data);
  //       cols[0].style.transform = `scale(${data}, ${data})`;
  //       index -= 5;
  //       timesRun += 1;
  //     }, 100);
  //     setTimeout(() => {
  //       cols[0].style.transform = `scale(${1}, ${1})`;
  //       const mode = document.getElementById("mode");
  //       mode.textContent = "Head Movement";
  //     }, 1000);
  //     state = null;
  //   }
});

ws.addEventListener("close", (event) => {
  alert("Connection Closed");
});
