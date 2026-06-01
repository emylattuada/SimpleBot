# SimpleBot

A minimalist chatbot built with HTML, JavaScript and CSS — clean, lightweight, and ready to use out of the box.

## Preview

SimpleBot lives as a **chat bubble** in the corner of the page. Click it to expand the chat window.

| Bubble | Chat window |
|:---:|:---:|
| ![Bubble](screenshots/bubble.webp) | ![Chat](screenshots/chat.webp) |

Once opened, it greets the user and offers a recommended action: **Receive notifications** — which triggers the email flow via EmailJS.

---

## Features

- Simple and clean chat interface
- Email sending via [EmailJS](https://www.emailjs.com/) — no backend required
- Minimalist design with pure HTML, CSS and JavaScript
- Zero dependencies

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/emylattuada/simplebot.git
cd simplebot
```

### 2. Set up EmailJS

SimpleBot uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser — no server needed.

#### Steps:

1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account.
2. Create an **Email Service** (Gmail, Outlook, etc.) and copy your **Service ID**.
3. Create an **Email Template** and copy your **Template ID**.
4. Go to **Account > API Keys** and copy your **Public Key**.

### 3. Add your credentials

You need to replace the placeholder values in **two files**:

#### `index.html` — Public Key

```html
(function(){
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY", // EMAILJS PUBLIC KEY
  });
})();
```

#### `app.js` — Service ID & Template ID

```javascript
try {
  await emailjs.send(
    "YOUR_SERVICE_ID",   // EMAILJS SERVICE ID
    "YOUR_TEMPLATE_ID",  // EMAILJS TEMPLATE ID
    {
      user_email: email,
      user: "test"
    }
  );
```

| Variable | File | Where to find it |
|---|---|---|
| `YOUR_PUBLIC_KEY` | `index.html` | EmailJS → Account → API Keys |
| `YOUR_SERVICE_ID` | `app.js` | EmailJS → Email Services |
| `YOUR_TEMPLATE_ID` | `app.js` | EmailJS → Email Templates |

### 4. Open in browser

No build step needed. Just run in your bash terminal:

```bash
start index.html
```

---

## Project Structure

```
simplebot/
├── index.html        # Main HTML file + EmailJS init
├── style.css         # Styles
├── app.js            # Bot logic + EmailJS integration
├── response.js       # Predefined bot responses
└── images/
    ├── logo.png
    └── send.png
```

---

## Built With

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **[EmailJS](https://www.emailjs.com/)**

---

## License

This project is open source and available under the [MIT License](LICENSE).
