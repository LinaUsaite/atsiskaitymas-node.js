npm install express dotenv postgres zod cookie-parser jsonwebtoken argon2

npm install -D nodemon eslint @eslint/js eslint-config-prettier globals prettier

Paleidimas:
1. cd back
2. npm install - parsius modulius
3. cd ..
4. docker compose up --build

Paleisti serveri - npm run start

docker compose down -v
docker compose up --build

docker compose down
docker compose up

Signup
	1.	user siunčia username/email/password
	2.	validacija
	3.	password hash
	4.	įrašymas į DB

Login
	1.	user siunčia email/password
	2.	surandi userį
	3.	patikrini password
	4.	sukuri tokeną
	5.	įdedi tokeną į cookie

Protect
	1.	ateina request
	2.	paimi cookie
	3.	tikrini tokeną
	4.	surandi userį
	5.	įdedi jį į req.user


    •	argon2 — password hashinimui
	•	jwt — tokenui
	•	cookie-parser — kad skaityti cookie
	•	signup — kuria user
	•	login — prisijungia
	•	protect — tikrina prisijungimą
	•	allowAccessTo — tikrina rolę


.env
PORT = 3001


#database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres

JWT_SECRET = supersecretpassword

JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES_IN = 90



.prettierrc 

{}


.prettierignore

# Ignore artifacts:
build
coverage


HTTP STATUS CODES CHEAT SHEET

--- 2xx SUCCESS ---
200 OK  
→ Sėkminga užklausa (GET, login, update)

201 Created  
→ Sukurtas naujas resursas (signup, POST)

204 No Content  
→ Sėkminga, bet nieko negrąžina (DELETE)

--- 4xx CLIENT ERRORS ---
400 Bad Request  
→ Blogi / neteisingi duomenys

401 Unauthorized  
→ Neprisijungęs (nėra arba blogas token)

403 Forbidden  
→ Prisijungęs, bet neturi teisių

404 Not Found  
→ Nerastas resursas (pvz. ID neegzistuoja)

409 Conflict  
→ Konfliktas (pvz. email jau egzistuoja)

422 Unprocessable Entity  
→ Validacijos klaida (pvz. Zod)

--- 5xx SERVER ERRORS ---
500 Internal Server Error  
→ Serverio klaida (bug, DB problema)

--- GREITA ATMINTINĖ ---
GET → 200  
LOGIN → 200  
SIGNUP → 201  
DELETE → 204  

User klaida → 4xx  
Server klaida → 5xx