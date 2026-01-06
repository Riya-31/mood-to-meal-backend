# 1️⃣ Use the SAME Node version as your system
FROM node:22-alpine

# 2️⃣ Create & move into app directory inside container
WORKDIR /app

# 3️⃣ Copy dependency files first
COPY package*.json ./

# 4️⃣ Install dependencies inside container
RUN npm install

# 5️⃣ Copy the rest of your backend code
COPY . .

# 6️⃣ Tell Docker which port your app uses
EXPOSE 3003

# 7️⃣ Start backend EXACTLY like you do locally
CMD ["npm", "start"]
