set :domain, 'kt03.kaitongamc.com'
set :deploy_to, '/home/deploy/apps/enquiry-pano-frontend-production'
set :user, 'deploy'    # Username in the server to SSH to.
set :port, '10080'     # SSH port number.
set :link_backend_assets, '/home/deploy/apps/pano-backend/current/static/assets'
set :shared_uploads, '/home/deploy/uploads'
set :branch, 'master'
set :common_branch, 'master'
