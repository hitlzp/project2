# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0045_auto_20170606_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='classmark',
            field=models.CharField(default=b'', max_length=1),
        ),
    ]
