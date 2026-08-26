# practice-flask

## What this is

This is the hands-on exercise that follows it.gruppen's introductory Flask
presentation (`Introduction_to_Flask_EN.pptx`, included in this repo). It's a
small three-page app — register, log in, see a welcome message — with four
pieces of logic missing for you to fill in. Everything else already works,
so you can run the app immediately and see exactly what you're building
towards.

## Setup

**macOS**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd app
python3 app.py
```

**Windows**

```bash
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cd app
py app.py
```

The app runs on **http://localhost:5000**.

## Your tasks

You'll find each of these marked with a `TODO` comment in the code. They're
listed in the order you'll naturally hit them.

| # | File | Complete | Done when |
|---|------|----------|-----------|
| 1 | [`app/validators.py`](app/validators.py) | `is_valid_email(email)` | Returns `True` only for emails that contain `@` and end with `.com` or `.no`. |
| 2 | [`app/validators.py`](app/validators.py) | `is_valid_password(password)` | Returns `True` only for passwords with at least one digit and one uppercase letter. |
| 3 | [`app/app.py`](app/app.py) | The `/login` route | A `GET` shows the login form; a `POST` checks the credentials and shows either the home page or a login error. |
| 4 | [`app/templates/home.html`](app/templates/home.html) | The greeting `<p>` | It shows "Hello [name], congratulations on logging in. You will turn [age + 1] next year." with the real values filled in. |

Tasks 1 and 2 are plain Python. Task 3 is a Flask route — the register
route directly above it in `app.py` is a working example of the same
GET/POST pattern. Task 4 is a couple of `{{ }}` expressions in a template.

## How to get help

Every page has a **Hint button in the bottom-right corner**. Click it to
see the four tasks, click a task to reveal its hint button, and click that
to open a modal with hint 1. Hints get more specific each time you click
again — hint 1 just names the concept, hint 2 gives you the structure,
hint 3 walks through the logic line by line. After the third hint the
button turns into **Show Solution**, which shows the full answer.

Try for a few minutes on your own before opening hint 1 — that's where
most of the learning happens. Your progress is saved per task as you move
between pages, so it's safe to explore.

## How to check your work

Once you've filled in all four tasks, walk through the app manually:

1. Try registering with an invalid email (e.g. missing `@`, or ending in
   `.org`) — you should see an error and stay on the register page.
2. Register with a valid email but a weak password (no digit or no
   uppercase letter) — same thing, an error and no progress.
3. Register with a valid email and a strong password — you should land on
   the login page.
4. Try logging in with the wrong name or password — you should see a
   login error.
5. Log in with the name and password you registered with — you should
   land on the home page with the correct name and the correct age (one
   more than what you entered when registering).
