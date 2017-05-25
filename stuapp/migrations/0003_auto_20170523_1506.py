# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stuapp', '0002_stuclass'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stuclass',
            name='stu',
        ),
        migrations.RemoveField(
            model_name='stuclass',
            name='theclass',
        ),
        migrations.DeleteModel(
            name='Stuclass',
        ),
    ]
