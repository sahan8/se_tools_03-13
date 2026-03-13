const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

let submittedName = '';

const baseStyles = `
  <style>
    :root {
      --bg: #f4f7ff;
      --shell: #ffffff;
      --left-1: #0f766e;
      --left-2: #115e59;
      --text: #111827;
      --muted: #6b7280;
      --line: #dbe1ef;
      --accent: #0f766e;
      --accent-hover: #0d5e58;
    }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 22px;
      font-family: "Verdana", "Tahoma", sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .shell {
      width: min(92vw, 620px);
      background: var(--shell);
      border: 1px solid var(--line);
      border-radius: 18px;
      overflow: hidden;
      display: block;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    }
    .left {
      padding: 34px 28px;
      background: linear-gradient(150deg, var(--left-1), var(--left-2));
      color: #ecfeff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
    }
    .eyebrow {
      margin: 0;
      font-size: 12px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      opacity: 0.86;
    }
    .left h1 {
      margin: 8px 0 10px;
      font-size: 34px;
      line-height: 1.1;
    }
    .left p {
      margin: 0;
      font-size: 15px;
      line-height: 1.5;
      color: #cffafe;
    }
    .chip {
      width: fit-content;
      padding: 8px 12px;
      border: 1px solid rgba(236, 254, 255, 0.4);
      border-radius: 999px;
      font-size: 13px;
    }
    .right {
      padding: 34px 32px;
      display: grid;
      align-content: center;
      gap: 18px;
    }
    .right h2 {
      margin: 0;
      font-size: 29px;
    }
    .right p {
      margin-top: 0;
      margin-bottom: 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.5;
    }
    form {
      display: grid;
      gap: 10px;
    }
    .form-row {
      display: flex;
      gap: 10px;
    }
    input {
      flex: 1;
      padding: 12px 13px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 15px;
      background: #ffffff;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.18);
    }
    button, a.btn {
      display: inline-block;
      padding: 12px 16px;
      border: none;
      border-radius: 10px;
      background: var(--accent);
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      text-align: center;
      transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
    }
    button:hover, a.btn:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
      box-shadow: 0 8px 18px rgba(15, 118, 110, 0.26);
    }
    .greet-box {
      padding: 20px;
      border: 1px dashed #a7f3d0;
      background: #f0fdfa;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 4px;
    }
    .greet-box h2 {
      margin: 0;
      color: #134e4a;
      font-size: 33px;
    }
    .stack {
      display: grid;
      gap: 10px;
    }
    @media (max-width: 760px) {
      .right {
        padding-top: 24px;
      }
      .form-row {
        flex-direction: column;
      }
      button, a.btn {
        width: 100%;
      }
    }
  </style>
`;

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

app.get('/', (req, res) => {
  res.send(`
    ${baseStyles}
    <div class="shell">
      <section class="right">
        <h2>Enter Your Name</h2>
        <p>Type your name below and continue to the greeting page.</p>
        <form method="POST" action="/submit-name">
          <div class="form-row">
            <input type="text" name="username" placeholder="Your name" required />
            <button type="submit">Get Greeting</button>
          </div>
        </form>
      </section>
    </div>
  `);
});

app.post('/submit-name', (req, res) => {
  submittedName = (req.body.username || '').trim();
  res.redirect('/greeting');
});

app.get('/greeting', (req, res) => {
  if (!submittedName) {
    return res.redirect('/');
  }

  const safeName = escapeHtml(submittedName);

  res.send(`
    ${baseStyles}
    <div class="shell">
      <section class="right">
        <div class="stack">
          <div class="greet-box">
            <h2>Hi, ${safeName}!</h2>
          </div>
          <a class="btn" href="/">Go Back</a>
        </div>
      </section>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
