# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0024_all_class_isaval'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='isaval',
            field=models.IntegerField(default=1),
        ),
    ]
