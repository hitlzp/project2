# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0014_auto_20170523_1506'),
    ]

    operations = [
        migrations.AddField(
            model_name='stutable',
            name='groupnum',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='stutable',
            name='groupsum',
            field=models.IntegerField(default=0),
        ),
    ]
