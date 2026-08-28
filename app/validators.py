"""Validation helpers for the registration form.

TASK 1 and TASK 2 live here. Fill in the two functions below — nothing
else in this file needs to change.
"""


def is_valid_email(email):
    # TODO (TASK 1): Return True if `email` contains "@" AND ends with
    # ".com" or ".no". Otherwise return False.
    #
    if "@" not in email:
        return False

    if not(email.endswith('.com') or email.endswith('.no')):
        return False

    return True


def is_valid_password(password):
    # TODO (TASK 2): Return True if `password` contains at least one digit
    # AND at least one uppercase letter. Otherwise return False.
    #
    if not any(char.isdigit() for char in password):
        return False

    if not any(char.isupper() for char in password):
        return False

    return True


if (__name__ == '__main__'):
    print('Testing validators.py...')
    print('-------------------------')

    print('Testing is_valid_email()...')
    for email in ['test@example.com', 'testexample.com', 'test@example.uk']:
        print(is_valid_email(email))  # Should print True

    print('Testing is_valid_password()...')
    for password in ['Password1', 'password1', 'PASSWORD', 'Passw0rd']:
        print(is_valid_password(password))  # Should print True