from django.db import models

class Transaction(models.Model):
    transaction_type = models.CharField(max_length=20)
    amount = models.FloatField()
    recipient_sender = models.CharField(max_length=50, blank=True)
    label = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    transaction_date = models.DateField()
    repeat = models.BooleanField(default=False)
    repeat_frequency = models.CharField(max_length=50, blank=True)
    repeat_until = models.CharField(max_length=50, blank=True, null=True)
    transaction_day = models.PositiveIntegerField(default=None, null=True)
    skipped_months = models.CharField(max_length=50, null=True, blank=True)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="transactions",
        on_delete = models.CASCADE,
    )
    # households = models.ForeignKey(
    #     "household.Household",
    #     related_name="transactions",
    #     on_delete = models.DO_NOTHING,
    #     # null=True,
    #     blank=True,
    # )

    def __str__(self):
        return f'{self.transaction_date} - {self.amount} - {self.recipient_sender} - {self.description}'
