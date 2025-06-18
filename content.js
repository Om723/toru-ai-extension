const wrapper = document.createElement("div");
wrapper.id = "floating-wrapper";
wrapper.classList.add("collapsed");

let chatHistory = [];

Object.assign(wrapper.style, {
  position: "fixed",
  bottom: "60px",
  right: "40px",
  height: "40px",
  borderRadius: "40px",
  zIndex: "999999",
  background: "linear-gradient(145deg, #fdf1e6, #ffe0cb)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 8px 20px rgba(255, 195, 160, 0.35), inset 0 1px 1px rgba(255,255,255,0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out",
  width: "40px",
  padding: "0 0px",
});

const mic = document.createElement("img");
mic.src = "https://framerusercontent.com/images/nsJO65KEQQCaT68S2jWiQdg7mg.svg";
mic.alt = "Mic";

Object.assign(mic.style, {
  width: "40px",
  height: "24px",
  flexShrink: "0",
  opacity: "0",
  transition: "opacity 0.2s ease",
});

mic.onload = () => {
  mic.style.opacity = "1";
};

let typingContainer = null;
let typingAnimation = null;

function showTyping() {
  typingContainer = document.createElement("div");
  typingContainer.style.width = "100px";
  typingContainer.style.height = "40px";
  typingContainer.style.alignSelf = "flex-start";

  chatBox.appendChild(typingContainer);
  chatBox.style.display = "flex";

  typingAnimation = lottie.loadAnimation({
    container: typingContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: chrome.runtime.getURL("typing.json")
  });
}

function hideTyping() {
  if (typingAnimation) {
    typingAnimation.destroy();
    typingAnimation = null;
  }
  if (typingContainer) {
    chatBox.removeChild(typingContainer);
    typingContainer = null;
  }
}

function renderMessage(role, content) {
  const message = document.createElement("div");

  Object.assign(message.style, {
    maxWidth: "70%",
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    background: role === "user"
      ? "rgba(255, 215, 181, 0.6)"
      : "rgba(255, 255, 255, 0.5)",
    padding: "10px 14px",
    borderRadius: "18px",
    fontSize: "14px",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    whiteSpace: "pre-wrap",
    lineHeight: "1.4"
  });

  message.textContent = content;
  chatBox.appendChild(message);

  chatBox.style.display = "flex";
  setTimeout(() => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: "smooth"
    });
  }, 50);
}

const chatBox = document.createElement("div");
chatBox.id = "chat-box";

Object.assign(chatBox.style, {
  position: "fixed",
  bottom: "110px",
  right: "40px",
  width: "360px",
  maxHeight: "300px",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  background: "rgba(255, 245, 235, 0.45)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255,255,255,0.4)",
  borderRadius: "20px",
  padding: "12px 16px",
  flexDirection: "column",
  display: "none",
  gap: "10px",
  boxSizing: "border-box",
  zIndex: "999998",
});

document.body.appendChild(chatBox);

chatBox.style.overflowY = "auto";
chatBox.style.scrollbarWidth = "none";
chatBox.style.msOverflowStyle = "none";

chatBox.style.setProperty("scrollbar-width", "none");
chatBox.style.setProperty("overflow", "-webkit-paged-x");
chatBox.style.setProperty("overflow", "auto");

const style = document.createElement("style");
style.textContent = `
  #chat-box::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
document.head.appendChild(style);

const textInput = document.createElement("input");
textInput.placeholder = "Write an email for me...";
textInput.type = "text";
textInput.id = "assistant-text-input";

Object.assign(textInput.style, {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#333",
  background: "transparent",
  border: "none",
  outline: "none",
  marginLeft: "10px",
  flex: "1",
  opacity: "0",
  pointerEvents: "none",
  transition: "opacity 0.3s ease"
});

const close = document.createElement("div");
Object.assign(close.style, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  cursor: "pointer",
  opacity: "0",
  pointerEvents: "none",
  transition: "opacity 0.3s ease, background 0.3s ease"
});

const closeIcon = document.createElement("img");
closeIcon.src = "https://framerusercontent.com/images/XEZdKq5mm1c2ksezQzT9RvKU.svg";
closeIcon.alt = "Close";
Object.assign(closeIcon.style, {
  width: "24px",
  height: "24px",
  display: "block",
  borderRadius: "inherit",
  objectFit: "cover",
  objectPosition: "center center"
})

wrapper.appendChild(mic);
wrapper.appendChild(textInput);
close.appendChild(closeIcon);
wrapper.appendChild(close);
document.body.appendChild(wrapper);

const sendIcon = document.createElement("img");
sendIcon.src = chrome.runtime.getURL("send.png");
sendIcon.alt = "Send";
Object.assign(sendIcon.style, {
  width: "24px",
  height: "24px",
  display: "none",
  borderRadius: "inherit",
  objectFit: "cover",
  objectPosition: "center center"
});

close.appendChild(sendIcon);

textInput.addEventListener("input", () => {
  const hasText = textInput.value.trim().length > 0;
  closeIcon.style.display = hasText ? "none" : "block";
  sendIcon.style.display = hasText ? "block" : "none";
});

wrapper.addEventListener("click", () => {
  if (wrapper.classList.contains("collapsed")) {
    wrapper.style.width = "360px";
    wrapper.classList.remove("collapsed");
    if (chatHistory.length > 0) {
      chatBox.style.display = "flex";
    } else {
      chatBox.style.display = "none";
    }
    setTimeout(() => {
      textInput.style.opacity = "1";
      close.style.opacity = "1";
      textInput.style.pointerEvents = "auto";
      close.style.pointerEvents = "auto";
    }, 100);
  }
});

function openPreFilledGmail({ to, subject, body }) {
  const base = "https://mail.google.com/mail/?view=cm&fs=1";
  const url = `${base}&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, "_blank");
}

close.addEventListener("click", (e) => {
  e.stopPropagation();
  const hasText = textInput.value.trim().length > 0;

  if (hasText) {
    const userMsg = textInput.value.trim();
    chatHistory.push({ role: "user", content: userMsg });
    renderMessage("user", userMsg);

    textInput.value = "";
    textInput.dispatchEvent(new Event("input"));

    const inboxHTML = document.documentElement.outerHTML;

    showTyping();

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: chatHistory,
        inboxHTML: inboxHTML
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        hideTyping();
        const botReply = data.reply || "No reply";

        if (botReply.startsWith("3")) {
          const matchTo = botReply.match(/To:\s*(.*)/i);
          const matchSub = botReply.match(/Sub:\s*(.*)/i);
          const matchBody = botReply.match(/Body:\s*([\s\S]*)/i);

          if (matchTo && matchSub && matchBody) {
            openPreFilledGmail({
              to: matchTo[1].trim(),
              subject: matchSub[1].trim(),
              body: matchBody[1].trim(),
            });

            chatHistory.push({ role: "assistant", content: "I've opened a draft email in a new tab for your review. Feel free to make any changes before sending." });
            renderMessage("assistant", "I've opened a draft email in a new tab for your review. Feel free to make any changes before sending.");
          } else {
            chatHistory.push({ role: "assistant", content: "Sorry, I couldn’t parse the email format." });
            renderMessage("assistant", "Sorry, I couldn’t parse the email format.");
          }
        } else {
          if (/^[12]/.test(botReply)) {
            const currentURL = window.location.href;
            const isInGmail = currentURL.startsWith("https://mail.google.com/mail/u/0/#inbox");

            if (!isInGmail) {
              const warningMsg = "Please open your Gmail inbox and try again.";
              chatHistory.push({ role: "assistant", content: warningMsg });
              renderMessage("assistant", warningMsg);
              return;
            }

            const displayReply = botReply.slice(2);
            chatHistory.push({ role: "assistant", content: displayReply });
            renderMessage("assistant", displayReply);
          } else {
            const displayReply = /^[0-2] /.test(botReply) ? botReply.slice(2) : botReply;
            chatHistory.push({ role: "assistant", content: displayReply });
            renderMessage("assistant", displayReply);
          }
        }
      })
      .catch((err) => {
        hideTyping();
        console.error("Error:", err);
      });

    return;
  }
  chatBox.style.display = "none";
  textInput.style.opacity = "0";
  close.style.opacity = "0";
  textInput.style.pointerEvents = "none";
  close.style.pointerEvents = "none";
  wrapper.style.width = "40px";
  wrapper.style.padding = "0 0px";
  wrapper.classList.add("collapsed");
});

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && textInput.value.trim().length > 0) {
    e.preventDefault();
    close.click();
  }
});
