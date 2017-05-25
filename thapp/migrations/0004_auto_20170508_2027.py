# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0003_auto_20170507_1323'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='minBclass',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='course',
            name='minMclass',
            field=models.IntegerField(default=1),
        ),
    ]
