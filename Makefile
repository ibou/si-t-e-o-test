env ?= dev
.PHONY       =  # Not needed here, but you can put your all your targets to be sure
                # there is no name conflict between your files and your targets.

## —— 🐝 The Strangebuzz Symfony Makefile 🐝 ———————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
SYMFONY_BIN   = symfony
SYMFONY       = symfony console

sf: ## List all Symfony commands
	cd app && $(SYMFONY)

serve: ## Serve the application with HTTPS support
	cd app && $(SYMFONY_BIN) serve --no-tls -d

npm-start: ## Serve the application with HTTPS support
	cd react && npm start&

unserve: ## Stop the webserver
	cd app && $(SYMFONY_BIN) server:stop

## —— Docker ———————————————————————————————————————————————————————————————

start: ## start docker bdd postgres
	cd app && docker-compose up -d
kill-node:
	cd react && killall -9 node
stop: ## start docker bdd postgres 
	cd app && docker-compose down \
	unserve \
	kill-node 

restart: \
	stop \
	start

## Start all server
start-all-server: \
	serve \
	start \
	npm-start

fixtures:
	cd app && symfony console hautelook:fixtures:load --no-interaction --env=dev

database:
	cd app && symfony console doctrine:database:create --if-not-exists --env=dev
	cd app && symfony console doctrine:schema:update --force --env=dev

update-db:
	cd app && symfony console doctrine:schema:update --force --env=dev

## update database and #load fixtures : prepare 
prepare: \
	database \
	fixtures

init-jwt:
	cd app && mkdir -p config/jwt
	cd app && openssl genrsa -out config/jwt/private.pem 4096
	cd app && openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
	cd app &&  chmod 644 config/jwt/public.pem
	cd app && chmod 644 config/jwt/private.pem
