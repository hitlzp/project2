# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cname', models.CharField(max_length=20)),
                ('introduce', models.TextField()),
                ('img', models.ImageField(upload_to=b'img')),
                ('teacher', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Large_class',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number', models.IntegerField(default=0)),
                ('period', models.IntegerField(default=0)),
                ('course', models.ForeignKey(to='thapp.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Min_class',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number', models.IntegerField(default=0)),
                ('period', models.IntegerField(default=0)),
                ('theme', models.TextField()),
                ('course', models.ForeignKey(to='thapp.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Sub_theme',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('subtheme', models.TextField()),
                ('minclass', models.ForeignKey(to='thapp.Min_class')),
            ],
        ),
    ]
