MIDDLEWARE = [
    # Security middleware
    "django.middleware.security.SecurityMiddleware",
    # Session middleware
    "django.contrib.sessions.middleware.SessionMiddleware",
    # CORS middleware
    "corsheaders.middleware.CorsMiddleware",
    # Common middleware
    "django.middleware.common.CommonMiddleware",
    # CSRF middleware
    "django.middleware.csrf.CsrfViewMiddleware",
    # Authentication middleware
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    # Message middleware
    "django.contrib.messages.middleware.MessageMiddleware",
    # Clickjacking protection
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
