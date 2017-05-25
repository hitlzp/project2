# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0019_auto_20170523_1814'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='thmark',
            new_name='thmark1',
        ),
        migrations.AddField(
            model_name='group',
            name='thmark2',
            field=models.TextField(default=b''),
        ),
    ]
