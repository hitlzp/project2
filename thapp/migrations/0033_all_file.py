# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('thapp', '0032_auto_20170530_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='all_file',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('file', models.FileField(upload_to=b'file')),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
                ('theuser', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
