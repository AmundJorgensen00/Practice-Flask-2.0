"""Routes for practice-flask.

TASK 3 lives here — see the comment above the login() route below.
"""

from flask import Flask, render_template, request, session

from validators import is_valid_email, is_valid_password

app = Flask(__name__)

# Given — do not change.
app.secret_key = "practice-flask-not-a-real-secret"


def check_credentials(name, password):
    """Given — you do not need to change this. Returns True if name and
    password match the user registered on the first page."""
    return session.get("name") == name and session.get("password") == password


@app.route("/", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        name = request.form["name"]
        age = request.form["age"]
        password = request.form["password"]

        if not is_valid_email(email):
            return render_template(
                "register.html",
                error="That doesn't look like a valid email — it must "
                "contain '@' and end with .com or .no.",
            )

        if not is_valid_password(password):
            return render_template(
                "register.html",
                error="Password must contain at least one digit and one "
                "uppercase letter.",
            )

        # Store the registered user in the session. request.form always
        # gives back strings, so `age` is converted to int here, once, at
        # registration time — that way every template that uses `age` can
        # do arithmetic on it directly without worrying about types.
        session["name"] = name
        session["email"] = email
        session["age"] = int(age)
        session["password"] = password

        return render_template("login.html")

    return render_template("register.html")


# TODO TASK 3: Write the /login route.
#
# It must:
#   - accept both GET and POST (methods=["GET", "POST"])
#   - on GET, render "login.html"
#   - on POST, read request.form["name"] and request.form["password"],
#     call the given check_credentials(name, password), and:
#       - if it returns True: render "home.html", passing the registered
#         name and age (session["name"], session["age"]) as keyword
#         arguments
#       - if it returns False: re-render "login.html" with an error
#         message, e.g. render_template("login.html", error="...")
#
# register() above follows exactly this GET/POST pattern — read it first.
@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")


if __name__ == "__main__":
    app.run(debug=True)
