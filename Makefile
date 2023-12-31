include secrets.env
export


run_local_node:
	node backpacker/server.js
	
run_local_flask:
	python flask-server-roti/server.py


build_and_test_local:
	docker build -t roti-7-local .
	docker run --rm -p 5000:5000 roti-7-local


repo_name := harneet-server-repo
image_name := consolidated-harneet-server-image

push_artifact :
	docker build -t us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):1 .
	docker push us-central1-docker.pkg.dev/roti-7/$(repo_name)/$(image_name):1
	

