from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(Issue)
admin.site.register(Conversation)
admin.site.register(FB_Comment)
admin.site.register(TW_Tweet)
admin.site.register(WatsonCategory)
