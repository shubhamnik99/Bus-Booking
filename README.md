# 🚌 Bus Booking App - Dockerized Deployment on AWS EC2

This is a full-stack **Bus Ticket Booking Web App** built with **Next.js** and **Tailwind CSS**, containerized with **Docker**, and deployed on an **AWS EC2 instance**.

---

## 📦 Tech Stack

- **Framework**: Next.js  
- **Styling**: Tailwind CSS  
- **Package Manager**: pnpm  
- **Containerization**: Docker  
- **Cloud**: AWS EC2 (Ubuntu 24.04 LTS)

---

## 🐳 Dockerfile

```dockerfile
# 1. Use a base image
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy dependency files
COPY package.json pnpm-lock.yaml ./

# 4. Install dependencies
RUN npm install -g pnpm && pnpm install

# 5. Copy remaining source files
COPY . .

# 6. Build the app
RUN pnpm build

# 7. Expose the port
EXPOSE 3000

# 8. Start the app
CMD ["pnpm", "start"]
```

---

## 🚀 Deploying on AWS EC2 with Docker

### ✅ Prerequisites

- AWS EC2 instance (Ubuntu 24.04)
- Docker installed on the EC2 instance
- Port 3000 open in the EC2 Security Group
- Git installed

---

### 🛠️ Steps

#### 1. SSH into EC2 instance

Use EC2 Instance Connect or:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

#### 2. Install Docker

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

#### 3. Clone the GitHub Repository

```bash
git clone https://github.com/shubhamnik99/Bus-Booking.git
cd Bus-Booking
```

#### 4. Build the Docker Image

```bash
docker build -t bus-booking .
```

#### 5. Run the Docker Container

```bash
docker run -d -p 3000:3000 --name bus-booking-app bus-booking
```

#### 6. Access the App

Visit:

```
http://<your-ec2-public-ip>:3000
```

---

## 🧪 Verify

Run these commands to confirm:

```bash
docker images         # To check image exists
docker ps             # To see running container
```

---

## 🛠️ Common Docker Commands

```bash
docker stop bus-booking-app          # Stop the container
docker start bus-booking-app         # Start the container
docker restart bus-booking-app       # Restart
docker logs bus-booking-app          # View logs
docker rm bus-booking-app            # Remove container
docker rmi bus-booking               # Remove image
```

---

## 👤 Author

**Shubham Nikam**  
🔗 GitHub: [@shubhamnik99](https://github.com/shubhamnik99)  
📧 Email: shubhamnikam2410@gmail.com  

---

## 📜 License

This project is licensed under the **MIT License**.

---

✅ Project successfully deployed using Docker on AWS EC2 🎉
