# Gunakan Node.js versi 22.8 dengan Alpine sebagai base image
FROM node:22.8-alpine

# Setel direktori kerja di container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Salin seluruh kode aplikasi
COPY . .

# Build aplikasi (jika menggunakan TypeScript atau membutuhkan transpiling)
RUN npm run build

# Generate Prisma Client
RUN npx prisma generate

# Install bash untuk menjalankan skrip wait-for-it
RUN apk add --no-cache bash curl

# Download wait-for-it script
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Tunggu sampai MySQL siap, lalu jalankan prisma db push
CMD /usr/local/bin/wait-for-it.sh mysql:3306 -- npx prisma db push && npm start

# Expose port aplikasi
EXPOSE 4000
