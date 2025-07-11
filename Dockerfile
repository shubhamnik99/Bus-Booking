# 1. Use a base image (Node.js)
FROM node:20-alpine

# 2. Set the folder where Docker will work
WORKDIR /app

# 3. Copy package files first
COPY package.json pnpm-lock.yaml* ./

# 4. Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# 5. Copy the rest of your code
COPY . .

# 6. Build your Next.js app
RUN pnpm build

# 7. Tell Docker the app runs on port 3000
EXPOSE 3000

# 8. Start your app
CMD ["pnpm", "start"]
