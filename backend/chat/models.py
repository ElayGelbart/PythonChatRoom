from django.db import models

class User(models.Model):
  username = models.CharField(max_length=50, primary_key=True)
  password = models.CharField(max_length=50)
  email = models.EmailField(max_length=50)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.username

class Message(models.Model):
  message = models.TextField()
  username = models.ForeignKey(User, on_delete=models.CASCADE,related_query_name='username',related_name='username')
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.message