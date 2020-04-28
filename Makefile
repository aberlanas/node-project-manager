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
	sudo mysql -u root -pninguna < db/create-db-skel.sql 

populate-db:
	@echo " * [ DB ] : Populate Users "
	sudo mysql -u root -pninguna < db/populate-usuarios.sql 
	sudo mysql -u root -pninguna < db/populate-permisos.sql 
	sudo mysql -u root -pninguna < db/populate-tecnologias.sql 
	sudo mysql -u root -pninguna < db/populate-projects.sql 
	sudo mysql -u root -pninguna < db/populate-cursos.sql 
	sudo mysql -u root -pninguna < db/populate-calificaciones.sql 

install-dep: 
	@echo " * NPM Installing dependence "
	$(node-path)/npm install $(ARGS) --save

