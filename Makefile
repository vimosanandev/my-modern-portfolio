.PHONY: install dev build preview deploy clean

## Install dependencies
install:
	npm install

## Start development server
dev:
	npm run dev

## Build for production
build:
	npm run build

## Preview production build locally
preview:
	npm run preview

## Build and deploy to GitHub Pages
deploy:
	npm run deploy

## Remove build output
clean:
	rm -rf dist

## Install, build and deploy in one step
ship: install build deploy

## Show available commands
help:
	@echo ""
	@echo "Available commands:"
	@echo "  make install   - Install dependencies"
	@echo "  make dev       - Start development server"
	@echo "  make build     - Build for production"
	@echo "  make preview   - Preview production build locally"
	@echo "  make deploy    - Build and deploy to GitHub Pages"
	@echo "  make clean     - Remove dist folder"
	@echo "  make ship      - Install, build and deploy in one step"
	@echo ""
