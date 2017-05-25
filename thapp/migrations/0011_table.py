# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0010_auto_20170516_1837'),
    ]

    operations = [
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tablerande', models.TextField(null=True)),
                ('graderande', models.TextField(null=True)),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
