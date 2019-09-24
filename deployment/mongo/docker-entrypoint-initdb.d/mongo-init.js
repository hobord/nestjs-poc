db.getSiblingDB('nestjs').createUser({user: 'dbuser', pwd: 'secret', roles: ['readWrite']})
