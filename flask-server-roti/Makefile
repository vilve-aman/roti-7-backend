include secrets.env
export



run_app :
	flask --app server --debug run

repo_name := flask-roti-7
image_name := roti-7-image
version := 1

push_artifact :
	docker build -t us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):$(version) .
	docker push us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):$(version)

run_local_artifact :
	docker build -t $(image_name) .
	docker run -p 5000:5000 $(image_name)