jekyll --no-auto --no-server
s3cmd sync --acl-public --delete-removed _site/ s3://www.geoffblair.com/
