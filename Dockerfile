# Use an Nginx base image
FROM nginx:latest

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy the website files to Nginx's HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

