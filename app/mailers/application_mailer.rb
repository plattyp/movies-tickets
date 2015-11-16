class ApplicationMailer < ActionMailer::Base
  default from: ENV["smtp_default_email"] || "andrew.platkin@gmail.com"
  layout 'mailer'
end
