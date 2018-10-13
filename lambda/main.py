import json

from warhammerarmies.api import resources


def proxy(event, context):
    if event['resource'] in resources:
        try:
            return resources[event['resource']](
                pathParameters=event['pathParameters'],
                queryStringParameters=event['queryStringParameters'])
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({
                    'message': 'Server error',
                    'details': str(e),
                    'requestID': context.aws_request_id
                })
            }

    return {
        'statusCode': 400,
        'body': json.dumps({
            'message': 'Invalid query'
        })
    }
