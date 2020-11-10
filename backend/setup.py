from setuptools import setup, find_packages

setup(
    name='Monster-Pocket-Money',
    version='0.1',
    author='Holly Thomas',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-pymongo',
        'flask-restful',
        'dnspython',
        'python-dotenv',
    ],
    extras_require={
        'dev': [
            'ipython',
            'mypy',
            'rope',
            'pytest',
            'mongomock',
        ]
    },
    python_requires='>=3.6.*'
)
