from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    @property
    def name(self):
        return self.user.first_name + " " + self.user.last_name
    
    def __str__(self):
        return self.user.username
        