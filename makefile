deploy:
	- docker run -d -p 8051:3001 -v koomei_vol:/app/prisma/prod.db --name koomei-back koomei:back