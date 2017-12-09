import os
import json
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt

from .models import *
from .callbacks import callback

# Create your views here.

def allow_cors(route):
    def wrapper(*args, **kwargs):
        response = route(*args, **kwargs)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        response["Access-Control-Max-Age"] = "1000"
        response["Access-Control-Allow-Headers"] = "*"
        return response
    return wrapper


def normalize_priority(result):
    max_score = max(result, key=lambda x: x['priority'])['priority']

    def set_priority_str(each):
        if each['priority'] > 2/3 * max_score:
            each['priority'] = 'high'
        elif each['priority'] > 1/3 * max_score:
            each['priority'] = 'medium'
        else:
            each['priority'] = 'low'
        return each

    return list(map(set_priority_str, result))


def fb_get_comment_url(page_id, post_id, comment_id):
    return 'https://www.facebook.com/{}/posts/{}?comment_id={}'.format(page_id, post_id, comment_id)

def fb_comment_to_json(each):
    return {
        'id': each.pk,
        'source': ISSUE_SOURCES_DICT[each.source],
        'status': ISSUE_STATUS_DICT[each.status],
        'priority': each.priority,
        'message': each.comment.message,
        'sender': each.comment.sender_name,
        'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p')
    }


@csrf_exempt
@allow_cors
def fb_callback(request):
    if request.method == 'GET':
        key = request.GET['hub.challenge']
        return HttpResponse(key)
    try:
        data = json.loads(request.body)
        print(data)
        print('recieved webhook from facebook')
        callback(data)
    except Exception as e:
        print(e)
    return HttpResponse('gosudocode')


@allow_cors
def get_all_categories(request):
    try:
        client_name = request.GET['client_name']
        response = [
            {'pk': each.pk,
             'category': each.category.capitalize(),
             'open': each.issue_set.count()
            }
            for each in WatsonCategory.objects.filter(client_name=client_name)
        ]
        return JsonResponse(response, safe=False, status=200)
    except KeyError:
        return JsonResponse(
            {'status': 400, 'message': 'Missing parameters'},
            status=400
        )


@allow_cors
def filter_issues(request):
    issues = None
    try:
        issues = Issue.objects.filter(status=int(request.GET['status']))
        if request.GET['category'] == 'null':
            return JsonResponse([], safe=False, status=200)
        else:
            issues = issues.filter(category__pk=int(request.GET['category']))
    except (KeyError, ValueError):
        if 'category' not in request.GET:
            message = 'Missing issue category'
        else:
            message = 'Invalid query parameters'
        return JsonResponse(
            {'status': 400, 'message': message}, status=400
        )
    # issues = Issue.objects.filter(status=status)
    result = [
        {'id': each.pk,
         'source': each.source,
         'status': each.status,
         'priority': each.priority,
         'message': each.comment.message,
         'sender': each.comment.sender_name,
         'category': each.category.category if each.category else None,
         'page_id': each.comment.page_id,
         'post_id': each.comment.post_id,
         'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p'),
         'url': fb_get_comment_url(each.comment.page_id,
                                   each.comment.post_id,
                                   each.comment.comment_id)
        }
        for each in issues]

    response = normalize_priority(result) if result else result
    # response = [fb_comment_to_json(each) for each in issues]
    return JsonResponse(response, safe=False, status=200)
    # return render(request, 'issues.html', context={'issues': response})


@allow_cors
def get_conversation_of_issue(request):
    try:
        issue = Issue.objects.get(pk=request.GET['issue_id'])
        interactions = issue.conversation_set.all().order_by('comment__created_at')

        issue_info = {
            'id': issue.pk,
            'page_id': issue.comment.page_id,
            'post_id': issue.comment.post_id,
            'created_at': issue.comment.created_at,
            'updated_at': issue.comment.updated_at,
            'category': issue.category.category if issue.category else None,
            'url': fb_get_comment_url(issue.comment.page_id,
                                      issue.comment.post_id,
                                      issue.comment.comment_id)
        }
        conversations = [
            {'id': each.pk,
             'message': each.message,
             'who_sent_it': 'company' if each.comment.sender_name == issue.comment.sender_name else 'customer',
             'created_at': each.comment.created_at.strftime('%d %b, %I:%M %p'),
             'sender': each.comment.sender_name,
             'comment_id': each.comment.comment_id,
             'page_id': each.comment.page_id,
             'post_id': each.comment.post_id
            }
            for each in interactions
        ]
        return JsonResponse(
            {'issue_info': issue_info,
             'conversations': conversations
            },
            safe=False, status=200)
        # return render(request, 'conversations.html', context={'issue_info': issue_info, 'conversations': conversations})
    except KeyError:
        return JsonResponse({'message': 'Missing issue_id', 'status': 400}, status=400)
    except ValueError:
        return JsonResponse({'message': 'Invalid request', 'status': 400}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'Issue does not exist', 'status': 404}, status=404)


@csrf_exempt
@allow_cors
def respond_to_issue(request, issue_id):
    try:
        message = request.POST['message']
        notify = request.POST['notify'] if 'notify' in request.POST else None
        issue = Issue.objects.get(pk=issue_id)
        comment_id = issue.comment.comment_id

        if notify:
            # api call to facebook for a comment/response
            # don't add to database
            # fb response will make the entry
            with open(os.path.join(__file__, '../.env.json')) as f:
                fb_token = json.loads(f.read())
            headers = {
                'Authorization': 'Bearer {}'.format(fb_token)
            }
            res = requests.post('https://graph.facebook.com/v2.10/{}_{}/comments'.format(issue.comment.post_id, comment_id),
                              data={'message': message}, headers=headers)
            print(res, res.json())
        else:
            # make the entry to conversation
            Conversation.objects.create(message=message, issue=issue)
        return JsonResponse({'message': 'ok'}, status=200)
    except KeyError:
        return JsonResponse({'message': 'Invalid parameters', 'status': 400}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'Issue does not exist', 'status': 404}, status=404)



@csrf_exempt
@allow_cors
def change_status(request):
    try:
        issue = Issue.objects.get(pk=request.POST['issue_id'])
        issue.status = request.POST['status']
        issue.save()
        return JsonResponse({'message': 'ok'}, status=200)
    except KeyError:
        return JsonResponse({'message': 'Invalid parameters', 'status': 400}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'Issue does not exist', 'status': 404}, status=404)

# user tracking

# categorize
