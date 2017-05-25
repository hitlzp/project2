# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0004_auto_20170508_2027'),
    ]

    operations = [
        migrations.AddField(
            model_name='all_class',
            name='endtime',
            field=models.DateTimeField(default=b'2012-05-15 21:05'),
        ),
        migrations.AddField(
            model_name='all_class',
            name='isnecessary',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='all_class',
            name='starttime',
            field=models.DateTimeField(default=b'2012-05-15 21:05'),
        ),
    ]
