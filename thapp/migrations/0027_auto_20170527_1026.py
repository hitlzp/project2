# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0026_commonfile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commonfile',
            name='headFile',
            field=models.FileField(upload_to=b'file'),
        ),
    ]
