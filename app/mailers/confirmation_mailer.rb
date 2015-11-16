class ConfirmationMailer < ApplicationMailer
  default from: ENV["SMTP_DEFAULT_EMAIL"] || "andrew.platkin@gmail.com"

  def order_confirmation_email(order)
    @order = order
    @showing = @order.showing
    @movie = @showing.movie
    @auditorium = @showing.auditorium
    mail(to: @order.email, subject: "Ticket purchase confirmation (#{@movie.title})")
  end
end
