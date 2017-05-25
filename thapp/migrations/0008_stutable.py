# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('thapp', '0007_auto_20170511_1647'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stutable',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tablename', models.CharField(max_length=10, null=True)),
                ('table', models.TextField()),
                ('teacher', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
