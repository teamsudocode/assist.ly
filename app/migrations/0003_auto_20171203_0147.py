# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-03 01:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20171202_1756'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conversation',
            name='comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.FB_Comment'),
        ),
        migrations.AlterField(
            model_name='conversation',
            name='issue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Issue'),
        ),
        migrations.AlterField(
            model_name='fb_comment',
            name='sender_id',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='fb_comment',
            name='sender_name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
