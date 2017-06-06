# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0039_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='classmark',
            field=models.CharField(default=b'', max_length=1),
        ),
    ]
