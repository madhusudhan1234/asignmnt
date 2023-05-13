#!/bin/bash

if [ "$1" = "down" ]; then
  cd frontend && docker-compose down
  cd ../backend && docker-compose down
else
  cd frontend && docker-compose up -d
  cd ../backend && docker-compose up 
fi
