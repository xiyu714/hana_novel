sed -i "/# GitHub520 Host Start/Q" /etc/hosts && curl https://raw.hellogithub.com/hosts >> /etc/hosts
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
# 第一次执行
# pm2 start npm --name "novel" -- run server
