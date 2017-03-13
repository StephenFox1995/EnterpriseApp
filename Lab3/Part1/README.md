## Enterprise Application Development Lab 2

### Part 3
see models.js

--- 

### Part 4
see populate.js, this script will populate the database.
Usage: node populate.js

--- 

### Part 5
#### CRUD Operations
Create - POST participent

```bash
curl http://localhost:3000/participent -X POST -d \
'{ 
	"participent": { 
		"name": "Alice Fink", 
		"address": "22 Navan Road", 
		"type": "claimant" 
	} 
}' 
```

Read - GET participent

```bash
curl http://localhost:3000/participent/5 -X GET
```

Update - PUT participent

```bash
curl http://localhost:3000/participent/5 -X PUT -d \
'{
	"participent": {
		"name": "Alice Fink",
    	"address": "22 New Road Park",
		"type": "claimant"
	}
}'
```

Delete - DELETE participent

```bash
curl http://localhost:3000/participent/5 -X DELETE
```

---

Create - POST courtroom

```bash
curl http://localhost:3000/courtroom -X POST -d \
'{
	"courtroom": { "number": 1 }
}'
```

Read - GET courtroom

```bash
curl http://localhost:3000/courtroom/6 -X GET -d
```

Update - PUT courtroom

```bash
curl http://localhost:3000/courtroom/6 -X PUT -d \
'{
	"courtroom": { "number": 666 }
}'
```

Delete - DELETE courtroom

```bash
curl http://localhost:3000/courtroom/6 -X DELETE
```

---

Create - POST judge

```bash
curl http://localhost:3000/judge -X POST -d \
'{
	"judge": {
		"name": "Judge Francis Maguire",
		"room": 100,
		"ext": "08500005"
	}
}'
```

Read - GET judge

```bash
curl http://localhost:3000/judge/1 -X GET
```

Update - PUT judge

```bash
curl http://localhost:3000/judge/1 -X PUT -d \
'{
	"judge": {
		"name": "Stephen Fox",
		"room": 666,
		"ext": "08500005"
	}
}'
```

Delete - DELETE judge

```bash
curl http://localhost:3000/judge/1 -X DELETE
```

---

Create - POST case

```bash
curl http://localhost:3000/case -X POST -d \
'{
	"case": {
		"judge_id": 1,
		"courtroom_id": 1,
		"respondent_id": 1,
		"start_date": "2017-01-01",
		"duration": 1,
		"result": true
	}
}'
```

Read - GET case

```bash
curl http://localhost:3000/case/1 -X GET
```

Read - PUT case

```bash
curl http://localhost:3000/case/1 -X PUT -d \
'{
	"case": {
		"judge_id": 1,
		"courtroom_id": 1,
		"claimant_id": 1,
		"respondent_id": 2,
		"start_date": "2017-02-14",
		"duration": 2,
		"result": true
	}
}'
```

Delete - DELETE case

```bash
curl http://localhost:3000/case/1 -X DELETE
```