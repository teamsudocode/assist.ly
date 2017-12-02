from .request_type import request_type
from .comment_helper import *
from .models import FB_Comment, Issue, Conversation

def callback(obj):
    if request_type(obj) == 'comment':
        if is_issue(obj):
            comment_handler(obj)
        else:
            reply_handler(obj)
    elif request_type(obj) == 'like':
        like_handler(obj)

def like_handler(obj):
    parentid = obj['entry'][0]['changes'][0]['value']['parent_id']
    try:
        i = Issue.objects.get(comment__comment_id=parentid)
        i.priority += 1
        i.save()
        print(i)
    except:
        print("Like does not belong to an issue")


def comment_handler(obj):
    comment_obj = handle_issue(obj)
    try:
        i = FB_Comment.objects.create(comment_id=comment_obj['id'],
                                    post_id=comment_obj['comment'],
                                    page_id=comment_obj['page_id'],
                                    message=comment_obj['message'],
                                    sender_name=comment_obj['sender_name'],
                                    sender_id=comment_obj['sender_id'],
                                    created_at=comment_obj['created_id'])
        j = Issue.objects.create(source=1,
                                status=1,
                                priority=1,
                                comment=i)
        k = Conversation.objects.create(message=comment_obj['message'],
                                        comment=i,
                                        issue=j)
        print(i, j, k)
    except Exception as e:
        print(e)


def reply_handler(obj):
    parentid = obj['entry'][0]['changes'][0]['value']['parent_id']
    reply_obj = handle_reply(obj)
    i = FB_Comment.objects.create(comment_id=reply_obj['id'],
                                  post_id=reply_obj['comment'],
                                  page_id=reply_obj['page_id'],
                                  message=reply_obj['message'],
                                  sender_name=reply_obj['sender_name'],
                                  sender_id=reply_obj['sender_id'],
                                  created_at=reply_obj['created_id']
                                  )
    print(i)
    try:
        parent_issue = Issue.objects.get(comment__comment_id=parentid)
        parent_issue.priority += 1
        parent_issue.save()

        j = Conversation.objects.create(message=reply_obj['message'],
                                        comment=i,
                                        issue=parent_issue)
        print(j)
    except Exception as e:
        print (e)


def test():
    import json
    a = ''
    with open('snippets/fb-comment.json') as f:
        a = f.read()
    b = json.loads(a)
    with open('snippets/fb-reply.json') as f:
        a = f.read()
    c = json.loads(a)
    with open('snippets/fb-comment-like.json') as f:
        a = f.read()
    d = json.loads(a)
    callback(b)
    callback(c)
    callback(d)
if __name__=='__main__':
    test()
