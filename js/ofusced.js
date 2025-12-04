const $ = document;

const loadSelects = () => {
  const selects = $.getElementsByTagName("select");
  for (let i = 0; i < selects.length; i++) {
    for (let j = 0; j < 25; j++) {
      const option = $.createElement("option");
      option.value = j;
      option.textContent = j;
      selects[i].appendChild(option);
    }
  }
};

const convertMayus = (textarea) => {
  textarea.value = textarea.value.toUpperCase();
};

const contentValidate = (event) => {
  const keyCode = event.keyCode || event.which;
  const key = String.fromCharCode(keyCode);
  if (!/[A-Z]/.test(key) && keyCode !== 32 && keyCode !== 13 && keyCode !== 8) {
    event.preventDefault();
  }
};

const encrypt = () => {
  const message = $.querySelector("#txtMessage").value;
  let exit = "";
  let k = 1;
  for (let i = 0; i < message.length; i++) {
    if (message.charCodeAt(i) !== 32 && message.charCodeAt(i) !== 13) {
      const letter = message.charCodeAt(i);
      let movement = parseInt($.querySelector(`#key${k++}`).value);
      if (letter + movement > 90)
        exit += String.fromCharCode(letter + movement - 26);
      else exit += String.fromCharCode(letter + movement);

      if (k === 7) k = 1;
    } else exit += String.fromCharCode(message.charCodeAt(i));
  }
  $.querySelector("#txtEncripted").value = exit;
};

const example = () => {
  $.querySelector("#txtMessage").value =
    "hola mundo, como estamos?".toUpperCase();

  $.getElementById("key1").value = "1";
  $.getElementById("key2").value = "2";
  $.getElementById("key3").value = "3";
  $.getElementById("key4").value = "4";
  $.getElementById("key5").value = "5";
  $.getElementById("key6").value = "6";
};

const saveEncryption = () => {
  const textarea = $.querySelector("#txtEncripted").value;
  const fileName = "mensaje_encriptado.txt";

  const blob = new Blob([textarea], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = $.createElement("a");
  a.href = url;
  a.download = fileName;
  $.body.appendChild(a);
  a.click();
  $.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const saveKeys = () => {
  const keys = `${$.querySelector("#key1").value}\n${
    $.querySelector("#key2").value
  }\n${$.querySelector("#key3").value}\n${$.querySelector("#key4").value}\n${
    $.querySelector("#key4").value
  }\n${$.querySelector("#key5").value}\n${$.querySelector("#key6").value}`;

  const textToSave = keys;
  const file = "keys.txt";

  const blob = new Blob([textToSave], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const a = $.createElement("a");
  a.href = url;
  a.download = file;

  $.body.appendChild(a);

  a.click();

  $.body.removeChild(a);
  URL.revokeObjectURL(url);
};
