# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0016_auto_20170523_1657'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='stumark1',
            field=models.TextField(default=b''),
        ),
        migrations.AlterField(
            model_name='group',
            name='stumark2',
            field=models.TextField(default=b''),
        ),
        migrations.AlterField(
            model_name='group',
            name='stumark3',
            field=models.TextField(default=b''),
        ),
        migrations.AlterField(
            model_name='group',
            name='stumark4',
            field=models.TextField(default=b''),
        ),
        migrations.AlterField(
            model_name='group',
            name='thmark',
            field=models.TextField(default=b''),
        ),
    ]
