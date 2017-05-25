# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0017_auto_20170523_1713'),
    ]

    operations = [
        migrations.AddField(
            model_name='stutable',
            name='isparty',
            field=models.IntegerField(default=0),
        ),
    ]
