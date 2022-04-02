document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btn");
  var consoleLog = document.getElementById("log");
  var btnClear = document.getElementById("clear");

  btn.addEventListener(
    "click",
    async function () {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      const reader = port.readable.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          break;
        }
       
        console.log("scan data : ", print(value));
        consoleLog.innerHTML += print(value);
      }
    }
  );
  
  btnClear.addEventListener("click", function(){
    consoleLog.innerHTML = "";
  });

  
});


function print(value){
  return new TextDecoder().decode(value);
}