# Деплой

На сервере (нужны docker, docker compose и nginx):

```bash
# 1. Запустить сайт (поднимется на 127.0.0.1:3000)
docker compose up -d --build

# 2. Подключить nginx-конфиг (предварительно заменить example.com на свой домен)
sudo cp deploy/nginx.conf /etc/nginx/sites-available/loveliza
sudo ln -s /etc/nginx/sites-available/loveliza /etc/nginx/sites-enabled/loveliza
sudo nginx -t && sudo systemctl reload nginx

# 3. HTTPS (по желанию, но лучше сделать — certbot сам допишет конфиг)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

DNS: A-запись домена должна указывать на IP сервера.
