class ApplicationMailer < ActionMailer::Base
  default from: ENV["SMTP_DEFAULT_EMAIL"] || "andrew.platkin@gmail.com"
  layout 'mailer'
end
