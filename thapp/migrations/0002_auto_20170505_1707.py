# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='introduce',
        ),
        migrations.AddField(
            model_name='course',
            name='thname',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
