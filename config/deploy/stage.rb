set :domain, '10.132.1.224'
set :deploy_to, '/home/deploy/apps/stage-pano-enquiry-frontend' # dev环境
set :user, 'deploy'    # Username in the server to SSH to.
set :port, '22'     # SSH port number.
set :link_backend_assets, '/home/deploy/apps/pano-backend/current/static/assets'
set :shared_uploads, '/home/deploy/uploads'
set :branch, 'test'
set :common_branch, 'test'
