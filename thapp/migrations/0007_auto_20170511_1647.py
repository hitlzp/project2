# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0006_auto_20170511_1628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='course',
            field=models.ForeignKey(to='thapp.All_class'),
        ),
        migrations.AlterField(
            model_name='group',
            name='stu',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
