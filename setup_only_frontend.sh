echo "Configurando versão do Node"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

source ~/.bashrc

nvm install v18.19.1
nvm use v18.19.1
nvm alias default 18.19.1

echo "Versão do node instalada:"
node -v

echo "Iniciando processo de build do painel de controle"

cd frontend
sudo rm -r node_modules
sudo rm package-lock.json
npm i --force

sudo rm -r build
npm run build
cd ..


echo "Instalando e configurando o Nginx..."

sudo apt install nginx -y


sudo rm -r /var/www/html
sudo mkdir /var/www/html
sudo cp -r ./frontend/build/* /var/www/html


sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/nginx.conf

sudo cp nginx/default /etc/nginx/sites-available
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

echo "Reiniciando nginx"

sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx


echo "Configurando Firewall..."

sudo apt install ufw -y
sudo ufw allow 80     
sudo ufw allow 443      
sudo ufw allow 3337    
sudo ufw enable
