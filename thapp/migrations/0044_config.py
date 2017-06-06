# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0043_auto_20170606_1920'),
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('IngratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('IngratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('IngratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('IngratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TogratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TogratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TogratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TogratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('SelfratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('SelfratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('SelfratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('SelfratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('OtherratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('OtherratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('OtherratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('OtherratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtosratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtosratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtosratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtosratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtogratioA', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtogratioB', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtogratioC', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('TtogratioD', models.DecimalField(default=0, max_digits=8, decimal_places=2)),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
