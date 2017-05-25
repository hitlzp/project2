# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0008_stutable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stutable',
            name='table',
            field=models.TextField(null=True),
        ),
    ]
