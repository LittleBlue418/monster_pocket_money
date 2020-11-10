from flask_restful import Api


# For better capturing of unhandled exceptions
# Restores origional flask error handling
# Copied from https://github.com/flask-restful/flask-restful/issues/280#issuecomment-567186686
class ErrorPropagatingApi(Api):
    """Flask-Restful has its own error handling facilities, this propagates errors to flask"""

    def error_router(self, original_handler, e):
        return original_handler(e)