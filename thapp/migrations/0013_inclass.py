# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0012_auto_20170523_1010'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inclass',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('thtable', models.IntegerField(default=0)),
                ('thgrouptable', models.IntegerField(default=0)),
                ('stutable', models.ForeignKey(to='thapp.Stutable')),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
