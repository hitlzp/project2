# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0022_auto_20170524_1406'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='theratio',
            name='theclass',
        ),
        migrations.AddField(
            model_name='group',
            name='classmark',
            field=models.CharField(default=b'', max_length=1),
        ),
        migrations.DeleteModel(
            name='Theratio',
        ),
    ]
