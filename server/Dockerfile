FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install poetry

# Copy project files
COPY pyproject.toml poetry.lock ./
COPY server ./server

# Configure Poetry to create virtual environment in the project
RUN poetry config virtualenvs.create false

# Install dependencies (without dev dependencies)
RUN poetry install --without dev

# Set environment variables
ENV PYTHONPATH=/app

# Create necessary directories with proper permissions
RUN mkdir -p /app/server/static /app/server/media && \
    chown -R nobody:nogroup /app/server/static /app/server/media

# Collect static files
RUN poetry run python server/manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run the application with Gunicorn
CMD ["poetry", "run", "gunicorn", "--config", "server/gunicorn.conf.py", "--chdir", "server", "main.wsgi:application"]
