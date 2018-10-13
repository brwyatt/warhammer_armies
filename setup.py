#!/user/bin/env python

from setuptools import setup

setup(
    name='warhammerarmies',
    version='0.1.0',
    author='Bryan Wyatt',
    author_email='brwyatt@gmail.com',
    description=('Warhammer Army manager backed by DynamoDB'),
    license='GPLv3',
    keywords='warhammer army armies dynamodb',
    url='https://github.com/brwyatt/warhammer_armies',
    packages=['warhammerarmies'],
    package_dir={'': 'src'},
    include_package_data=False,
    # entry_points={
    #     'console_scripts': [
    #         'warhammer = warhammerarmies:run'
    #     ],
    # },
    install_requires=[
        'boto3==1.7.35'
    ]
)
