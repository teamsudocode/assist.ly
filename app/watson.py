import requests

access_token = ""


def get_sentiment(text):


    params = (
        ('version', '2017-02-27'),
        ('text',text),
        ('features', 'sentiment,keywords'),
    )

    r = requests.get('https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze', params=params, auth=('9f13a424-0e67-4936-b9ef-e4702aae997d', 'lPo0obqylJun'))

    print(r.json())



def classifier(text):
    words = text.lower().strip().split()
    issue_keywords = ['issue', 'problem', 'dissatisfied', 'disappointed',
                'sad', 'angry', 'unhappy', 'bad', 'rude','sucks']
    issue_bool =(keyword in words for keyword in issue_keywords)
    if any(issue_bool):
        return 'Issue'
    appreciation_keywords = ['thank', 'help', 'best', 'good','amazing',                              'recommend','nice', 'grateful']
    appreciation_bool = (keyword in words for keyword in appreciation_keywords)
    if any(appreciation_bool):
        return 'Appreciation'
    return 'Neutral'
