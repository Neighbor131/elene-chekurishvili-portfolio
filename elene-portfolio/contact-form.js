const form = document.querySelector("#contact-form");
const messageInput = document.querySelector("#message");
const emailInput = document.querySelector("#email");
const messageNext = document.querySelector("#message-next");
const messageError = document.querySelector("#message-error");
const emailError = document.querySelector("#email-error");
const submitError = document.querySelector("#submit-error");
const success = document.querySelector("#contact-success");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const setError = (element, message = "") => {
  if (element) element.textContent = message;
};

const clearSubmitError = () => {
  setError(submitError);
};

const updateComposerState = () => {
  if (!messageInput) return;

  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 192)}px`;

  if (messageNext) {
    messageNext.disabled = !messageInput.value.trim();
  }
};

const showSuccess = () => {
  form.querySelectorAll("input, textarea, button").forEach((control) => {
    control.disabled = true;
  });

  if (success) {
    success.hidden = false;
    success.classList.add("is-visible");
  }
};

const sendForm = async () => {
  if (window.location.protocol === "file:") {
    showSuccess();
    return;
  }

  const data = new FormData(form);

  await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString(),
  });

  showSuccess();
};

messageInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form?.requestSubmit();
  }
});

messageInput?.addEventListener("input", () => {
  setError(messageError);
  clearSubmitError();
  updateComposerState();
});

emailInput?.addEventListener("input", () => {
  setError(emailError);
  clearSubmitError();
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearSubmitError();

  let firstInvalid = null;

  if (!isValidEmail(emailInput.value.trim())) {
    setError(emailError, "Add an email address I can reply to.");
    firstInvalid = firstInvalid || emailInput;
  }

  if (!messageInput.value.trim()) {
    setError(messageError, "Write a quick note about what you need help with.");
    firstInvalid = firstInvalid || messageInput;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  try {
    await sendForm();
  } catch {
    setError(submitError, "Something got stuck. You can still email me directly at el.chekurishvili@gmail.com.");
  }
});

updateComposerState();
