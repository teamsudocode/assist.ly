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


