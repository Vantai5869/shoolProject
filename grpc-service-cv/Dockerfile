# Sử dụng node version 14.17.6
FROM node:14.17.6

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các package cần thiết cho ứng dụng
RUN npm install

# Copy source code vào container
COPY . .

# Mở cổng 3000 để truy cập ứng dụng
EXPOSE 3000

# Khởi động ứng dụng khi container được chạy
CMD ["npm", "start"]
