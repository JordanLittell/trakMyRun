FROM ruby:2.2.3

RUN apt-get update && apt-get install -y \ 
  libgmp3-dev \
  build-essential \ 
    nodejs

RUN mkdir -p /app 
WORKDIR /app

COPY Gemfile Gemfile.lock ./ 
RUN gem install bundler && bundle install --jobs 20 --retry 5


# Copy the main application.
COPY . ./

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
