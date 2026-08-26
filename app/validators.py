"""Validation helpers for the registration form.

TASK 1 and TASK 2 live here. Fill in the two functions below — nothing
else in this file needs to change.
"""


def is_valid_email(email):
    # TODO (TASK 1): Return True if `email` contains "@" AND ends with
    # ".com" or ".no". Otherwise return False.
    #
    # Hint: strings support the `in` keyword to test for a substring, and
    # the `.endswith()` method (which can take a tuple of allowed endings).
    pass


def is_valid_password(password):
    # TODO (TASK 2): Return True if `password` contains at least one digit
    # AND at least one uppercase letter. Otherwise return False.
    #
    # Hint: `any(...)` combined with `.isdigit()` / `.isupper()` on each
    # character in the password works well here.
    pass
