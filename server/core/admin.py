from django.contrib import admin
from .models import User, Profile
from unfold.admin import ModelAdmin

# Register your models here.

@admin.register(User)
class UserAdmin(ModelAdmin):
    pass

@admin.register(Profile)
class ProfileAdmin(ModelAdmin):
    pass
