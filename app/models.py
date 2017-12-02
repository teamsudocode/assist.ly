from django.db import models

# Create your models here.

class FB_Comment(models.Model):
    comment_id = models.CharField(max_length=20, primary_key=True)
    post_id = models.CharField(max_length=20)
    page_id = models.CharField(max_length=20)
    message = models.CharField(max_length=20)
    sender_name = models.CharField(max_length=20)
    sender_id = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} | {}'.format(self.sender_name, self.comment_id)

class TW_Tweet(models.Model):
    pass

class Issue(models.Model):
    source = models.CharField(max_length=20)
    priority = models.IntegerField(default=0)
    comment = models.ForeignKey(FB_Comment, null=True, blank=True)
    tweet = models.ForeignKey(TW_Tweet, null=True, blank=True)

    def __str__(self):
        return '{} | {} | {}'.format(self.source, self.comment, self.tweet)


class Conversation(models.Model):
    message = models.CharField(max_length=200)
    comment = models.ForeignKey(FB_Comment)
    retweet = models.ForeignKey(TW_Tweet, null=True, blank=True)
    issue = models.ForeignKey(Issue, null=True, blank=True)
