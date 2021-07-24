from django.db import models

class Contact(models.Model):
    comany_or_person_name = models.CharField(max_length=20)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="contacts",
        on_delete = models.CASCADE,
    )

    def __str__(self):
        return self.comany_or_person_name
