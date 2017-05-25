# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0023_auto_20170524_1618'),
    ]

    operations = [
        migrations.AddField(
            model_name='all_class',
            name='isaval',
            field=models.IntegerField(default=0),
        ),
    ]
