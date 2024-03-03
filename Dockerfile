# Use a imagem base do Node.js 14
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte do projeto para o diretório de trabalho
COPY . .

# Execute o comando de build para construir o aplicativo React.js
RUN npm run build

# Exponha a porta 3000 para que o aplicativo possa ser acessado externamente
EXPOSE 3000

# Defina o comando de inicialização para servir o aplicativo usando o serve (ou qualquer outro servidor HTTP estático)
CMD ["npx", "serve", "-s", "build"]
