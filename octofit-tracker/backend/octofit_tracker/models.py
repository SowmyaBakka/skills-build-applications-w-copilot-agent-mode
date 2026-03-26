from djongo import models

class User(models.Model):
    _id = models.ObjectIdField()
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    class Meta:
        db_table = 'users'

class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()
    date = models.DateField()
    description = models.TextField(blank=True, default='')
    schedule = models.CharField(max_length=100, blank=True, default='')
    max_attendance = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    score = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'
