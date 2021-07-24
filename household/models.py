from django.db import models

class Household(models.Model):
    household_name = models.CharField(max_length=20)
    balance = models.FloatField(blank=True, default=0.0)
    members = models.ManyToManyField(
        "jwt_auth.User",
        related_name="households",
        # null=True,
        blank=True,
    )
    created_by = models.ForeignKey(
        "jwt_auth.User",
        related_name="created_households",
        on_delete = models.DO_NOTHING,
    )

    def __str__(self):
        return self.household_name