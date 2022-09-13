# Moni wallet task

## Steps to run the app
**1. Clone** the repo

**2. run :** npm install

**3.** Create a new .env file, paste the .env content at the bottom of the readme and modifty to your taste.

**4. Migrate to db :** npm run migrate

**5. Seed the db :** npm run seed

**6. Start the app :** npm run start:dev


## Call the 2 endpoint
**BaseUrl** : https://moni-wall.herokuapp.com/api/v1 or localhost:{your port}/api/v1
  
**Note** : The user with is : 1 has been seeded with the provided public and secret keys to perform the funding and transfer transactions.
  
**1. Fund endpoint:**
  
**URL**: {baseUrl}/transactions/fund
  
**Payload** : 
  
    {
      "userId" : 1,
      "amount" : 10
    }



**2. Transfer endpoint:**

**URL**: {baseUrl}/transactions/transfer

**Payload**:
 
    {
    "senderId" : 1,
    "amount" : 1.149,
    "recipientId" : 2
    }


## Content of env (feel free to costomize to your own environment)


PORT = 2000

DB_URL=postgres://postgres:{password}/{dbname}

AES_KEY = moniaes#09hyhyhy

IV_KEY = moniiv#78hjhjhjh

PAYSTACK_URL = https://api.paystack.co/transaction/initialize

GETUSER_URL = https://moni-nextjs.herokuapp.com/api/getUser or localhost:{your port}/api/getUser