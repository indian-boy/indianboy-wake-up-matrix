const elementToAppendText = document.getElementById("text");
const messages = [
  "wake up...",
  "wake up...",
  "the matrix has you!",
  "follow the white rabbit.",
];
const appendLettersSpeed = 75;
const removeLettersSpeed = 30;

function watingTime(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const updateMessage = function (message, index) {
  const text = message.substring(0, index);
  elementToAppendText.innerHTML = text;
};

const appendLettersRecursively = async function (
  message,
  currentLetterIndex = 0
) {
  return new Promise((resolve) => {
    const messageLength = message.length;
    let updateMessageTimeout = null;

    updateMessageTimeout = setInterval(() => {
      if (currentLetterIndex < messageLength) {
        currentLetterIndex++;
      }

      updateMessage(message, currentLetterIndex);

      if (currentLetterIndex === messageLength) {
        clearInterval(updateMessageTimeout);
        resolve(true);
      }
    }, appendLettersSpeed);
  });
};

const removeLettersRecursively = async function (message) {
  return new Promise((resolve) => {
    let currentLetterIndex = message.length;
    let updateMessageTimeout = null;

    updateMessageTimeout = setInterval(() => {
      if (currentLetterIndex > 0) {
        currentLetterIndex--;
      }

      updateMessage(message, currentLetterIndex);

      if (currentLetterIndex === 0) {
        clearInterval(updateMessageTimeout);
        resolve(true);
      }
    }, removeLettersSpeed);
  });
};

const matrixify = async function () {
  for (const [index, message] of messages.entries()) {
    await appendLettersRecursively(message);

    if (index === messages.length - 1) {
      await watingTime(5000);
    } else {
      await watingTime(1000);
    }

    await removeLettersRecursively(message);
    await watingTime(600);
  }

  matrixify();
};

matrixify();
