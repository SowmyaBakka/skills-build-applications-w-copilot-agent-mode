from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Create users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='marvel'),
            User(email='captain@marvel.com', name='Captain America', team='marvel'),
            User(email='batman@dc.com', name='Batman', team='dc'),
            User(email='superman@dc.com', name='Superman', team='dc'),
        ]
        for user in users:
            user.save()

        # Create activities
        activities = [
            Activity(user='ironman@marvel.com', activity_type='run', duration=30, date='2023-01-01'),
            Activity(user='batman@dc.com', activity_type='cycle', duration=45, date='2023-01-02'),
        ]
        for activity in activities:
            activity.save()

        # Create leaderboard
        leaderboard = [
            Leaderboard(user='ironman@marvel.com', score=100),
            Leaderboard(user='batman@dc.com', score=90),
        ]
        for entry in leaderboard:
            entry.save()

        # Create workouts
        workouts = [
            Workout(name='Pushups', description='Do pushups', difficulty='easy'),
            Workout(name='Squats', description='Do squats', difficulty='medium'),
        ]
        for workout in workouts:
            workout.save()

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
