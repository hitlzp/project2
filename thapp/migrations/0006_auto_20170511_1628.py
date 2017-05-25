# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0005_auto_20170508_2140'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('groupid', models.IntegerField(default=0)),
                ('course', models.ForeignKey(to='thapp.Course')),
                ('stu', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
        migrations.RemoveField(
            model_name='sub_theme',
            name='minclass',
        ),
        migrations.DeleteModel(
            name='Sub_theme',
        ),
    ]
