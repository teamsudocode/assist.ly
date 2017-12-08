from datetime import datetime

PAGE_URL = None
PAGE_ID = None

def sanitize(req_obj):
    if is_issue(req_obj):
        return handle_issue(req_obj)
    else:
        return handle_reply(req_obj)

def common_part_construct(obj):
    data = obj['entry'][0]['changes'][0]['value']
    result = {  'id': data['comment_id'].split('_')[1],
                'post_id': data['comment_id'].split('_')[0],
                'page_id': data['post_id'].split('_')[0],
                'message': data['message'],
                'issue': None,
                'priority': None,
                'type': 1,
                'categories': None,
                'comment': None,
                'sender_name': data['from']['name'],
                'sender_id': data['from']['id'],
                'created_at': datetime.fromtimestamp(data['created_time']),
            }
    return result

def is_issue(obj):
    post_id = obj['entry'][0]['changes'][0]['value']['post_id']
    parent_id = obj['entry'][0]['changes'][0]['value']['parent_id']
    print(parent_id, post_id, parent_id == post_id)
    return post_id == parent_id
    # return obj['entry'][0]['changes'][0]['value']['parent_id'].startswith(PAGE_ID)

def handle_issue(obj):
    data = obj['entry'][0]['changes'][0]['value']
    comment_obj = common_part_construct(obj)
    comment_obj['issue'] = True
    comment_obj['comment'] = data['comment_id']
    # comment_obj['categories'] = classify(data['message'])
    print(comment_obj['sender_name'], 'is sender name')
    return comment_obj

def handle_reply(obj):
    data = obj['entry'][0]['changes'][0]['value']
    reply_obj = common_part_construct(obj)
    reply_obj['comment'] = data['parent_id']
    reply_obj['issue'] = False
    return reply_obj

def test():
    a = ''
    with open('../snippets/fb-comment.json') as f:
        a = f.read()

    import json
    b = json.loads(a)
    with open('../snippets/fb-reply.json') as f:
        a = f.read()
    c = json.loads(a)
    print(sanitize(b))
    print(sanitize(c))
