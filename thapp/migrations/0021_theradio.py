# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0020_auto_20170523_2017'),
    ]

    operations = [
        migrations.CreateModel(
            name='Theradio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('grouptogroup', models.IntegerField(default=0)),
                ('ingroup', models.IntegerField(default=0)),
                ('self', models.IntegerField(default=0)),
                ('other', models.IntegerField(default=0)),
                ('theA', models.IntegerField(default=0)),
                ('theB', models.IntegerField(default=0)),
                ('theC', models.IntegerField(default=0)),
                ('theD', models.IntegerField(default=0)),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
