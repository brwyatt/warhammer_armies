import json

import warhammerarmies as wa


def api_get_ancestors(pathParameters, queryStringParameters):
    uuid = pathParameters.get('uuid', 'None')
    res = wa.get_ancestors(uuid)
    if len(res) == 0:
        return {
            'statusCode': 404,
            'body': json.dumps({
                'message': 'Could not find {0}'.format(uuid)
            })
        }
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }


def api_get_descendants(pathParameters, queryStringParameters):
    uuid = pathParameters.get('uuid', 'None')
    res = wa.get_descendants(uuid)
    if len(res) == 0:
        return {
            'statusCode': 404,
            'body': json.dumps({
                'message': 'Could not find {0}'.format(uuid)
            })
        }
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }


def api_get_children(pathParameters, queryStringParameters):
    uuid = pathParameters.get('uuid', 'None')
    res = wa.get_children(uuid)
    if len(res) == 0:
        return {
            'statusCode': 404,
            'body': json.dumps({
                'message': 'Could not find {0}'.format(uuid)
            })
        }
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }


def api_get_object(pathParameters, queryStringParameters):
    uuid = pathParameters.get('uuid', 'None')
    res = wa.get_object(uuid)
    if len(res) == 0:
        return {
            'statusCode': 404,
            'body': json.dumps({
                'message': 'Could not find {0}'.format(uuid)
            })
        }
    return {
        'statusCode': 200,
        'body': json.dumps(res)
    }


resources = {
    '/{uuid}': api_get_object,
    '/{uuid}/descendants': api_get_descendants,
    '/{uuid}/children': api_get_children,
    '/{uuid}/ancestors': api_get_ancestors,
}
