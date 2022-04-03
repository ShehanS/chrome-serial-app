document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btn");
  var consoleLog = document.getElementById("log");
  var btnClear = document.getElementById("clear");
  var alert = document.getElementById("alert");
  var showAlert;
  btn.addEventListener(
    "click",
    async function () {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log("port : ", port);
        const reader = port.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          console.log("scan data : ", print(value));
          consoleLog.innerHTML += print(value);
          showAlert = "";
          alert.innerHTML = showAlert;
        }
      } catch (e) {
        showAlert = '<div class="alert alert-danger" role="alert">';
        showAlert += e;
        showAlert += "</div>";
        alert.innerHTML = showAlert;
      }
    },
    false
  );

  btnClear.addEventListener("click", function () {
    consoleLog.innerHTML = "";
  });
});

function print(value) {
  return new TextDecoder().decode(value);
}
