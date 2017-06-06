# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0033_all_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('IngratioA', models.DecimalField(max_digits=8, decimal_places=2)),
                ('IngratioB', models.DecimalField(max_digits=8, decimal_places=2)),
                ('IngratioC', models.DecimalField(max_digits=8, decimal_places=2)),
                ('IngratioD', models.DecimalField(max_digits=8, decimal_places=2)),
                ('TogratioA', models.DecimalField(max_digits=8, decimal_places=2)),
                ('TogratioB', models.DecimalField(max_digits=8, decimal_places=2)),
                ('TogratioC', models.DecimalField(max_digits=8, decimal_places=2)),
                ('TogratioD', models.DecimalField(max_digits=8, decimal_places=2)),
                ('SelfratioA', models.DecimalField(max_digits=8, decimal_places=2)),
                ('SelfratioB', models.DecimalField(max_digits=8, decimal_places=2)),
                ('SelfratioC', models.DecimalField(max_digits=8, decimal_places=2)),
                ('SelfratioD', models.DecimalField(max_digits=8, decimal_places=2)),
                ('OtherratioA', models.DecimalField(max_digits=8, decimal_places=2)),
                ('OtherratioB', models.DecimalField(max_digits=8, decimal_places=2)),
                ('OtherratioC', models.DecimalField(max_digits=8, decimal_places=2)),
                ('OtherratioD', models.DecimalField(max_digits=8, decimal_places=2)),
                ('theclass', models.ForeignKey(to='thapp.All_class')),
            ],
        ),
    ]
