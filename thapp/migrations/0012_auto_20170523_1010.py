# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0011_table'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='table',
            name='theclass',
        ),
        migrations.AddField(
            model_name='stutable',
            name='tablerande',
            field=models.TextField(null=True),
        ),
        migrations.DeleteModel(
            name='Table',
        ),
    ]
