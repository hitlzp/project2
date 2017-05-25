# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0018_stutable_isparty'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stutable',
            name='isparty',
        ),
        migrations.AddField(
            model_name='group',
            name='isparty',
            field=models.IntegerField(default=0),
        ),
    ]
