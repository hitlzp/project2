# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0035_auto_20170606_1308'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='classmark',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
    ]
