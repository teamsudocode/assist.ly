from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt

from .models import *

# Create your views here.

def fb_comment_to_json(each):
    return {
        'id': each.pk,
        'source': each.source,
        'status': each.status,
        'priority': each.priority,
        'message': each.comment.message,
        'sender': each.comment.sender_name,
        'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p')
    }

def get_issues_with_status(request):
    try:
        status = request.GET['status']
    except KeyError:
        return JsonResponse(
            {'status': 400, 'message': 'Missing status code'},
            status=400
        )
    issues = Issue.objects.filter(status=status)
    response = [
        {'id': each.pk,
         'source': each.source,
         'status': each.status,
         'priority': each.priority,
         'message': each.comment.message,
         'sender': each.comment.sender_name,
         'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p')
        }
        for each in issues]
    # response = [fb_comment_to_json(each) for each in issues]
    return JsonResponse(response, safe=False, status=200)


def get_conversation_of_issue(request):
    try:
        issue = Issue.objects.get(pk=request.GET['issue_id'])
        interactions = issue.conversation_set.all().order_by('comment__created_at')
        response = [
            {'id': each.pk,
             'message': each.message,
             'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p'),
             'sender': each.comment.sender_name,
            }
            for each in interactions]
        return JsonResponse(response, safe=False, status=200)
    except KeyError:
        return JsonResponse({'message': 'Missing issue_id', 'status': 400}, status=400)
    except ValueError:
        return JsonResponse({'message': 'Invalid request', 'status': 400}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'Issue does not exist', 'status': 404}, status=404)


@csrf_exempt
def respond_to_issue(request, issue_id):
    try:
        message = request.POST['message']
        issue = Issue.objects.get(pk=issue_id)
        comment_id = issue.comment.comment_id
        # api call to facebook for a comment/response
        # don't add to database
        # fb response will make the entry
        return JsonResponse({'message': 'ok'}, status=200)
    except KeyError:
        return JsonResponse({'message': 'Invalid parameters', 'status': 400}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'Issue does not exist', 'status': 404}, status=404)


# user tracking

# categorize
