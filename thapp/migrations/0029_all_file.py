# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0028_auto_20170527_1245'),
    ]

    operations = [
        migrations.CreateModel(
            name='all_file',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('file', models.FileField(upload_to=b'file')),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
