# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0042_config'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='config',
            name='theclass',
        ),
        migrations.DeleteModel(
            name='Config',
        ),
    ]
