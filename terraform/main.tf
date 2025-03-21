provider "aws" {
  region = "eu-north-1"  # Change if needed
}

resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP access to EC2 instance"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH for deployment
  }
}

resource "aws_instance" "memory_game" {
  ami           = "ami-09a9858973b288bdd"  # Replace with a valid AMI
  instance_type = "t3.micro"

  tags = {
    Name = "MemoryGameInstance"
  }

  security_groups = [aws_security_group.allow_http.name]

  # Install Docker and run the container on EC2
  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo docker run -d -p 80:80 --name memory-game kothapallihimaja/memory-game:latest
              EOF
}
