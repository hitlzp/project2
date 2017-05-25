# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0010_auto_20170516_1837'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stuapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stuclass',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('stu', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
