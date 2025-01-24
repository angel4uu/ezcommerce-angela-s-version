from django.contrib.auth.tokens import PasswordResetTokenGenerator

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}{user.usuario_verificado}"

account_activation_token = AccountActivationTokenGenerator()