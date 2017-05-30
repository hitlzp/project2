# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0027_auto_20170527_1026'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commonfile',
            name='course',
        ),
        migrations.DeleteModel(
            name='commonfile',
        ),
    ]
