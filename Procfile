web: bundle exec puma -C config/puma.rb
log: tail -f log/development.log
resque: env TERM_CHILD=1 RESQUE_TERM_TIMEOUT=7 bundle exec rake resque:work