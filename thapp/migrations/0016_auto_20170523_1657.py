# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0015_auto_20170523_1535'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='stumark',
            new_name='stumark1',
        ),
        migrations.AddField(
            model_name='group',
            name='stumark2',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='group',
            name='stumark3',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='group',
            name='stumark4',
            field=models.TextField(null=True),
        ),
    ]
