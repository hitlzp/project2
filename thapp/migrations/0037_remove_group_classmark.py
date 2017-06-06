# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0036_auto_20170606_1854'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='classmark',
        ),
    ]
