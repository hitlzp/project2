# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0009_auto_20170516_1754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stutable',
            name='tablename',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
