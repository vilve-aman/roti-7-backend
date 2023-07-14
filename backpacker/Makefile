
repo_name := js-server
image_name := backpacker

push_artifact :
	docker build -t us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):1 .
	docker push us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):1
	