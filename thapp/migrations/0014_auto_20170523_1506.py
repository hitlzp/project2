# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0013_inclass'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='stumark',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='group',
            name='thmark',
            field=models.TextField(null=True),
        ),
    ]
