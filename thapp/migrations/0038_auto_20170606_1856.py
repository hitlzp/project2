# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0037_remove_group_classmark'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='group',
            name='course',
        ),
        migrations.RemoveField(
            model_name='group',
            name='stu',
        ),
        migrations.DeleteModel(
            name='Group',
        ),
    ]
