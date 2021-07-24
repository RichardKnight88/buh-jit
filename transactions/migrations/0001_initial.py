# Generated by Django 3.2.5 on 2021-07-23 23:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('household', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(max_length=20)),
                ('amount', models.FloatField()),
                ('recipient_sender', models.CharField(blank=True, max_length=50)),
                ('label', models.CharField(blank=True, max_length=50)),
                ('description', models.TextField(blank=True)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('repeat', models.BooleanField(default=False)),
                ('repeat_frequency', models.CharField(blank=True, max_length=50)),
                ('repeat_until', models.DateField(blank=True, default=None, null=True)),
                ('transaction_day', models.PositiveIntegerField(default=None, null=True)),
                ('skipped_months', models.CharField(max_length=50, null=True)),
                ('households', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='transactions', to='household.household')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]