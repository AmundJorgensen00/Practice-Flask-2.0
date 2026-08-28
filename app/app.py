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
    if request.method == "POST": # dersom du trykker på register knappen, og har skrevet inn email, navn, alder og passord
        email = request.form["email"] # setter oppgite data til tilsvarene variabler
        name = request.form["name"]
        age = request.form["age"]
        password = request.form["password"]

        if not is_valid_email(email): # sjekker om email er gyldig, hvis ikke returner register.html med error melding
            return render_template(
                "register.html",
                error="That doesn't look like a valid email — it must "
                "contain '@' and end with .com or .no.",
            )

        if not is_valid_password(password): # sjekker om passord er gyldig, hvis ikke returner register.html med error melding
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
#   - on POST, read the name and the password from the form,
#     call the given check_credentials(name, password), and:
#       - if it returns True: render "home.html", passing the registered
#         name and age as keyword arguments
#       - if it returns False: re-render "login.html" with an error
#         message
#
# register() above follows exactly this GET/POST pattern — read it first.
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST": # når vi trykker på login knappen, og har skrevet inn navn og passord
        name = request.form["name"] # setter det gitte navnet fra brukeren til variabelen name
        password = request.form["password"] # setter det gitte passordet fra brukeren til variabelen password

        if check_credentials(name, password): #logic for om navn og passord stemmer overens med det som er registrert
            return render_template( #sender videre til home.html med navn og alder som keyword arguments
                "home.html", name=session["name"], age=session["age"]
            )
        else:
            return render_template( #navn eller passord stemmer ikke, sender tilbake til login.html med error melding
                "login.html", error="Invalid name or password."
            )

    return render_template("login.html") #Vi får ikke 'POST', altså 'GET' i dette tilfelle. Dette betyr t vi åpner login.html for første gang.



if __name__ == "__main__":
    app.run(debug=True)
