#!/usr/bin/make -f 

node-path = /home/aberlanas/bin/node/bin

run:
	@echo " Starting with nodemon "
	$(node-path)/npm run dev

run-react:
	@echo " Starting React "
	$(node-path)/npm run start

create-db:
	@echo " * Create the Database "
	sudo mysql -u root -p < db/create-db-skel.sql 

populate-db:
	@echo " * [ DB ] : Populate Users "
	sudo mysql -u root -p < db/populate-usuarios.sql 
	sudo mysql -u root -p < db/populate-permisos.sql 


