# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thapp', '0034_config'),
    ]

    operations = [
        migrations.AddField(
            model_name='config',
            name='TtogratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtogratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtogratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtogratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtosratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtosratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtosratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AddField(
            model_name='config',
            name='TtosratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='IngratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='IngratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='IngratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='IngratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='OtherratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='OtherratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='OtherratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='OtherratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='SelfratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='SelfratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='SelfratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='SelfratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='TogratioA',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='TogratioB',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='TogratioC',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
        migrations.AlterField(
            model_name='config',
            name='TogratioD',
            field=models.DecimalField(default=0, max_digits=8, decimal_places=2),
        ),
    ]
