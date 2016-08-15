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
RUN rm -f tmp/pids/server.pid > /dev/null

RUN bundle exec rails s

EXPOSE 3000
