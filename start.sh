cd backend
node authServer.js &
node server.js &
cd ../frontend
serve -s build -l 8000