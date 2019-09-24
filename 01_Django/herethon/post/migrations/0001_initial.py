# Generated by Django 2.1.8 on 2019-07-05 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('body', models.TextField()),
                ('location', models.CharField(max_length=10)),
                ('liketime', models.IntegerField(choices=[('1시', 1), ('2시', 2), ('3시', 3), ('4시', 4), ('5시', 5), ('6시', 6), ('7시', 7), ('8시', 8), ('9시', 9), ('10시', 10), ('11시', 11), ('12시', 12), ('13시', 13), ('14시', 14), ('15시', 15), ('16시', 16), ('17시', 17), ('18시', 18), ('19시', 19), ('20시', 20), ('21시', 21), ('22시', 22), ('23시', 23), ('24시', 24)], max_length=2)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('update_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]