import boto3
from boto3.dynamodb.conditions import Key


table = boto3.resource('dynamodb', region_name='us-west-2').Table('warhammer')


def get_descendants(root='None'):
    if root == 'None':
        tree = {}
    else:
        tree = get_object(root)
        if 'Name' in tree:
            del tree['Name']
        if 'Type' in tree:
            del tree['Type']
        if 'parentUUID' in tree:
            del tree['parentUUID']

    res = get_children(root)

    for i in res:
        tree['{Type}: {Name}'.format(**i)] = get_descendants(root=i['UUID'])

    return tree


def get_ancestors(uuid):
    tree = get_object(uuid)

    if tree['parentUUID'] != 'None':
        tree['parent'] = get_ancestors(tree['parentUUID'])

    del tree['parentUUID']

    return tree


def get_children(parentUUID='None'):
    return table.query(
        IndexName='parentUUID-UUID-index',
        KeyConditionExpression=Key('parentUUID').eq(parentUUID)
    ).get('Items', [])


def get_object(uuid):
    return table.get_item(Key={'UUID': uuid}).get('Item', {})
