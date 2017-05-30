# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0031_all_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='all_file',
            name='group',
        ),
        migrations.RemoveField(
            model_name='all_file',
            name='theclass',
        ),
        migrations.DeleteModel(
            name='all_file',
        ),
    ]
