const bubble = document.getElementById("chatBubble");
const container = document.getElementById("chatContainer");
const minimizeBtn = document.getElementById("minimizeBtn");

let isOpen = false;
let welcomeRendered = false;

function toggleChat() {
  isOpen = !isOpen;
  container.classList.toggle("open", isOpen);
  bubble.classList.toggle("open", isOpen);
  if (isOpen && !welcomeRendered) {
    renderWelcome();
    welcomeRendered = true;
  }
  if (isOpen) setTimeout(() => txtInput.focus(), 260);
}

bubble.addEventListener("click", toggleChat);
minimizeBtn.addEventListener("click", toggleChat);

const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

let isEmailMode = false;

send.addEventListener("click", () => {
  if (!isEmailMode) handleUserMessage();
});

txtInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !isEmailMode) {
    handleUserMessage();
  }
});

function handleUserMessage() {
  const text = txtInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  txtInput.value = "";

  setTimeout(() => {
    const res = responseObj[text.toLowerCase()];

    if (typeof res === "function") {
      res();                          
    } else {
      addMessage(res || "Please try something else");
    }

    scrollToBottom();
  }, 500);
}

function addMessage(text, type = "bot") {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-message" : "chatbot-message";
  div.textContent = text;
  chatBody.append(div);
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

function renderWelcome() {
  const wrapper = document.createElement("div");
  wrapper.className = "chatbot-message welcome-wrapper";

  wrapper.append("Hi! How can I help you today?");

  const label = document.createElement("span");
  label.className = "recommended-label";
  label.textContent = "Recommended";

  const btn = document.createElement("button");
  btn.className = "option-btn";
  btn.textContent = "Receive notifications";

  btn.onclick = () => {
    btn.remove();
    label.remove();
    startEmailFlow();
  };

  wrapper.append(label);
  wrapper.append(btn);
  chatBody.append(wrapper);
}

function startEmailFlow() {
  isEmailMode = true;

  addMessage("Please enter your email:");
  txtInput.placeholder = "your@email.com";
  txtInput.focus();

  const submitEmail = async () => {
    const email = txtInput.value.trim();

    if (!email.includes("@") || !email.includes(".")) {
      addMessage("Invalid email. Try again.");
      return;
    }

    addMessage(email, "user");
    txtInput.value = "";

    addMessage("Sending... ⏳");

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",           // EMAILJS SERVICE ID
        "YOUR_TEMPLATE_ID",          // EMAILJS TEMPLATE ID
        {
          user_email: email,
          user: "test"
        }
      );

      chatBody.lastChild.remove();
      addMessage("Email sent");

    } catch (error) {
      chatBody.lastChild.remove();
      addMessage("Failed to send");
      console.error(error);
    }

    isEmailMode = false;

    send.removeEventListener("click", sendHandler);
    txtInput.removeEventListener("keyup", enterHandler);
  };

  const sendHandler = () => submitEmail();

  const enterHandler = (e) => {
    if (e.key === "Enter") submitEmail();
  };

  send.addEventListener("click", sendHandler);
  txtInput.addEventListener("keyup", enterHandler);
}