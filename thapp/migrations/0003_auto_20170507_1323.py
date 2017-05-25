# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0002_auto_20170505_1707'),
    ]

    operations = [
        migrations.CreateModel(
            name='All_class',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number', models.IntegerField(default=0)),
                ('period', models.IntegerField(default=0)),
                ('capacity', models.IntegerField(default=0)),
                ('type', models.CharField(max_length=10, null=True)),
                ('theme', models.TextField()),
                ('course', models.ForeignKey(to='thapp.Course')),
            ],
        ),
        migrations.RemoveField(
            model_name='large_class',
            name='course',
        ),
        migrations.RemoveField(
            model_name='min_class',
            name='course',
        ),
        migrations.AlterField(
            model_name='sub_theme',
            name='minclass',
            field=models.ForeignKey(to='thapp.All_class'),
        ),
        migrations.DeleteModel(
            name='Large_class',
        ),
        migrations.DeleteModel(
            name='Min_class',
        ),
    ]
