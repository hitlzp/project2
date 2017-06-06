# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('thapp', '0038_auto_20170606_1856'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('groupid', models.IntegerField(default=0)),
                ('stumark1', models.TextField(default=b'')),
                ('stumark2', models.TextField(default=b'')),
                ('stumark3', models.TextField(default=b'')),
                ('stumark4', models.TextField(default=b'')),
                ('thmark1', models.TextField(default=b'')),
                ('thmark2', models.TextField(default=b'')),
                ('isparty', models.IntegerField(default=0)),
                ('classmark', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('isaval', models.IntegerField(default=1)),
                ('course', models.ForeignKey(to='thapp.All_class')),
                ('stu', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
