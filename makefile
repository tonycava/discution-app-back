deploy:
	- docker run -d -p 8077:3001 -v koomei_vol:/app/prisma --name koomei-back koomei:back