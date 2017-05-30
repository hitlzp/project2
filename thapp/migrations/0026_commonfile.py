# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0025_group_isaval'),
    ]

    operations = [
        migrations.CreateModel(
            name='commonfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('headFile', models.FileField(upload_to=b'./upload', verbose_name=b'\xe6\x96\x87\xe4\xbb\xb6')),
                ('course', models.ForeignKey(to='thapp.Course')),
            ],
        ),
    ]
