echo "git pull"
git pull
echo "front_end"
cd ./front_end
npm install
npm run front-build
echo ""
cd ../back_end
npm install
pm2 restart novel
